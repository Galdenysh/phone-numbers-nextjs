import styles from "./phone-list.module.css";

const PhoneList = () => {
  return (
    <section className={styles.container}>
      <ul className={styles.phoneList}>
        <li className={styles.phoneItem}>
          <p className={styles.text}>+7 (911) 123-45-67</p>
          <button className={styles.removeBtn} type="button" />
        </li>
        <li className={styles.phoneItem}>
          <p className={styles.text}>+7 (911) 123-45-67</p>
          <button className={styles.removeBtn} type="button" />
        </li>
        <li className={styles.phoneItem}>
          <p className={styles.text}>+7 (911) 123-45-67</p>
          <button className={styles.removeBtn} type="button" />
        </li>
      </ul>
    </section>
  );
};

export default PhoneList;
