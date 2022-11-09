import { useEffect } from "react";
import PhoneList from "../components/phone-list/phone-list";
import PhoneNumber from "../components/phone-number/phone-number";
import Preloader from "../components/preloader/preloader";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchNumbers } from "../services/actions/number";
import styles from "../styles/index.module.css";

export default function Home() {
  const dispatch = useAppDispatch();
  const { isLoadingFetch, errorFetch } = useAppSelector((store) => store.number);

  useEffect(() => {
    dispatch(fetchNumbers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <PhoneNumber />
        {isLoadingFetch && <Preloader type="preloader" />}
        {!isLoadingFetch && errorFetch && <Preloader type="error" />}
        {!isLoadingFetch && !errorFetch && <PhoneList />}
      </main>
    </div>
  );
}
