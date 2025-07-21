const mongoose=require('mongoose');
const initData=require('./data.js');
const Listing=require('../models/listing.js');

const mongoose_url="mongodb://127.0.0.1:27017/test";
main().then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    mongoose.connect(mongoose_url);
}


const initDB=async()=>{
   await Listing.deleteMany({});
   initData.data=initData.data.map((obj)=>({
    ...obj,
    owner:'6875c6bfa606602370b6dcef',
   }))
   await Listing.insertMany(initData.data);    
   console.log("Database initialized with sample data");
}
initDB();