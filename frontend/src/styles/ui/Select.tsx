import React from 'react';
import styled from 'styled-components';
import ArrowDown from '../../assets/icons/arrowDown.svg';
import { colors } from '../colors';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
  is_disabled?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

interface StyledSelectProps {
  $is_disabled?: boolean;
  $error?: boolean;
}

const StyledSelect = styled.select<StyledSelectProps>`
  width: 100%;
  padding: 7px 30px 7px 16px;
  border: 1px solid ${({ $error }) => $error ? colors.errorMedium  : colors.neutral30};
  border-radius: 4px;
  background-color: ${({ $is_disabled }) => $is_disabled ? colors.neutral10 : colors.neutral00};
  color: ${colors.neutral60};
  font-size: 16px;
  appearance: none;
  outline: none;
  cursor: ${({ $is_disabled }) => $is_disabled ? 'not-allowed' : 'pointer'};
  &:focus {
    border-color: ${({ $error }) => $error ? colors.errorMedium  : '#333'};
  }
`;

const ChevronIcon = styled.img`
  position: absolute;
  right: 8px;
  top: 50%;
  width: 26px;
  height: 30px;
  opacity: 0.6;
  pointer-events: none;
  transform: translateY(-50%);
`;

const RequiredLabel = styled.span`
  color: ${colors.errorMedium};
  font-size: 12px;
  margin-left: 4px;
`;

export const Select: React.FC<SelectProps> = ({ label, error, id, options, required = false, is_disabled = false, value, placeholder, ...props }) => {
  const selectId = id || `select-${label.replace(/\s+/g, '-').toLowerCase()}`;
  // Considera erro se houver mensagem de erro ou se o valor for vazio
  const hasError = !!error || value === '';
  return (
    <SelectWrapper>
      <StyledLabel htmlFor={selectId}>{label}:{required && <RequiredLabel>*</RequiredLabel>}</StyledLabel>
      <SelectContainer>
        <StyledSelect $is_disabled={is_disabled} id={selectId} $error={hasError} value={value} {...props}>
          {placeholder && (
            <option value="" hidden>{placeholder}</option>
          )}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </StyledSelect>
        <ChevronIcon src={ArrowDown} alt="abrir" />
      </SelectContainer>
    </SelectWrapper>
  );
};
