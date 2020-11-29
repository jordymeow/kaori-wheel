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
          <p>We are trying to make a nice Wine Aroma Wheel online, which will also be used by a mobile app. We plan to add fun features crafted for wine tasting experience. If we get a bit crazier, we might even implement more wheels and machine learning - maybe the AI of this app will be able to detect what wine you are drinking!</p>
        </div>
      </main>
    </div>
  );
}