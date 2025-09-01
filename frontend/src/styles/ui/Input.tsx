import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  type?: string;
  required?: boolean;
  is_disabled?: boolean;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

const StyledLabel = styled.label`
  margin-bottom: 6px;
  font-size: 16px;
  color: ${colors.neutral60};
  margin-top: 15px;   
    @media (max-width: 768px) {
        margin-top: 25px;
    }
`;

interface StyledInputProps {
  $error?: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 7px 16px 7px 16px;
  border: 1px solid
  ${({ $error }) => ($error ? colors.errorMedium : colors.neutral30)};
  border-radius: 4px;
  background-color: ${colors.neutral00};
  color: ${colors.neutral60};
  font-size: 16px;
  appearance: none;
  outline: none;

  &:focus {
    border-color: ${({ $error }) => ($error ? colors.errorMedium : '#333')};
  }
`;

const RequiredLabel = styled.span`
  color: ${colors.errorMedium};
  font-size: 12px;
  margin-left: 4px;
`;

export const Input: React.FC<InputProps> = ({ label, error, id, required, type = "text", ...props }) => {
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <InputWrapper>
      <StyledLabel htmlFor={inputId}>{label}:{required && <RequiredLabel>*</RequiredLabel>}</StyledLabel>
      <StyledInput type={type} id={inputId} $error={!!error} {...props} />
    </InputWrapper>
  );
};
