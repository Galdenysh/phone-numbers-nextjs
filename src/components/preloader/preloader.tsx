import { FC } from "react";
import styles from "./preloader.module.css";

interface IPreloaderProps {
  type: "preloader" | "error";
}

const Preloader: FC<IPreloaderProps> = (props) => {
  const { type } = props;

  return <p className={styles.text}>{type === "preloader" ? "Идет загрузка" : "Произошла ошибка"}</p>;
};

export default Preloader;
