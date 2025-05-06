import { InputHTMLAttributes } from "react";
import * as S from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...rest }: InputProps) {
  return (
    <S.InputWrapper>
      {label && <label>{label}</label>}
      <input {...rest} />
    </S.InputWrapper>
  );
}
