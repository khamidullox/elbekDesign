import { FormValue } from "@/components/interface";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
let useBase = () => {
  let handleSumbit = async (
    e: FormEvent,
    FormValue: FormValue,
    setFormData: Dispatch<SetStateAction<FormValue>>
  ) => {
    e.preventDefault();
    await addDoc(collection(db, "order"), FormValue);
    setFormData({
      name: "",
      number: +998,
      design: "",
    });
  };
  return { handleSumbit };
};
export default useBase;
