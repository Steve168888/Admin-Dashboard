import { MdSupervisedUserCircle } from "react-icons/md"
import styles from '@/app/ui/dashboard/card/card.module.css'
import { getAccountsLastWeek, getAccountsThisWeek } from "@/app/lib/data"
import { calculatePercentageDifference } from "@/app/lib/data"
import Link from 'next/link';


async function getData() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwMzVhN2E0ZmNmZDNiMTQ3NWQ2ODIiLCJpYXQiOjE3MTU1Njc4MjR9.0z9-SU1P_7QMLpQ_KVCfTrLsgSz6ACM-2cBR4O2iJ6Y';
    const res = await fetch('https://blastapi.mimin.io/api/v1/whatsapp-dynamic/traffic?page=${page}', {
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




const Card = async () => {
    const response = await getData();
    const totalAccount = response.size;
    
    const AccountThisWeek = await getAccountsThisWeek();
    const AccountLastWeek = await getAccountsLastWeek();
    const percentageDifference = calculatePercentageDifference(AccountThisWeek, AccountLastWeek);

    let differenceText;
    let detailClass;

    if (percentageDifference < 0) {
        differenceText = `less`;
        detailClass = styles.negative;
    } else {
        differenceText = `more`;
        detailClass = styles.positive;
    }

    return(
    <Link href={"/dashboard/accounts"}>
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24} />
            <div className={styles.texts}>
                <span className={styles.title}>Total Account</span>
                <span className={styles.number}>{totalAccount}</span> 
                <span className={styles.detail}>
                <span className={`${detailClass}`}>{Math.abs(percentageDifference)}%</span> {differenceText} than previous week</span>
            </div>
        </div>
    </Link>    
    )
}

export default Card
