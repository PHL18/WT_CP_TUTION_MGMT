import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  date: { type: String }, // Date in YYYY-MM-DD format
  percentage: { type: Number } // Attendance percentage as a number
});

const BranchSchema = new mongoose.Schema({
  branchId: { type: String },
  branchName: { type: String},
  totalStudents: { type: Number},
  avgDailyAttendance: { type: Number},
  avgAttendanceRate: { type: Number},
  avgClassesHeld: { type: Number},
  attendancePerClass: { type: Number},
  dailyAttendancePercentage: [AttendanceSchema] // Embedded array of attendance records
});

const DailyStudentSchema = new mongoose.Schema(
  {
    branches: [BranchSchema] // Array of branch objects
  },
  { timestamps: true } // Adds createdAt & updatedAt fields
);

// ✅ Creating the model
const DailyStudent = mongoose.model("DailyStudent", DailyStudentSchema);

export default DailyStudent;