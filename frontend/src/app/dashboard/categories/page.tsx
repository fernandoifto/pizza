"use client"
import styles from "./styles.module.scss";
import { Button } from "@/app/dashboard/components/button";
import {api} from "@/services/api";
import {getCookieClient} from "@/lib/cookieClient";
import { redirect } from "next/navigation";
import { toast } from 'react-toastify'

export default function Categories() {

    function handleCreateCategory(formData: FormData){
        const name = formData.get('name')

        if(name === ""){
            toast.warning("Preencha todos os campos")
            return;
        }

        const token = getCookieClient();

        if(!token){
            toast.warning("Erro ao cadastrar a categoria")
            return;
        }

        try {
            api.post('/category', {name}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        } catch (error) {
            toast.warning("Erro ao cadastrar a categoria")
            return;
        }

        toast.success("Categoria cadastrada com sucesso!")
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