import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import styles from "./phone-list.module.css";

const PhoneList: FC = () => {
  const { data } = useAppSelector((store) => store.number);

  return (
    <section className={styles.container}>
      <ul className={styles.phoneList}>
        {data.length !== 0 ? (
          data.map((item) => (
            <li key={item?.id} className={styles.phoneItem}>
              <p className={styles.text}>{item?.number}</p>
              <button className={styles.removeBtn} type="button" />
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </section>
  );
};

export default PhoneList;
