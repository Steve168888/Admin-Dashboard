"use server"

import { connectToDB } from "./utils";
import { Product, User } from "./models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export const addUser = async (formData)=>{
    const {username, email, password, phone, address, isAdmin, isActive} =  Object.fromEntries(formData);

    try{
        connectToDB();

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            isAdmin,
            isActive,
        });
        await newUser.save()
    }catch(err){
        console.log(err);
    }

    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
}

export const addProduct = async (formData)=>{
    const {title, desc, price, stock, color, size} =  Object.fromEntries(formData);

    try{
        connectToDB();

        const newProduct = new Product({
            title, 
            desc, 
            price, 
            stock, 
            color, 
            size
        });
        await newProduct.save()
    }catch(err){
        console.log(err);
    }

    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
}

export const deleteUser = async (formData)=>{
    const {id} =  Object.fromEntries(formData);

    try{
        connectToDB();


        await Product.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }

    revalidatePath("/dashboard/products")
}

export const deleteProduct = async (formData)=>{
    const {id} =  Object.fromEntries(formData);

    try{
        connectToDB();


        await Product.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }

    revalidatePath("/dashboard/products")
}