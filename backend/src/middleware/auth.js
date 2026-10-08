const jwt=require('jsonwebtoken');
function authenticate(req,res,next){ const h=req.headers.authorization; if(!h?.startsWith('Bearer ')) return res.status(401).json({error:'Authentication required'}); try{ req.user=jwt.verify(h.slice(7),process.env.JWT_SECRET); next(); }catch(e){ return res.status(401).json({error:'Invalid or expired access token'}); }}
const authorize=role=>(req,res,next)=> req.user?.role===role?next():res.status(403).json({error:'Forbidden'});
module.exports={authenticate,authorize};
