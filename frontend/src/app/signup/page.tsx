"use client";
import Image from 'next/image'
import Link from 'next/link'
import styles from '../page.module.scss'
import logoImg from '../../../public/logo.png'
//Importa a api criada no arquivo api.ts sem fontend/src/services/api.ts
import { api } from '@/services/api'
//import { redirect } from 'next/navigation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';

export default function Signup(){
  const router = useRouter();

  async function handleRegister(formData: FormData){
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    if(name === "" || email === "" || password === ""){
      toast.warning("Preencha todos os campos")
      return
    }

    try {
      //rota usar definida no backend/src/routes.ts
      await api.post('/user', {
        name,
        email,
        password
      })
      toast.success("Usuário cadastrado com sucesso!")
      router.push("/")
    } catch (error) {
      toast.warning("Erro ao cadastrar o usuário")
      return;
    }

  }
  
  return(
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo da pizzaria" className={styles.logo}/>
        <section className={styles.login}>
        <h1>Criando sua conta</h1>
          <form action={handleRegister}>
            <input type="text" name='name' required placeholder="Informe seu nome"/>
            
            <input type="email" name='email' required placeholder="Informe seu email"/>

            <input type="password" name='password' required placeholder="********"/>

            <button type="submit">Cadastrar</button>

            <Link href='/' className={styles.link}>Já possui uma conta? Faça o login</Link>
          </form>
        </section>
      </div>
    </>
  )
}