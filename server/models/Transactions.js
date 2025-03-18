import mongoose from "mongoose";

const TransactionsSchema = new mongoose.Schema(
  {
   transactionId:String,
   userId:String,
   studentId:String,
   transactionType:String,
   amount:Number,
   date:String
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Transaction = mongoose.model("Transaction", TransactionsSchema);
export default Transaction;