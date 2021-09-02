import s from "./Button.module.css";

export default function Button({ type, name, onBtnClick }) {
  return (
    <button className={s.Button} type={type} onClick={onBtnClick}>
      {name}
    </button>
  );
}
