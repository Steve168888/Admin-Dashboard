import Search from "@/app/ui/dashboard/search/search"
import Image from "next/image"
import Link from "next/link"
import styles from '@/app/ui/dashboard/accounts/accounts.module.css'
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import { fetchAccounts } from "@/app/lib/data"
import { deleteAccount } from "@/app/lib/actions"

export async function getData(q, page) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwMzVhN2E0ZmNmZDNiMTQ3NWQ2ODIiLCJpYXQiOjE3MTU1Njc4MjR9.0z9-SU1P_7QMLpQ_KVCfTrLsgSz6ACM-2cBR4O2iJ6Y';
    const res = await fetch(`https://blastapi.mimin.io/api/v1/whatsapp-dynamic/traffic?limit=10&page=${page}&q=${q}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const response = await res.json();
    return response;
}

const AccountsPage = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    const {size, data} = await getData(q, page); 


    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for an account..." />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Store Name</td>
                        <td>Type</td>
                        <td>Action</td> 
                    </tr>
                </thead>
                <tbody>
                    {data.map(account => (
                        <tr key={account._id}>
                            <td>{account._id}</td>
                            <td>{account.nama_toko}</td>
                            <td>{account.type}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/accounts/${account._id}`}>
                                        <button className={`${styles.button} ${styles.view}`}>View</button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination count={size} />
        </div>
    )
}

export default AccountsPage;
