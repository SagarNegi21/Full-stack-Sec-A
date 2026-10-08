const r=require('express').Router(),rateLimit=require('express-rate-limit'),validate=require('../middleware/validate'),s=require('../schemas'),c=require('../controllers/auth');
r.post('/register',validate(s.register),c.register);r.post('/login',rateLimit({windowMs:15*60*1000,max:5,standardHeaders:true,legacyHeaders:false}),validate(s.login),c.login);r.post('/refresh',c.refresh);module.exports=r;
