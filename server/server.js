import express from "express";
import cors from 'cors'
import authRouter from "./routes/auth.js";
import departmentRouter from './routes/department.js'
import leaveRouter from './routes/leaves.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import dashboardRouter from './routes/dashboard.js'
import settingRouter from './routes/setting.js'
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express()
app.use(express.static('public'));
app.use(cors())
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/leaves", leaveRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/setting", settingRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
