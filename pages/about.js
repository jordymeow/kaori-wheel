import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/Sidebar';

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wine Aroma Wheel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Sidebar />
        <div className={styles.about}>
          <h1>About</h1>
          <p>This is playground for Aroma wheel!</p>
        </div>
      </main>
    </div>
  );
}