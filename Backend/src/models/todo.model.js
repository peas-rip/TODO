const mongoose=require("mongoose");

const Todo=mongoose.Schema;
const TodoSchema=new Todo(
    {
        title:{type:String,required:true},
        description:{type:String},
        completed:{type:Boolean,default:false},
        owner:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
    },{timestamps:true}
);
module.exports=mongoose.model("Todo",TodoSchema);