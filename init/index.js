const mongoose=require('mongoose');
const InitData=require('./data.js');
const Listing=require('../models/listing.js');
const mongo_url='mongodb://127.0.0.1:27017/swastik_bnb';
async function main(){
    await mongoose.connect(mongo_url)
};
main().then(()=>{
    console.log("Connected to Database swastik_bnb");
}).catch((err)=>{
console.log(err)
});
const initDataBase=async()=>{
    await Listing.deleteMany({});
    InitData.data=InitData.data.map((obj)=>({...obj,owner:'67b7404598fb22ba7449b527'}));
    await Listing.insertMany(InitData.data);
    console.log('Data is Initialized');
};
initDataBase();