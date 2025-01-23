import mongoose from "mongoose";




async function ConnectDb(){
    try{
        await mongoose.connect(process.env.MONGODB_URL)
    }catch(error){
        console.log(error.message)
    }
}


export default ConnectDb