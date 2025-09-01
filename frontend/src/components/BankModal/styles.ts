export const CloseButton = styled.button`
  position: absolute;
  top: 25px;
  right: 20px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 10;
`;
import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Modal = styled.div`
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

  h1{
    color: ${colors.neutral90};
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 12px;
    margin-top: 0;
    font-weight: 600;
    margin-left: 3px;
  }

  @media (max-width: 768px) {
    width: 85%;
    padding: 16px;
  }
`;

export const Spacer = styled.div`
  height: 250px;

  @media (max-width: 768px) {
    height: 1200px;
  }
`;

export const SpacerForm2 = styled.div`
  height: 0px;

  @media (max-width: 768px) {
    height: 350px;
  }
`;

export const SpacerForm3 = styled.div`
  height: 20px;

  @media (max-width: 768px) {
    height: 320px;
  }
`;