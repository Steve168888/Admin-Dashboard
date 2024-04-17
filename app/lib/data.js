import { User, Product, Account } from "./models";
import { connectToDB } from "./utils";


export const fetchUsers = async (q,page) => {
    const regex = new RegExp(q,"i")

    const ITEM_PER_PAGE = 2

    try{
        connectToDB()
        const count = await User.find({username: {$regex: regex}}).count();
        const users = await User.find({username: {$regex: regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page-1));
        return {count,users}; 
    }catch (err) {
        console.log(err);

    }
}

export const fetchUser = async (id) => {
    try{
        connectToDB()
        const user = await User.findById(id)
        return user;
    }catch (err) {
        console.log(err);
    }
}


export const fetchProducts = async (q,page) => {
    const regex = new RegExp(q,"i")

    const ITEM_PER_PAGE = 2

    try{
        connectToDB()
        const count = await Product.find({title: {$regex: regex}}).count();
        const products = await Product.find({title: {$regex: regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page-1));
        return {count,products}; 
    }catch (err) {
        console.log(err);

    }
}

export const fetchProduct = async (id) => {
    try{
        connectToDB()
        const product = await Product.findById(id)
        return product;
    }catch (err) {
        console.log(err);

    }
}

export const fetchAccounts = async (q,page) => {
    const regex = new RegExp(q,"i")

    const ITEM_PER_PAGE = 2

    try{
        connectToDB()
        const count = await Account.find({username: {$regex: regex}}).count();
        const accounts = await Account.find({username: {$regex: regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page-1));
        return {count,accounts}; 
    }catch (err) {
        console.log(err);

    }
}

export const fetchAccount = async (id) => {
    try{
        connectToDB()
        const account = await Account.findById(id)
        return account;
    }catch (err) {
        console.log(err);
    }
}



