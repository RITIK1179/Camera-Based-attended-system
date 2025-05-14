const { Student } = require('../db');

async function getStudentDetails(req, res) {
  try {
    const students = await Student.find({}, { name: 1, _id: 1, studentId: 1 });
    res.json({ msg: "done", marked: students });
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ error: 'Error fetching student details' });
  }
}

async function deleteStudent(req, res) {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Error deleting student' });
  }
}

module.exports = {
  getStudentDetails,
  deleteStudent
};
