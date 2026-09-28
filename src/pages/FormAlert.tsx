import React from "react";
import useHandleForm from "../hooks/useHandleForm";

const FormAlert = () => {
  const { nameInput, ageInput, handleSubmit } = useHandleForm();

  return (
    <>
      <form onSubmit={handleSubmit} className="text-white flex flex-col gap-10">
        <label htmlFor="name">
          名前:
          <input type="text" ref={nameInput} className="border rounded-lg ml-2" />
        </label>
        <label htmlFor="age">
          年齢:
          <input type="number" ref={ageInput} className="border rounded-lg ml-2" />
        </label>

        <button
          type="submit"
          className="rounded-full bg-gray-500 py-1 w-1/4 mx-auto hover:opacity-80 cursor-pointer transition"
        >
          送信
        </button>
      </form>
    </>
  );
};

export default FormAlert;
