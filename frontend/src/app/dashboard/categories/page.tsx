import styles from "./styles.module.scss";
import { Button } from "@/app/dashboard/components/button";
import {api} from "@/services/api";
import {getCookieServer} from "@/lib/cookieServer";
import { redirect } from "next/navigation";


export default function Categories() {

    async function handleCreateCategory(formData: FormData){
        'use server'
        const name = formData.get('name')

        if(name === ""){
            return;
        }

        const token = await getCookieServer();

        if(!token){
            return;
        }

        try {
            await api.post('/category', {name}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        } catch (error) {
            console.log(error)
            return;
        }

        redirect('/dashboard')
    }

    return (
        <main className={styles.container}>
            <h1>Nova Categoria</h1>

            <form className={styles.form} action={handleCreateCategory}>
                <input type="text" placeholder="Nome da categoria" name="name" required className={styles.input}/>
                <Button name="Cadastrar"/>
            </form>

        </main>
    );
}