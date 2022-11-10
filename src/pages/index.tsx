import { useEffect } from "react";
import SocketIOClient from "socket.io-client";
import PhoneList from "../components/phone-list/phone-list";
import PhoneNumber from "../components/phone-number/phone-number";
import Preloader from "../components/preloader/preloader";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchNumbers } from "../services/actions/number";
import styles from "../styles/index.module.css";
import { baseUrl } from "../utils/config";

export default function Home() {
  const dispatch = useAppDispatch();
  const { isLoadingFetch, errorFetch } = useAppSelector((store) => store.number);

  const socketInitializer = async (baseUrl: string) => {
    const socket = SocketIOClient(baseUrl, {
      path: "/api/socket",
    });

    socket.on("connect", () => {
      console.log("Socket connected", socket.id);
    });
  };

  useEffect(() => {
    dispatch(fetchNumbers());
    socketInitializer(baseUrl);
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
