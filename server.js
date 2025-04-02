const express = require('express')
const cors = require('cors')
require('dotenv').config();

const connectDB = require('./config/db');
const route = require('./routes/route');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api', route);

app.get('/',(req,res)=>{res.send('blog api is running')})

const port = process.env.PORT;
app.listen(port,()=>{console.log(`server running on the port ${port}`)});