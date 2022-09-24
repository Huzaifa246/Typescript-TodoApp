import React, { useRef } from "react";
import './styles.css';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

function InputField({ todo, setTodo, handleAdd }: Props) {
  // const InputField: React.FC<Props> = ({ todo, setTodo }) => {

    const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <form
        className="input"
        onSubmit={(e) => {
          handleAdd(e);
          inputRef.current?.blur();
        }}
      > 
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a Task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="input__box"
        />
        <button type="submit" className="input_submit">
          GO
        </button>
      </form>
    </>
  );
}

export default InputField;
