const mongoose=require('mongoose');
const eventSchema=new mongoose.Schema({title:{type:String,required:true,trim:true},description:String,date:{type:Date,required:true},location:String,capacity:{type:Number,min:1},rsvps:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]},{timestamps:true});
module.exports=mongoose.model('Event',eventSchema);
