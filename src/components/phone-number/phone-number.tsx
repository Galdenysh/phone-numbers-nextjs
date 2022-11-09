import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { numberSlice } from "../../services/reducers/number";
import { selectOpt } from "../../utils/config";
import styles from "./phone-number.module.css";

const PhoneNumber: FC = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState("Поле не может быть пустым");
  const [formValid, setFormValid] = useState(false);
  const { text } = useAppSelector((store) => store.test);
  const { setNumberState } = numberSlice.actions;
  const dispatch = useAppDispatch();

  const inputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const result = evt.target.value.replace(/\D/g, "");

    if (result.length === 0) {
      setTextError("Поле не может быть пустым");
    } else if (result.length < 3 || result.length > 10) {
      setTextError("Длина номера телефона должна быть от 3 до 10 цифр");
    } else {
      setTextError("");
    }

    setValue(result);
  };

  const blurHandler = () => {
    setError(true);
  };

  const submitHandler = (evt: SyntheticEvent) => {
    evt.preventDefault();

    dispatch(setNumberState("test123"));
    console.log(text);
  };

  useEffect(() => {
    textError ? setFormValid(false) : setFormValid(true);
  }, [textError]);

  return (
    <section className={styles.container}>
      <form className={styles.formNumber} onSubmit={submitHandler}>
        <select className={styles.selectCode}>
          {selectOpt.map((item) => (
            <option key={item.id} className={styles.optionCode} value={item.country}>
              {item.code}
            </option>
          ))}
        </select>
        <input
          className={styles.inputNumber}
          name="number"
          placeholder="Введите номер"
          onBlur={blurHandler}
          value={value}
          onChange={inputHandler}
        />
        <button className={styles.submitBtn} disabled={!formValid}>
          Ввод
        </button>
      </form>
      {error && textError && <p className={styles.textErr}>{textError}</p>}
    </section>
  );
};

export default PhoneNumber;
