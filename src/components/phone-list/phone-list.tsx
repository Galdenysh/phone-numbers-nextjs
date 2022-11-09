import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeNumber } from "../../services/actions/number";
import styles from "./phone-list.module.css";

const PhoneList: FC = () => {
  const [disable, setDisable] = useState(-1);
  const { data, isLoadingDelete } = useAppSelector((store) => store.number);
  const dispatch = useAppDispatch();

  const removeHandler = (id: string | undefined, index: number) => {
    setDisable(index);
    if (id)
      dispatch(removeNumber(id)).then(() => {
        setDisable(-1);
      });
  };

  return (
    <section className={styles.container}>
      <ul className={styles.phoneList}>
        {data.length !== 0 ? (
          data.map((item, index) => (
            <li key={item?.id} className={styles.phoneItem}>
              <p className={styles.text} style={{ opacity: isLoadingDelete && index === disable ? "0.6" : "1" }}>
                {item?.number}
              </p>
              <button
                className={styles.removeBtn}
                type="button"
                onClick={() => removeHandler(item?.id, index)}
                disabled={isLoadingDelete && index === disable}
              />
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
