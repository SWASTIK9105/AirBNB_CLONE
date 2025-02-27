const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const review =require('./review.js')
const listingSchema=new Schema({
    title:{required:true,
        type:String},
    description:{type:String},
    image:{
        url:String,
        filename:String }
,
    price:{type:Number},
    location:{type:String},
    country:{type:String},
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
}],
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
  coordinates: {
    type: [Number],
    required: true
  },
  category:{
    type:[String],
    enum:['rooms','iconic cities','castles','amazing pools','mountains','arctic','farms','camping','trending']
  }

});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
await review.deleteMany({_id:{$in:listing.reviews}});}
})
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;