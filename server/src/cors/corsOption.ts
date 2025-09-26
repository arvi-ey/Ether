import cors from 'cors';

const allowedOrigins = [
    'http://localhost:5173',
];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
};

export default corsOptions