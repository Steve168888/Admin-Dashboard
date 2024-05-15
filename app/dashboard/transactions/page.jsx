import Search from "@/app/ui/dashboard/search/search"
import Image from "next/image"
import Link from "next/link"
import styles from '@/app/ui/dashboard/transactions/transactions.module.css'
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import { fetchAccounts } from "@/app/lib/data"
import { deleteAccount } from "@/app/lib/actions"

export async function getData(page) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwMzVhN2E0ZmNmZDNiMTQ3NWQ2ODIiLCJpYXQiOjE3MTU1Njc4MjR9.0z9-SU1P_7QMLpQ_KVCfTrLsgSz6ACM-2cBR4O2iJ6Y';
    const res = await fetch(`https://blastapi.mimin.io/api/v1/order/get?value=&order=_id&sort=1&limit=10&field=&page=${page}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const response = await res.json();
    return response.data; 
}


const AccountsPage = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    // Fetch accounts data based on the current page
    const { count } = await fetchAccounts(q, page);

    const data = await getData(page);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for an account..." />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Nama Merchant</td>
                        <td>Created At</td>
                        <td>Status</td>
                        <td>Action</td>
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map(transaction => (
                        <tr key={transaction._id}>
                            <td>{transaction._id}</td>
                            <td>{transaction.xendit.merchant_name}</td>
                            <td>{transaction.created_at.split('T')[0]}</td>
                            <td>{transaction.xendit.status}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/accounts/${transaction.id}`}>
                                        <button className={`${styles.button} ${styles.view}`}>View</button>
                                    </Link>
                                    <form action={deleteAccount}>
                                        <input type="hidden" name="id" value={transaction.id} />
                                        <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination count={count} />
        </div>
    )
}

export default AccountsPage;
