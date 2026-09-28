import React from "react";
import useHandleForm from "../hooks/useHandleForm";

const FormAlert = () => {
  const { nameInput, ageInput, handleSubmit } = useHandleForm();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          名前:
          <input type="text" ref={nameInput} />
        </label>
        <label htmlFor="age">
          年齢:
          <input type="number" ref={ageInput} />
        </label>

        <button type="submit">送信</button>
      </form>
    </>
  );
};

export default FormAlert;
