"use client";
import Link from 'next/link';
import Image from 'next/image';
import { LogOutIcon } from 'lucide-react';
import styles from "./styles.module.scss";
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'

export default function Header() {
   const router = useRouter();

    async function handleLogout() {
        deleteCookie("session", { path: "/" });
        toast.success("Logout realizado com sucesso!")
        router.push("/");
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <Image 
                        src="/logo.png" 
                        alt="Logo Delivery Pizza" 
                        width={190}
                        height={60}
                        priority={true}
                        quality={100}
                    />
                </Link>

                <nav>
                    <Link href="/dashboard/categories">Categoria</Link>
                    <Link href="/dashboard/products">Produto</Link>
                    
                    <form onSubmit={handleLogout}>
                        <button type="submit">
                            <LogOutIcon size={14} color="#fff" />
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    );
}