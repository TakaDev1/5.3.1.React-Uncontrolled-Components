import { useRef } from "react";

const useHandleForm = () => {
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (nameInput.current && ageInput.current) {
      alert(`名前: ${nameInput.current.value}、年齢: ${ageInput.current.value}`);
    }
  };

  return { nameInput, ageInput, handleSubmit };
};

export default useHandleForm;
