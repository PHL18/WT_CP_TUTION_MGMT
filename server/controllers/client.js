import Student from "../models/Student.js";
import StudentStat from "../models/StudentStat.js";
import User from "../models/User.js";
import Transaction  from "../models/Transactions.js";
import countryIso2To3 from "country-iso-2-to-3";
export const getStudents=async(req,res)=>{
    try{
       const students=await Student.find();
       const studentWithStat=await Promise.all(
        students.map(async(student)=>{
            const stat=await StudentStat.find({
                studentId:student._id 
            }   
            )
            return {  
                ...student._doc,
                stat
            }
        })
       )
       res.status(200).json(studentWithStat)
    }catch(error)
    {
        res.status(404).json({message:error.message})
    }
}
export const getTeachers=async(req,res)=>{
    try{
       const teachers=await User.find({role:"user"}).select("-password")
       res.status(200).json(teachers)
    }catch(error)
    {
        res.status(404).json({message:error.message})
    }
}
export const getNewTransactions=async(req,res)=>{
    try{
        const trans=await Transaction.find();
        res.status(200).json({trans})
    }
    catch(error)
    {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const getTransactions = async (req, res) => {
    try {
        // Extract query parameters with defaults
        let { page = 1, pageSize = 20, sort = "{}", search = "" } = req.query;

        // Ensure `page` and `pageSize` are numbers
        page = Math.max(1, Number(page)); // Ensure page is at least 1
        pageSize = Math.max(1, Number(pageSize)); // Ensure pageSize is positive

        // Parse sorting parameter safely
        const generateSort = () => {
            try {
                const sortParsed = JSON.parse(sort);
                return { [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1 };
            } catch (error) {
                return {}; // Default empty sort object
            }
        };

        const sortFormatted = sort ? generateSort() : {};

        // Build search query
        let searchQuery = {};
        if (search) {
            searchQuery = {
                $or: [
                    { userId: { $regex: new RegExp(search, "i") } },
                    { transactionType: { $regex: new RegExp(search, "i") } },
                    { amount: !isNaN(search) ? Number(search) : undefined },
                ].filter(Boolean), // Removes undefined values
            };
        }

        // Fetch transactions with pagination
        const transactions = await Transaction.find(searchQuery)
            .sort(sortFormatted)
            .skip((page - 1) * pageSize) // This will always be >= 0
            .limit(pageSize);

        // Count total matching transactions
        const total = await Transaction.countDocuments(searchQuery);

        res.status(200).json({ transactions, total });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getGeography=async(req,res)=>{
    try{
        const users=await User.find()
        const mappedLocations=users.reduce((acc, {country})=>{
            const countryISO3=countryIso2To3(country)
            if(!acc[countryISO3])
            {
                acc[countryISO3]=0;
            }
            acc[countryISO3]++;
            return acc
        },{});
        const formattedLocations=Object.entries(mappedLocations).map(
            ([country,count])=>{
                return {id:country,value:count}
            }
        )
        res.status(200).json(formattedLocations)
    }
    catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}