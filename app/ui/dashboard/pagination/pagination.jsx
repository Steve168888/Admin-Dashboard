"use client"

import styles from './pagination.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Pagination = ({ count }) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const page = parseInt(searchParams.get("page")) || 1;
    const ITEM_PER_PAGE = 2;

    const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
    const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

    const handleChangePage = (type) => {
        const nextPage = type === "prev" ? page - 1 : page + 1;
        const params = new URLSearchParams(searchParams);
        params.set("page", nextPage);
        replace(`${pathname}?${params}`);
    }

    return (
        <div className={styles.container}>
            <button className={styles.button} disabled={!hasPrev} onClick={() => handleChangePage("prev")}>Preview</button>
            <button className={styles.button} disabled={!hasNext} onClick={() => handleChangePage("next")}>Next</button>
        </div>
    )
}

export default Pagination;
