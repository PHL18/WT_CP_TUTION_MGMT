import mongoose from "mongoose";

const StudentStatSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      ref: "Student", // Refers to the Student model
      required: true,
    },
    totalAttendance: {
      type: Number,
      default: 0,
    },
    totalMarks: {
      type: Number,
      default: 0,
    },
    year: {
      type: Number,
      required: true,
    },
    monthlyData: [
      {
        month: String, // Example: "January"
        attendance: {
          type: Number,
          default: 0,
        },
        marks: {
          type: Number,
          default: 0,
        },
      },
    ],
    dailyData: [
      {
        date: String, // Example: "2025-03-03"
        attendance: {
          type: Boolean, // true if present, false if absent
          default: false,
        },
        marks: {
          type: Number,
          default: 0,
        },
      },
    ],
    noticePriorityCount: {
      type: Number,
      default: 0, // Count of priority notices viewed by the student
    },
  },
  { timestamps: true }
);

const StudentStat = mongoose.model("StudentStat", StudentStatSchema);

export default StudentStat;