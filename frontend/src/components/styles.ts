import styled from "styled-components";
import { colors } from "../styles/colors";

export const StyledGridButtonWrapper = styled.div`
  grid-column: 4;
  display: flex;
  justify-content: end;
  align-items: end;
  height: 100%;

  @media (max-width: 768px) {
    grid-column: 1;
    justify-content: start;
    align-items: start;
    padding-top: 10px;
    justify-items: start;
  }
`;

export const FormButtons = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 40px;
    float: right;
`;

export const TitleReactQuill = styled.p`
  font-size: 16px;
  color: ${colors.neutral90};
  text-align: left;
  margin-bottom: 26px;
  margin-top: 24px;

  @media screen {
    @media (max-width: 768px) {
      margin-bottom: 6px;
    }
  }
`;

export const WarnLabel = styled.div`
  background-color: ${colors.warningLight};
  border-radius: 4px;
  padding: 11px;
  padding-bottom: 0;
  margin-bottom: 24px;

  h2 {
    color: ${colors.warningDark};
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 0px;
    margin-top: 0;
  }

  ul {
    list-style: disc;
    margin-top: 5px;
    padding-left: 20px;
    padding-bottom: 5px;

    li {
      color: ${colors.warningDark};
      font-size: 14px;
      margin-bottom: 4px;
    }
  }

  @media screen {
    @media (max-width: 768px) {
      margin-top: 25px;
      margin-bottom: -10px;
    }
  }
`;

export const InfoLabel = styled.div`
  background-color: ${colors.informationLight};
  border-radius: 4px;
  margin-bottom: 24px;

  p {
    color: ${colors.informationMedium};
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    padding: 10px 14px;
  }

  @media screen {
    @media (max-width: 768px) {
      margin-bottom: -15px;
    }
  }
`;

export const InfoTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.neutral90};
  text-align: left;
  margin-top: 25px;
  margin-bottom: 15px;
`;
