import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'
import logoImg from '../../public/logo.png'

export default function Page() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo da pizzaria" className={styles.logo}/>
        <section className={styles.login}>
          <form>
            <input type="email" name='email' required placeholder="Informe seu email"/>

            <input type="password" name='senha' required placeholder="********"/>

            <button type="submit">Logar</button>

            <Link href='/signup' className={styles.link}>Não tem cadastro? Cadastre-se</Link>
          </form>
        </section>
      </div>
    </>
  );
}
