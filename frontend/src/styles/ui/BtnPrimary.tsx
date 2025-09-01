import styled from "styled-components";
import { colors } from "../colors";

export const BtnPrimary = styled.button`
  background: ${colors.primary00};
  color: ${colors.primary10};
  padding: 8px 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 1rem;

  &:hover {
    background: ${colors.primary30};
  }

  &:disabled {
    color: ${colors.neutral05};
    background: ${colors.neutral30};
  }
`;
