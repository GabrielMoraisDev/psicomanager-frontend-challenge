


import { useState } from "react";
import type { ReactNode } from "react";
import { BankContext } from "./BankContextInstance";
import type { CreateUserFormData } from "../components/Form1";

// Defina o tipo para Form3Data conforme necessário
export type Form3DataType = {
  meios_de_pagamento: string[];
  multa: boolean;
  valor_multa: string;
  juros: boolean;
};

export type Form2DataType = {
  message: string;
};


export function BankProvider({ children }: { children: ReactNode }) {
  const [showBank, setShowBank] = useState(false);
  const [Form1Data, setForm1Data] = useState<Partial<CreateUserFormData> | null>(null);
  const [Form2Data, setForm2Data] = useState<Form2DataType | null>(null);
  const [Form3Data, setForm3Data] = useState<Form3DataType | null>(null);
  const [step, setStep] = useState<number>(1);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  return (
    <BankContext.Provider 
      value={{
        showBank,
        setShowBank,
        Form1Data,
        setForm1Data,
        Form2Data,
        setForm2Data,
        Form3Data,
        setForm3Data,
        step,
        setStep,
        error,
        setError,
        success,
        setSuccess
      }}>
      {children}
    </BankContext.Provider>
  );
}
