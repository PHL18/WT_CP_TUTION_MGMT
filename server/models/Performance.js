import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
  MSE: { type: Number, required: true },
  ESE: { type: Number, required: true }
});

const PerformanceSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    attendance_percentage: { type: Number, required: true },
    subjects: { 
      type: Map, 
      of: SubjectSchema 
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Performance = mongoose.model("Performance", PerformanceSchema);
export default Performance;