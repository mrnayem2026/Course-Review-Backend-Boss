import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>({
    name:{
        type:String,
        unique:true,
        trim:true
    }
})

categorySchema.pre('save',async function(next){

    const isCategoryNameExist = await Category.findOne({
        name: this.name,
    })

    if(isCategoryNameExist){
        throw new Error("This category name is allready exist")
    }
    next()
})

export const Category = model<TCategory>('Category',categorySchema)