import { useEffect } from "react";
import PhoneList from "../components/phone-list/phone-list";
import PhoneNumber from "../components/phone-number/phone-number";
import styles from "../styles/index.module.css";

export default function Home() {
  useEffect(() => {
    fetch("/api/numbers", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(`[/api/numbers] ${err}`);
      });
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <PhoneNumber />
        <PhoneList />
      </main>
    </div>
  );
}
