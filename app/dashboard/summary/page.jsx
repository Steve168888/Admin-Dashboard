import Search from "@/app/ui/dashboard/search/search"
import styles from "@/app/ui/dashboard/summary/summary.module.css"
import Link from "next/link"
import Image from "next/image"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import { fetchUsers } from "@/app/lib/data"
import { deleteUser } from "@/app/lib/actions"
import Chart1 from "./chart1/page"
import Chart2 from "./chart2/page"


const SummaryPage = () => {
   
    return(
        <div className={styles.container}>
            <div className={styles.chartWrapper}>
                <div className={styles.chartBox}>
                    <Chart1 />
                </div>
                
                <div className={styles.chartBox}>
                    <Chart2 />
                </div>
            </div>
        </div>



    )
}

export default SummaryPage