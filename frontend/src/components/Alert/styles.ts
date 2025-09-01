import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Structure = styled.div<{ type: 'error' | 'success'; $active: boolean; }>`
  position: fixed;
  top: 50px;
  right: ${({ $active }) => ($active ? '0px' : '-400px')};
  display: flex;
  place-items: center;
  justify-items: center;
  width: 322px;
  height: 104px;
  z-index: 250;
  transition: all 0.3s ease;
  border-radius: 4px 0px 0px 4px;
  border-left: 4px solid ${({ type }) => (type === 'error' ? colors.errorMedium : colors.successMedium)};
  background-color: ${({ type }) => (type === 'error' ? colors.errorLight : colors.successLight)};
  color: ${({ type }) => (type === 'error' ? colors.errorMedium : colors.successMedium)};

  h2{
    font-size: 16px;
    font-weight: normal;
  }

  p{
    font-size: 14px;
  }

  svg{
    margin: 0px 15px;
  }
`;

export const Error = styled.div`
  position: absolute;
  z-index: 110;
  width: 563px;
  height: auto;
  padding: 28px;
  border-radius: 4px;
  background-color: #fff;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
`;

export const Warning = styled.div`
  position: absolute;
  z-index: 110;
  width: 563px;
  height: auto;
  padding: 28px;
  border-radius: 4px;
  background-color: #fff;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
`;
