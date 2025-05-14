const { AttendanceMarked } = require('../db');

async function markAttendance(req, res) {
  const { id } = req.params;

  if (id !== "no data" && id !== "unknown") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      const existingAttendance = await AttendanceMarked.find({ id, date: { $gte: today } });
      if (existingAttendance.length !== 0) {
        return res.json({ msg: "already marked" });
      }

      await AttendanceMarked.create({ id, marked: "present" });
      res.json({ msg: "Attendance Marked" });
    } catch (error) {
      console.error('Error marking attendance:', error);
      res.status(500).json({ error: 'Error marking attendance' });
    }
  }
}

async function getDashboard(req, res) {
  try {
    const marked = await AttendanceMarked.find();
    res.json({ msg: "done", marked });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Error fetching attendance' });
  }
}

module.exports = {
  markAttendance,
  getDashboard
};
