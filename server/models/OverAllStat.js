import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
  {
    totalStudents:Number,
    totalFeesCollected:Number,
    totalTeachers:Number,
    year:Number,
    monthlyData:[
        {
            month:String,
            totalStudentsEnrolled:Number,
            feesCollected:Number
        }
    ]
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;