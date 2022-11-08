import PhoneList from "../components/phone-list/phone-list";
import PhoneNumber from "../components/phone-number/phone-number";
import styles from "../styles/index.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <PhoneNumber />
        <PhoneList />
      </main>
    </div>
  );
}
