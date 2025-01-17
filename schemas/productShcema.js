import mongoose, { Schema } from "mongoose"

const productSchema  =mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock_quentity:{
        type:Number,
        required:true
    },
    catagoery_id:{
        type:Schema.Types.ObjectId,
        ref:'categoeries',
        required:true
    },
    images:{
        type:Object,
        required:true
    }
},
{
timestamp:true
}
)

export default productSchema