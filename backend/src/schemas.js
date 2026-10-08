const {z}=require('zod');
exports.register=z.object({name:z.string().min(2).max(100),email:z.string().email(),password:z.string().min(8).max(100),role:z.enum(['ADMIN','STUDENT']).optional()});
exports.login=z.object({email:z.string().email(),password:z.string().min(1)});
exports.event=z.object({title:z.string().min(1).max(200),description:z.string().max(5000).optional(),date:z.coerce.date(),location:z.string().max(200).optional(),capacity:z.number().int().positive().optional()});
exports.announcement=z.object({title:z.string().min(1).max(200),content:z.string().min(1).max(10000)});
