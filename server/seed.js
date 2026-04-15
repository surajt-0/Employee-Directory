const mongoose = require("mongoose");
const Employee = require("./models/Employee");

const MONGO_URI = "mongodb+srv://surajuser07_db_user:suraj%40mongodb@cluster01.jhi3rpe.mongodb.net/employees?retryWrites=true&w=majority";

const employees =
[
  {
    "name": "Aarav Sharma",
    "email": "aarav.sharma@company.com",
    "phone": "+91 9876543210",
    "department": "Engineering",
    "position": "Software Engineer",
    "joiningDate": "2023-06-15"
  },
  {
    "name": "Priya Nair",
    "email": "priya.nair@company.com",
    "phone": "+91 9123456780",
    "department": "Human Resources",
    "position": "HR Manager",
    "joiningDate": "2022-11-10"
  },
  {
    "name": "Rohan Desai",
    "email": "rohan.desai@company.com",
    "phone": "+91 9988776655",
    "department": "Finance",
    "position": "Accountant",
    "joiningDate": "2021-08-01"
  },
  {
    "name": "Sneha Iyer",
    "email": "sneha.iyer@company.com",
    "phone": "+91 9876501234",
    "department": "Marketing",
    "position": "Digital Marketer",
    "joiningDate": "2024-02-20"
  },
  {
    "name": "Vikram Patel",
    "email": "vikram.patel@company.com",
    "phone": "+91 9012345678",
    "department": "Operations",
    "position": "Operations Executive",
    "joiningDate": "2023-09-05"
  },
  {
    "name": "Neha Kapoor",
    "email": "neha.kapoor@company.com",
    "phone": "+91 9001122334",
    "department": "Engineering",
    "position": "Frontend Developer",
    "joiningDate": "2023-01-12"
  },
  {
    "name": "Aditya Rao",
    "email": "aditya.rao@company.com",
    "phone": "+91 8899776655",
    "department": "Engineering",
    "position": "Backend Developer",
    "joiningDate": "2022-07-18"
  },
  {
    "name": "Kavya Menon",
    "email": "kavya.menon@company.com",
    "phone": "+91 8123456789",
    "department": "Design",
    "position": "UI/UX Designer",
    "joiningDate": "2023-03-25"
  },
  {
    "name": "Arjun Verma",
    "email": "arjun.verma@company.com",
    "phone": "+91 9234567890",
    "department": "Marketing",
    "position": "SEO Specialist",
    "joiningDate": "2021-12-10"
  },
  {
    "name": "Meera Joshi",
    "email": "meera.joshi@company.com",
    "phone": "+91 9345678901",
    "department": "Human Resources",
    "position": "Recruiter",
    "joiningDate": "2020-05-15"
  },
  {
    "name": "Siddharth Kulkarni",
    "email": "siddharth.kulkarni@company.com",
    "phone": "+91 9456789012",
    "department": "Finance",
    "position": "Financial Analyst",
    "joiningDate": "2022-09-01"
  },
  {
    "name": "Pooja Singh",
    "email": "pooja.singh@company.com",
    "phone": "+91 9567890123",
    "department": "Operations",
    "position": "Operations Manager",
    "joiningDate": "2023-04-11"
  },
  {
    "name": "Rahul Mehta",
    "email": "rahul.mehta@company.com",
    "phone": "+91 9678901234",
    "department": "Engineering",
    "position": "DevOps Engineer",
    "joiningDate": "2022-02-20"
  },
  {
    "name": "Ananya Gupta",
    "email": "ananya.gupta@company.com",
    "phone": "+91 9789012345",
    "department": "Design",
    "position": "Graphic Designer",
    "joiningDate": "2021-10-05"
  },
  {
    "name": "Karan Malhotra",
    "email": "karan.malhotra@company.com",
    "phone": "+91 9890123456",
    "department": "Marketing",
    "position": "Content Strategist",
    "joiningDate": "2023-08-19"
  },
  {
    "name": "Divya Sharma",
    "email": "divya.sharma@company.com",
    "phone": "+91 9901234567",
    "department": "Engineering",
    "position": "Full Stack Developer",
    "joiningDate": "2024-01-10"
  },
  {
    "name": "Manish Agarwal",
    "email": "manish.agarwal@company.com",
    "phone": "+91 9011223344",
    "department": "Finance",
    "position": "Senior Accountant",
    "joiningDate": "2020-06-30"
  },
  {
    "name": "Ishita Roy",
    "email": "ishita.roy@company.com",
    "phone": "+91 9122334455",
    "department": "Human Resources",
    "position": "HR Executive",
    "joiningDate": "2023-05-22"
  },
  {
    "name": "Nikhil Bansal",
    "email": "nikhil.bansal@company.com",
    "phone": "+91 9233445566",
    "department": "Operations",
    "position": "Supply Chain Analyst",
    "joiningDate": "2022-12-14"
  },
  {
    "name": "Ritika Jain",
    "email": "ritika.jain@company.com",
    "phone": "+91 9344556677",
    "department": "Design",
    "position": "Product Designer",
    "joiningDate": "2024-03-08"
  },
];
const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Employee.deleteMany(); // clears old data
    await Employee.insertMany(employees);

    console.log("✅ Database seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seedDB();