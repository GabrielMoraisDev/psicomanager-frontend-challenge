import { createContext } from "react";
import type { CreateUserFormData } from "../components/Form1";
import type { Form2DataType, Form3DataType } from "./BankContext";

export interface BankContextType {
  showBank: boolean;
  setShowBank: (value: boolean) => void;
  Form1Data: Partial<CreateUserFormData> | null;
  setForm1Data: (value: Partial<CreateUserFormData> | null) => void;
  Form2Data: Form2DataType | null;
  setForm2Data: (value: Form2DataType | null) => void;
  Form3Data: Form3DataType | null;
  setForm3Data: (value: Form3DataType | null) => void;
  step: number;
  setStep: (value: number) => void;
  error: boolean;
  setError: (value: boolean) => void;
  success: boolean;
  setSuccess: (value: boolean) => void;
}

export const BankContext = createContext<BankContextType | undefined>(undefined);

