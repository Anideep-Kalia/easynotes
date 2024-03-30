const mongoose=require('mongoose');
const mongoURI="mongodb+srv://anideepkalia71:anideepkalia71@cluster0.ocnf7ra.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo succeesfully");
    })
}

module.exports=connectToMongo;