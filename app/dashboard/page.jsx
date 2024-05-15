
import Card from "../dashboard/accounts/cards/page"
import Chart from "../ui/dashboard/chart/chart"
import styles from "../ui/dashboard/dashboard.module.css"
import Rightbar from "../ui/dashboard/rightbar/rightbar"
import DashboardTransactions from "../dashboard/transactions/dashboardtransactions/page"
const Dashboard = () => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card/>
                </div>
                <DashboardTransactions/>
                <Chart/>
            </div>
            <div className={styles.side}>
                <Rightbar/>
            </div>

        </div>
    )
}

export default Dashboard