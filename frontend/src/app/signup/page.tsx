'use client'  
import Image from 'next/image'

import Link from 'next/link'
import styles from '../page.module.scss'
import logoImg from '../../../public/logo.png'
import { useState } from 'react'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  return(
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo da pizzaria" className={styles.logo}/>
        <section className={styles.login}>
        <h1>Criando sua conta</h1>
          <form>
            <input type="text" name='name' required placeholder="Informe seu nome"/>
            
            <input type="email" name='email' required placeholder="Informe seu email"/>

            <input type="password" name='senha' required placeholder="********"/>

            <button type="submit">Cadastrar</button>

            <Link href='/' className={styles.link}>Já possui uma conta? Faça o login</Link>
          </form>
        </section>
      </div>
    </>
  )
}