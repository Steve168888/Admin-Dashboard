import { updateUser } from '@/app/lib/actions';
import styles from '@/app/ui/dashboard/accounts/singleAccount/singleAccount.module.css'
import Image from 'next/image'



export async function getDataById(id) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwMzVhN2E0ZmNmZDNiMTQ3NWQ2ODIiLCJpYXQiOjE3MTU1Njc4MjR9.0z9-SU1P_7QMLpQ_KVCfTrLsgSz6ACM-2cBR4O2iJ6Y';
    const res = await fetch(`https://blastapi.mimin.io/api/v1/whatsapp-dynamic/traffic?_id=${id}`, {
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


const SingleAccountPage = async ({ params }) => {
    const { id } = params;
    const data = await getDataById(id); 
    
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div>{data.nama_toko}</div>
            </div>
            <div className={styles.formContainer}>
                <div>
                    <label className={styles.labeltext}>ID</label>
                    <div>{data._id}</div>
                    <label className={styles.labeltext}>Store Name</label>
                    <div>{data.nama_toko}</div>
                    <label className={styles.labeltext}>API Key</label>
                    <div>{data.api_key}</div>
                    <label className={styles.labeltext}>is activated</label>
                    <div>{data.is_activated}</div>
                    <label className={styles.labeltext}>Type</label>
                    <div>{data.type}</div>
                </div>
            </div>
        </div>
    )
}

export default SingleAccountPage;
