import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { postNumber } from "../../services/actions/number";
import { selectOpt } from "../../utils/config";
import styles from "./phone-number.module.css";

const PhoneNumber: FC = () => {
  const [numberValue, setNumberValue] = useState("");
  const [codeValue, setCodeValue] = useState(selectOpt[0].country);
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState("Поле не может быть пустым");
  const [formValid, setFormValid] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.number);

  const inputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const result = evt.target.value.replace(/\D/g, "");

    if (result.length === 0) {
      setTextError("Поле не может быть пустым");
    } else if (result.length < 3 || result.length > 10) {
      setTextError("Длина номера телефона должна быть от 3 до 10 цифр");
    } else {
      setTextError("");
    }

    setNumberValue(result);
  };

  const selectHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
    const code = evt.target.value;

    setCodeValue(code);
  };

  const blurHandler = () => {
    setError(true);
  };

  const submitHandler = (evt: SyntheticEvent) => {
    evt.preventDefault();

    const code = selectOpt.find((item) => item.country === codeValue);
    const number = code?.code + numberValue;

    dispatch(postNumber(number));
  };

  useEffect(() => {
    textError ? setFormValid(false) : setFormValid(true);
  }, [textError]);

  return (
    <section className={styles.container}>
      <form className={styles.formNumber} onSubmit={submitHandler}>
        <select className={styles.selectCode} value={codeValue} onChange={selectHandler}>
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
          value={numberValue}
          onChange={inputHandler}
        />
        <button className={styles.submitBtn} disabled={!formValid || isLoading}>
          {isLoading ? "Загрузка" : "Ввод"}
        </button>
      </form>
      {error && textError && <p className={styles.textErr}>{textError}</p>}
    </section>
  );
};

export default PhoneNumber;
