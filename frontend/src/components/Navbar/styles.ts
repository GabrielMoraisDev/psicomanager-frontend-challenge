import styled from "styled-components";
import { colors } from "../../styles/colors";

export const HamburgerMenu = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobileSidebarOverlay = styled.div<{ $open: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: block;
    opacity: ${props => (props.$open ? '1' : '0')};
    pointer-events: ${props => (props.$open ? 'auto' : 'none')};
    transition: opacity 0.2s;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.3);
    z-index: 200;
    transition: background 0.2s;
    .mobile-sidebar-drawer {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 220px;
      background: ${colors.neutral00};
      box-shadow: 2px 0 8px rgba(0,0,0,0.08);
      transition: transform 0.25s cubic-bezier(.4,0,.2,1);
      will-change: transform;
      overflow-y: auto;
    }
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.neutral00};
  border: 1px solid ${colors.neutral60};
  border-radius: 8px;
  padding: 0 12px;
  height: 26px;
  width: 158px;
  margin-left: 0px;
  margin-right: 24px;
  @media (max-width: 768px) {
    width: 25px;
    border-radius: 6px;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  width: 80px;
  flex: 1;
  color: ${colors.neutral60};
  padding: 8px 0;
    @media (max-width: 768px) {
    display: none;
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  padding-left: 3px;
  padding-right: 2px;
  align-items: center;
  color: ${colors.neutral60};
  margin-right: 8px;
  @media (max-width: 768px) {
    margin-left: -5px;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const ArrowDownIcon = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.7;
  color: red;
  margin-left: 8px;
  @media (max-width: 768px) {
   margin-left: -4px; 
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.neutral00};
  border-bottom: 1px solid ${colors.neutral40};
  position: fixed;
  width: 100%;
  height: auto;
  top: 0;
  left: 0;
  z-index: 100;
`;

export const Logo = styled.div`
  img {
    width: 136px;
    height: 22px;
    object-fit: contain;  
    display: flex;
    place-items: center;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Line = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${colors.neutral10};
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NotificationCount = styled.div`
  color: ${colors.neutral00};
  padding: 3px 4px;
  font-size: 8px;
  border-radius: 100%;
  display: flex;
  text-align: center;
  margin-left: -7px;
  margin-top: -11px;
  justify-items: center;
  align-items: center;
  background-color: ${colors.errorMedium};
`;

export const Container = styled.div`
  margin: 0px 25px 0px 25px;
  gap: 16px;
  height: 55px;
  display: flex;
  place-items: center;
  width: 100%;
  @media (max-width: 768px) {
    margin: 0 12px;
    gap: 8px;
  }
`;

export const AlignRight = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  place-items: center;
`;

export const NavIcon = styled.div`
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

export const ChevronIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 16px;
  svg path {
    fill: ${colors.neutral80};
    transition: fill 0.2s;
  }
`;

export const UserAvatar = styled.div`
  padding: 7px;
  border-radius: 100%;
  color: ${colors.neutral00};
  background-color: ${colors.neutral60};
  margin-right: 4px;
`;
