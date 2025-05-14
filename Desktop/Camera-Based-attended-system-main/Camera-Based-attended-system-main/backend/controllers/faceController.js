const faceapi = require("face-api.js");
const { Canvas, Image, loadImage } = require("canvas");
const { Student, AttendanceMarked } = require("../db.js");

faceapi.env.monkeyPatch({ Canvas, Image });

// Cache face descriptors in memory to avoid unnecessary DB queries
let faceDescriptorsCache = [];

// Load models and preload face descriptors
async function loadModels() {
  await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/../models");
  await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/../models");
  await faceapi.nets.tinyFaceDetector.loadFromDisk(__dirname + "/../models"); // Use TinyFaceDetector

  // Preload face descriptors once on startup
  await preloadFaceDescriptors();
}

// Preload face descriptors from the database
async function preloadFaceDescriptors() {
  console.log("Preloading face descriptors...");
  const faces = await Student.find();
  faceDescriptorsCache = faces.map(face => {
    const faceDescriptorValues = face.features.split(",").map(Number);
    return new faceapi.LabeledFaceDescriptors(face.studentId, [new Float32Array(faceDescriptorValues)]);
  });
  console.log("Face descriptors loaded successfully.");
}

// Save face descriptor to the database
async function saveFaceDescriptor(req, res) {
  const { name, rollNumber } = req.body;
  const photoPath = req.file.path;

  console.log("Uploading face...");

  try {
    const img = await loadImage(photoPath);
    
    // Resize image before processing for better speed
    const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
                                    .withFaceLandmarks()
                                    .withFaceDescriptor();

    if (!detections) {
      return res.status(400).send("No face detected in the uploaded photo.");
    }

    const faceDescriptor = detections.descriptor;
    await Student.create({ name, studentId: rollNumber, features: faceDescriptor.toString() });

    // Update face descriptors cache
    await preloadFaceDescriptors();

    res.status(200).json({ msg: "Face saved successfully." });
  } catch (error) {
    console.error("Error saving face descriptor:", error);
    res.status(500).json({ error: "Error saving face descriptor" });
  }
  console.log("Done");
}

// Check face and return attendance result
async function checkFace(req, res) {
  const now = new Date();
  const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  console.log("Checking face at " + formattedTime);

  try {
    const result = await getDescriptorsFromDB(req.body.image);
    res.json({ msg: result[0] === undefined ? { _label: "no data" } : result[0] });
  } catch (error) {
    console.error("Error in checkFace:", error);
    res.status(500).json({ error: "Error checking face" });
  }
  console.log("Done");
}

// Get descriptors and match face from the database
async function getDescriptorsFromDB(imagePath) {
  try {
    // Load the image
    const img = await loadImage(imagePath);

    // Create a face matcher
    const faceMatcher = new faceapi.FaceMatcher(faceDescriptorsCache, 0.6);

    // Detect faces in the image (use TinyFaceDetector for speed)
    const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
                                    .withFaceLandmarks()
                                    .withFaceDescriptors();

    if (!detections.length) return [{ _label: "no data" }];

    // Parallel processing for face matching
    const results = await Promise.all(
      detections.map(async (detection) => faceMatcher.findBestMatch(detection.descriptor))
    );

    return results;
  } catch (error) {
    console.error("Error in getDescriptorsFromDB:", error);
    throw error;
  }
}

module.exports = {
  loadModels,
  saveFaceDescriptor,
  checkFace
};