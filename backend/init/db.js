const mongoose = require('mongoose');

const DB_NAME = 'couple_todo'; // choose your database name

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(`Connected to MongoDB database: ${DB_NAME}`))
.catch((err) => console.error('MongoDB connection error:', err));
