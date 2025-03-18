
import OverallStat from "../models/OverAllStat.js";
import DailyStudent from "../models/Daily.js";

export const getSales=async(req,res)=>{
    try{
        const overallStats=await OverallStat.find();
        res.status(200).json(overallStats[0])

    }
    catch(error)
    {
        res.status(404).json({message:error.message})
    }
}
export const getDaily=async(req,res)=>{
    try{
        const dailies=await DailyStudent.find()
        res.status(200).json(dailies)
    }
    catch(error)
    {
        res.status(404).json({message:error.message})
    }
}