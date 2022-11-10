import { FC, useEffect } from "react";
import SocketIOClient, { Socket } from "socket.io-client";
import PhoneList from "../components/phone-list/phone-list";
import PhoneNumber from "../components/phone-number/phone-number";
import Preloader from "../components/preloader/preloader";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchNumbers } from "../services/actions/number";
import { numberSlice } from "../services/reducers/number";
import { socketSlice } from "../services/reducers/socket";
import styles from "../styles/index.module.css";
import { config } from "../utils/config";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { addNumber, deleteNumber } = numberSlice.actions;
  const { addSocketStatus } = socketSlice.actions;
  const { isLoadingFetch, errorFetch } = useAppSelector((store) => store.number);

  const socketInitializer = (baseUrl: string) => {
    const socket = SocketIOClient(baseUrl, {
      path: "/api/socket",
    });

    socket.on("connect", () => {
      dispatch(addSocketStatus({ id: socket.id, connect: true }));
      console.log("Socket connected", socket.id);
    });

    socket.on("add-number", (msg) => {
      dispatch(addNumber(msg));
    });

    socket.on("delete-number", (msg) => {
      dispatch(deleteNumber(msg));
    });

    return socket;
  };

  const disconnectSocket = (socket: Socket) => {
    if (socket) socket.disconnect();
  };

  useEffect(() => {
    const socket = socketInitializer(config.baseUrl);
    dispatch(fetchNumbers());

    return () => disconnectSocket(socket);
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
