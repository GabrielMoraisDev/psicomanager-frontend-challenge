
import styled from "styled-components";
import { colors } from "../colors";

export const BtnSecondary = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: ${colors.neutral00};
  color: ${colors.primary00};
  height: 32px;
  width: auto;
  padding: 0px 32px;
  border: ${colors.primary00} 1px solid;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 1rem;

  &:hover {
    background: ${colors.primary10};
  }

  &:disabled {
    background: ${colors.neutral05};
    color: ${colors.neutral30};
    border: ${colors.neutral30};
    cursor: not-allowed;
  }
`;
