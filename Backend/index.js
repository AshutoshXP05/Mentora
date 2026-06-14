import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import courseRoute from './routes/courseRoute.js';
import lectureRoute from './routes/lectureRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import reviewRoute from './routes/reviewRoute.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://mentora-mocha-alpha.vercel.app'],
    credentials: true,
}))

const port = process.env.PORT || 3000;

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/course', courseRoute)
app.use('/api/lecture', lectureRoute)
app.use('/api/payment', paymentRoute)
app.use('/api/review', reviewRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.log("Error middleware called", message);
    res.status(statusCode).json({
        success: false,
        message,
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
});

