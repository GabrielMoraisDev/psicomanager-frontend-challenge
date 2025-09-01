import styled from "styled-components";
import { colors } from "./styles/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  padding-left: 90px;
  height: 100vh;
  @media (max-width: 768px) {
    padding-left: 0px;
  }

  img{
    width: 200px;
    height: 200px;
  }

  h1{
    color: ${colors.neutral90};
    font-size: 20px;
    text-align: center;
    margin-top: 25px;
    margin-bottom: 0px;
  }

  p{
    color: ${colors.neutral70};
    text-align: center;
    font-weight: 400;
    width: 290px;
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;
