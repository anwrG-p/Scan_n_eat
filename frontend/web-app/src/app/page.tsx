import Link from "next/link";
import styles from "./page.module.css";
import { BookOpen, Camera, GraduationCap, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}></div>

      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Baz3it el chef</h1>
        <div className={styles.grid}>

          <Link href="/catalog" className={styles.card}>
            <div className={styles.iconContainer}>
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className={styles.cardTitle}>Catalog</h2>
              <p className={styles.cardDescription}>
                Browse our extensive collection of recipes and ingredients.
              </p>
            </div>
            <ArrowRight className={styles.arrow} size={20} />
          </Link>

          <Link href="/camera" className={styles.card}>
            <div className={styles.iconContainer}>
              <Camera size={24} />
            </div>
            <div>
              <h2 className={styles.cardTitle}>Camera</h2>
              <p className={styles.cardDescription}>
                Scan ingredients to instantly find matching recipes.
              </p>
            </div>
            <ArrowRight className={styles.arrow} size={20} />
          </Link>

          <Link href="/tutorial" className={styles.card}>
            <div className={styles.iconContainer}>
              <GraduationCap size={24} />
            </div>
            <div>
              <h2 className={styles.cardTitle}>Tutorial</h2>
              <p className={styles.cardDescription}>
                Learn how to become a master chef with our guides.
              </p>
            </div>
            <ArrowRight className={styles.arrow} size={20} />
          </Link>

        </div>
      </div>
    </div>
  );
}
