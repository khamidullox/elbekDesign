"use client";

import { BaseDoc, FormValue } from "@/components/interface";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

// Хук для работы с Firebase
const useBase = (plan?: FormValue) => {
  let [base, setBase] = useState<BaseDoc[] | null>(null);

  // Получение данных из Firestore
  useEffect(() => {
    const q = query(collection(db, "order"), orderBy("createAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
      const cities: BaseDoc[] = [];
      querySnapshot.forEach((doc: any) => {
        cities.push({ ...doc.data(), id: doc.id });
      });
      setBase(cities);
    });

    return () => unsubscribe(); // Отписываемся от слушателя
  }, []);

  // Обработка отправки данных
  let handleSumbit = async (
    e: FormEvent,
    FormValue: FormValue,
    setFormData: Dispatch<SetStateAction<FormValue>>
  ) => {
    e.preventDefault();
    await addDoc(collection(db, "order"), {
      ...FormValue,
      createAt: serverTimestamp(),
    });
    setFormData({
      name: "",
      number: +998,
      design: "",
    });
  };

  return { handleSumbit, base };
};

export { useBase };
