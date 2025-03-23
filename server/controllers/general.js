import User from "../models/User.js";
import OverallStat from "../models/OverAllStat.js";
import Transaction from "../models/Transactions.js";


export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDashboardStats=async(req,res)=>{
    try{
        const currentMonth="March";
        const currentYear="2025"
        const currentDate="2025-03-22";
        // recent trasactions
        const transactions=await Transaction.find().limit(50).sort({createdOn:-1})
        const overallStat= await OverallStat.find({year:currentYear})
        const {
            totalStudents,totalFeesCollected,totalTeachers
        }=overallStat[0]

        const thisMonthStats=overallStat[0].monthlyData.find(({month})=>{
            return month===currentMonth
        })
        // const todayStat=overallStat[0].monthlyData.find(({date})=>{
        //     return date===currentDate
        // })
        res.status(200).json({totalStudents,totalFeesCollected,totalTeachers,thisMonthStats})
    }
    catch(error)
    {
        res.status(404).json({message:error.message})
    }
}
