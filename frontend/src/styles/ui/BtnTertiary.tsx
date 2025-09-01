import styled from "styled-components";
import { colors } from "../colors";

export const BtnTertiary = styled.div`
  background: ${colors.neutral00};
  color: ${colors.neutral60};
  padding: 8px 32px;
  border: ${colors.neutral60} 1px solid;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 1rem;

  &:hover {
    color: ${colors.neutral90};
    border: ${colors.neutral90} 1px solid;
  }

  &:disabled {
    background: ${colors.neutral05};
    color: ${colors.neutral30};
    border: ${colors.neutral30};
  }
`;
