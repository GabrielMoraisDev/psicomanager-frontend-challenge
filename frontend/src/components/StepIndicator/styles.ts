import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 24px;
  width: 85.5%;
  margin: 30px auto 80px auto;
  gap: 32px;
`;

export const Indicator = styled.div<{ $status?: 'current' | 'completed' | 'inative', $position?: 'left' | 'center' | 'right' }>`
  position: relative;
  background-color: ${({ $status }) => $status === 'current' ?  colors.primary20 : $status === 'inative' ? colors.neutral10 : colors.primary20};
  border: ${({ $status }) => $status === 'completed' ?  colors.primary00 + ' solid 2px' : $status === 'current' ? colors.primary20 + ' solid 2px' : colors.neutral10 + ' solid 2px'};
  height: 20px;
  width: 20px;
  border-radius: 100%;
  z-index: 55;
  display: flex;
  place-items: center;
  justify-self: ${({ $position }) =>
    $position === 'left' ? 'start' : $position === 'right' ? 'end' : 'center'};

  span{
    width: 12px;
    height: 12px;
    margin: auto;
    background-color: ${({ $status }) => $status === 'current' ? colors.neutral10 : colors.primary20};
    border-radius: 6px;
    transition: width 0.3s ease;
  }

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
`;

export const ProgressBar = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  height: 4px;
  width: 100%;
  background-color: ${colors.neutral10};
  border-radius: 2px;
  z-index: 50;
`;

export const StepLabel1 = styled.p<{ $status?: 'current' | 'completed' | 'inative' }>`
  position: absolute;
  bottom: -38px;
  left: 90%;
  width: 120px;
  font-weight: bold;
  transform: translateX(-50%);
  font-size: 12px;
  color: ${({ $status }) => $status === 'current' ? colors.neutral90 : $status === 'completed' ? colors.primary00 : colors.neutral40};

  @media (max-width: 768px) {
    width: 90px;
    bottom: -52px;
    left: 68%;
    text-align: center;
  }
`;

export const StepLabel2 = styled.p<{ $status?: 'current' | 'completed' | 'inative' }>`
  position: absolute;
  bottom: -66px;
  left: 50%;
  width: 120px;
  font-weight: bold;
  text-align: center;
  transform: translateX(-50%);
  font-size: 12px;
  color: ${({ $status }) => $status === 'current' ? colors.neutral90 : $status === 'completed' ? colors.primary00 : colors.neutral40};
`;

export const StepLabel3 = styled.p<{ $status?: 'current' | 'completed' | 'inative' }>`
  position: absolute;
  bottom: -66px;
  left: 50%;
  width: 75px;
  text-align: center;
  font-weight: bold;
  transform: translateX(-50%);
  font-size: 12px;
  color: ${({ $status }) => $status === 'current' ? colors.neutral90 : $status === 'completed' ? colors.primary00 : colors.neutral40};
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.neutral90};
  text-align: left;
  margin-bottom: 20px;

  @media screen {
    @media (max-width: 768px) {
      margin-bottom: 0px;
    }
  }
`;