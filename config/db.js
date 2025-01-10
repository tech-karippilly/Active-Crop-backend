import mongoose from "mongoose";




async function ConnectDb(){
    console.log(process.env.MONGODB_URL)
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Db connect ....')
    }catch(error){
        console.log(error.message)
    }
}


export default ConnectDb