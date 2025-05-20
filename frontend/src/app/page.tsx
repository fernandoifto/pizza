import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'
import logoImg from '../../public/logo.png'
//Importa a api criada no arquivo api.ts sem fontend/src/services/api.ts
import { api } from '@/services/api'
import { redirect } from 'next/navigation'
import {cookies} from 'next/headers'

export default function Page() {

  async function handleLogin(formData: FormData){
    'use server'
    const email = formData.get('email')
    const password = formData.get('password')

    if(email === "" || password === ""){
      console.log("Preencha todos os campos")
      return
    }

    try {
      //rota usar definida no backend/src/routes.ts
      const response = await api.post('/session', {
        email,
        password
      })

      if(!response.data.token){
        return
      }

      console.log(response.data)
      console.log(response.status) 
      
      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookieStore = await cookies();
      
      cookieStore.set('session', response.data.token, {
        httpOnly: false,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: expressTime,
      })
      
    } catch (error) {
      console.log(error)
      return;
    }

    redirect('/dashboard')

  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo da pizzaria" className={styles.logo}/>
        <section className={styles.login}>
          <form action={handleLogin}>
            <input type="email" name='email' required placeholder="Informe seu email"/>

            <input type="password" name='password' required placeholder="********"/>

            <button type="submit">Logar</button>

            <Link href='/signup' className={styles.link}>Não tem cadastro? Cadastre-se</Link>
          </form>
        </section>
      </div>
    </>
  );
}
