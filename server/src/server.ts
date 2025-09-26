import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from "express";
import corsOptions from './cors/corsOption.js';
import connectDB from './db/dbConnection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { globalError } from './middlewares/errorHandeler.js';
import AuthRouter from "./routes/auth/authRouter.js"
import ProjectRouter from "./routes/project/projectRouter.js"
import TaskRouter from "./routes/tasks/taskRouter.js"



connectDB(process.env.DB_URL!)
const app = express();
const PORT = process.env.PORT || 5000;


// Application lavel middlewares
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())





app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
});




// All Routes

app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/projects', ProjectRouter)
app.use('/api/v1/tasks', TaskRouter)


app.use(globalError)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
