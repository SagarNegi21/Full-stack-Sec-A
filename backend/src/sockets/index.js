const jwt=require('jsonwebtoken');
module.exports=(io)=>{io.use((socket,next)=>{try{const token=socket.handshake.auth?.token;if(!token)return next(new Error('Unauthorized'));socket.user=jwt.verify(token,process.env.JWT_SECRET);next()}catch(e){next(new Error('Unauthorized'))}});io.on('connection',s=>{if(s.user.role==='STUDENT')s.join('students')})};
