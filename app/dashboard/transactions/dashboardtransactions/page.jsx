import styles from "@/app/ui/dashboard/dashboardtransactions/dashboardtransactions.module.css"
import Image from "next/image"
import Link from 'next/link';


export async function getData(page) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwMzVhN2E0ZmNmZDNiMTQ3NWQ2ODIiLCJpYXQiOjE3MTU1Njc4MjR9.0z9-SU1P_7QMLpQ_KVCfTrLsgSz6ACM-2cBR4O2iJ6Y';
    const res = await fetch(`https://blastapi.mimin.io/api/v1/order/get?value=&order=_id&sort=1&field=&page=${page}`, {
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


const DashboardTransactions = async () => {

    const data = await getData();

    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const latestTransactions = data.slice(0, 6);

    return(
        <Link href={"/dashboard/transactions"}>
        <div className={styles.container}>
            <h2 className={styles.title}>Latest Transactions</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Status</td>
                        <td>Created At</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {latestTransactions.map(transaction => (
                    <tr key={transaction._id}>
                        <td>{transaction.customer.name}</td>
                        <td>
                            <span className={`${styles.status} ${transaction.xendit.status === 'EXPIRED' ? styles.expired : transaction.xendit.status === 'PAID' ? styles.paid : styles.pending}`}>
                                {transaction.xendit.status} 
                            </span>
                        </td>
                        <td>{transaction.created_at.split('T')[0]}</td>
                        <td>{transaction.subtotal}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Link>
    )
}

export default DashboardTransactions