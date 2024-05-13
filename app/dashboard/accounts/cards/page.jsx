import { MdSupervisedUserCircle } from "react-icons/md"
import styles from '@/app/ui/dashboard/card/card.module.css'
import { accountCount, getAccountsLastWeek, getAccountsThisWeek } from "@/app/lib/data"
import { calculatePercentageDifference } from "@/app/lib/data"
import Link from 'next/link';

const Card = async () => {
    const totalUsers = await accountCount();
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
                <span className={styles.title}>Total User</span>
                <span className={styles.number}>{totalUsers}</span> 
                <span className={styles.detail}>
                <span className={`${detailClass}`}>{Math.abs(percentageDifference)}%</span> {differenceText} than previous week</span>
            </div>
        </div>
    </Link>
        
    )
}

export default Card
