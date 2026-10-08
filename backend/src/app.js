require('dotenv').config();const express=require('express'),cors=require('cors'),helmet=require('helmet'),cookieParser=require('cookie-parser');
const app=express();app.use(helmet());app.use(cors({origin:process.env.FRONTEND_ORIGIN,credentials:true}));app.use(express.json());app.use(cookieParser());
app.get('/api/health',(req,res)=>res.json({ok:true}));app.use('/api/auth',require('./routes/auth'));app.use('/api/events',require('./routes/events'));app.use('/api/announcements',require('./routes/announcements'));module.exports=app;
