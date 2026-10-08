require('dotenv').config();
const http=require('http'),{Server}=require('socket.io'),app=require('./app'),connectDB=require('./config/db'),{connectRedis}=require('./config/redis'),setupSockets=require('./sockets');
(async()=>{await connectDB();await connectRedis();const server=http.createServer(app);const io=new Server(server,{cors:{origin:process.env.FRONTEND_ORIGIN,credentials:true}});app.set('io',io);setupSockets(io);server.listen(process.env.PORT||5000,()=>console.log('API listening'))})().catch(e=>{console.error(e);process.exit(1)});
