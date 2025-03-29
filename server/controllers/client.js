import Student from "../models/Student.js";
import StudentStat from "../models/StudentStat.js";
import User from "../models/User.js";
import Transaction  from "../models/Transactions.js";
import countryIso2To3 from "country-iso-2-to-3";
import Performance from "../models/Performance.js";
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
       const teachers=await User.find({role:"user"}).select("-password").limit(20)
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
export const getPerformance=async(req,res)=>{
    try{
        const performance=await Performance.find()
        res.status(200).json(performance)

    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
}

export const addStudent = async (req, res) => {
    try {
        // Extract data from request body
        const { _id,name, age, className, subject, attendance, feesPaid, guardianName, createdAt, updatedAt } = req.body;

        // Validate each required field separately
        if (!name) {
            return res.status(400).json({ message: "Missing required field: name" });
        }
        if (!age) {
            return res.status(400).json({ message: "Missing required field: age" });
        }
        if (!className) {
            return res.status(400).json({ message: "Missing required field: className" });
        }
        if (!subject) {
            return res.status(400).json({ message: "Missing required field: subject" });
        }
        if (!guardianName) {
            return res.status(400).json({ message: "Missing required field: guardianName" });
        }
        if (attendance === undefined) {
            return res.status(400).json({ message: "Missing required field: attendance" });
        }
        if (feesPaid === undefined) {
            return res.status(400).json({ message: "Missing required field: feesPaid" });
        }

        // Log request body for debugging
        console.log("Received request body:", req.body);

        // Create a new student instance
        const newStudent = new Student({
            _id,
            name,
            age,
            className,
            subject,
            attendance,
            feesPaid,
            guardianName,
            updatedAt,
            createdAt
        });

        // Save to database
        const savedStudent = await newStudent.save();

        res.status(201).json({ message: "Student added successfully", student: savedStudent });
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const deleteStudent = async (id) => {
    try {
    
        const response = await fetch(`http://localhost:5001/students/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to delete student");
        }

        console.log("Student deleted successfully");
    } catch (error) {
        console.error("Error deleting student:", error);
    }
};