import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema=new mongoose.Schema({
      videoFile:{
        type:String,   //Cloudnary url
        required:true,

      },
      thumbnail:{
        type:String,
        required:true,

      },
      title:{
        type:String,
        required:true,
      },
      description:{
        type:String,
        required:true,
      }
      ,
      duration:{
        type:String,
        required:true,

      },
      views:{
        type:Number,
        default:0
      },
      isPublished:{
        type:Boolean,
        default:true,

      },
      owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

      }
},{
    timestamps:true,

})
VideoSchema.plugin(mongooseAggregatePaginate);

export const Video=mongoose.model("Video",VideoSchema);