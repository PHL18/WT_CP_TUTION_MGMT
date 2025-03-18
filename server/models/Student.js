import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    _id:{
        type: String, // Allow custom string IDs
        required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    attendance: {
      type: Number,
      default: 0,
    },
    marks: {
      type: Number,
      default: 0,
    },
    feesPaid: {
      type: Number,
      default: 0,
    },
    guardianName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;