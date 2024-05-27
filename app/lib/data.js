import { User, Product, Account } from "./models";
import { connectToDB } from "./utils";
import { getData } from '@/app/dashboard/accounts/page';



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

export const fetchAccounts = async (q, page) => {
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 4;

    try {
        connectToDB();
        const count = await Account.find({ username: { $regex: regex }, account_type: "traffic" }).count();
        const accounts = await Account.find({ username: { $regex: regex }, account_type: "traffic" })
            .select("username nama_toko db_name created_at updated_at deleted_at account_type")
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1));
        return { count, accounts };
    } catch (err) {
        console.log(err);
    }
};

export const fetchAccount = async (id) => {
    try{
        connectToDB()
        const account = await Account.findById(id)
        return account;
    }catch (err) {
        console.log(err);
    }
}

export const accountCount = async () => {
    try {
        connectToDB();
        const accountCount = await Account.countDocuments({ account_type: 'traffic' });
        return accountCount;
    } catch (err) {
        console.log('Error:', err);
        throw err;
    }
}

export const getAccountsThisWeek = async () => {
    try {
        connectToDB();

        // Menghitung tanggal Senin dari minggu in
        const today = new Date();
        const seninIni = new Date(today);
        seninIni.setDate(seninIni.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Jika hari ini adalah Minggu, kembali ke Senin minggu sebelumnya

        // Menghitung tanggal Minggu dari minggu ini
        const mingguIni = new Date(today);
        mingguIni.setDate(seninIni.getDate() + 6);

        // Menghitung jumlah akun dengan created_at dalam rentang waktu Senin hingga Minggu ini
        const jumlahAkun = await Account.countDocuments({
            account_type: 'traffic',
            created_at: {
                $gte: seninIni,
                $lte: mingguIni
            }
        });

        return jumlahAkun;
    } catch (err) {
        console.log('Error:', err);
        throw err;
    }
};


export const getAccountsLastWeek= async () => {
    try {
        connectToDB();

        // Mendapatkan hari ini
        const today = new Date();

        // Mendapatkan hari Senin terakhir
        const lastMonday = new Date(today);
        lastMonday.setDate(lastMonday.getDate() - (today.getDay() + 6) % 7);

        // Mendapatkan Senin minggu lalu
        const lastWeekMonday = new Date(lastMonday);
        lastWeekMonday.setDate(lastWeekMonday.getDate() - 7);

        // Menghitung tanggal Minggu lalu
        const lastWeekSunday = new Date(lastWeekMonday);
        lastWeekSunday.setDate(lastWeekSunday.getDate() + 6);

        // Menghitung jumlah akun dengan created_at dalam rentang waktu dari Senin minggu lalu hingga Minggu lalu
        const accountCount = await Account.countDocuments({
            account_type: 'traffic',
            created_at: {
                $gte: lastWeekMonday,
                $lt: lastWeekSunday
            }
        });

        return accountCount;
    } catch (err) {
        console.log('Error:', err);
        throw err;
    }
};

export const calculatePercentageDifference = (getAccountsThisWeek, getAccountsLastWeek) => {
    return ((getAccountsThisWeek - getAccountsLastWeek) / getAccountsLastWeek) * 100;
}




export const SearchAccount = async (q, page) => {
    const regex = new RegExp(q, "i");

    try {
        const data = await getData(q, page); // Memanggil getData untuk mendapatkan data dari API
        const count = await Product.countDocuments({ title: { $regex: regex } });
        return { count };
    } catch (error) {
        console.error("Error in SearchAccount:", error);
        throw error;
    }
};



// data.js




