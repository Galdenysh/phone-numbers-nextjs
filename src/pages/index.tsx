import { FC, useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";
import PhoneList from "../components/phone-list/phone-list";
import PhoneNumber from "../components/phone-number/phone-number";
import Preloader from "../components/preloader/preloader";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchNumbers } from "../services/actions/number";
import { numberSlice } from "../services/reducers/number";
import styles from "../styles/index.module.css";
import { baseUrl } from "../utils/config";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { addNumber, deleteNumber } = numberSlice.actions;
  const { isLoadingFetch, errorFetch } = useAppSelector((store) => store.number);

  const socketInitializer = async (baseUrl: string) => {
    const socket = SocketIOClient(baseUrl, {
      path: "/api/socket",
    });

    socket.on("connect", () => {
      console.log("Socket connected", socket.id);
    });

    socket.on("add-number", (msg) => {
      dispatch(addNumber(msg));
    });

    socket.on("delete-number", (msg) => {
      dispatch(deleteNumber(msg));
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
};

export default Home;
