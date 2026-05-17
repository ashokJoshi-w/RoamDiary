import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import e from 'express';

import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true

}));
app.get('/', (req, res) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});