import Search from "@/app/ui/dashboard/search/search"
import Image from "next/image"
import Link from "next/link"
import styles from '@/app/ui/dashboard/accounts/accounts.module.css'
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import { fetchAccounts } from "@/app/lib/data"
import { deleteAccount} from "@/app/lib/actions"

const AccountsPage =  async({searchParams}) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const {count,accounts} = await  fetchAccounts(q,page);

    return(
        <div className={styles.container}>
        <div className={styles.top}>
            <Search placeholder="Search for a product..."/>
        </div>
        <table className={styles.table}>
            <thead>
                <tr>
                    <td>Username</td>
                    <td>Nama Toko</td>
                    <td>Nama Database</td>
                    <td>Created At</td>
                    <td>Updated At</td>
                    <td>Deleted At</td>
                </tr>
            </thead>
            <tbody>
            {accounts.map(account=>(
                <tr key={account.id}>
                    <td>
                        <div className={styles.account}>
                        <Image src={account.img || "/noproduct.jpg"} alt="" width={40} height={40} className={styles.accountImage}/>
                        {account.username}
                        </div>
                    </td>
                    <td>{account.nama_toko}</td>
                    <td>{account.db_name}</td>
                    <td>{account.created_at?.toString().slice(4,16)}</td>
                    <td>{account.updated_at?.toString().slice(4,16)}</td>
                    <td>{account.deleted_at?.toString().slice(4,16)}</td>
                    <td>
                        <div className={styles.buttons}>
                            <Link href={`/dashboard/accounts/${account.id}`}>
                                <button className={`${styles.button} ${styles.view}`}>View</button>
                            </Link>
                            <form action={deleteAccount}>
                                <input type="hidden" name="id" value={account.id}/>
                                <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                            </form>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        <Pagination count={count}/>
    </div>
    )
}

export default AccountsPage