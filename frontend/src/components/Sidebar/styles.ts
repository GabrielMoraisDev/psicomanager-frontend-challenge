import { colors } from "../../styles/colors";
import styled from "styled-components";

export const AnotherItens = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 14px 1px;
  transition: ease-in-out 0.2s;
  &:hover {
    opacity: 0.7;
    transition: ease-in-out 0.2s;
  }
`;

export const FinanceiroHighlight = styled.div`
  background: ${colors.primary00};
  cursor: pointer;
  border-radius: 16px;
  padding: 14px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SidebarIconImg = styled.img`
  width: 18px;
  height: 18px;
  margin-bottom: 4px;
`;

interface SidebarLabelProps {
  $white?: boolean;
}

export const SidebarLabel = styled.span<SidebarLabelProps>`
  font-size: 11px;
  margin-top: ${({ $white }) => ($white ? '0px' : '3px')};
  color: ${({ $white }) => ($white ? colors.neutral00 : 'inherit')};
`;

export const Container = styled.div`
  background-color: ${colors.neutral00};
  border-right: ${colors.neutral40} 1px solid;
  height: 100vh;
  width: 90px;
  position: fixed;
  top: 30px;
  left: 0;
  z-index: 10;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  padding-top: 32px;
`;

export const SidebarIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 16px;
  svg path {
    fill: ${colors.primary40};
    transition: fill 0.2s;
  }
  &:hover svg path {
    fill: ${colors.primary00};
  }
`;