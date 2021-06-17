import styled from "@emotion/styled";
import color from "../styles/color";

export const MainContainer = styled.div`
  padding: 30px 16px 0;
  display: flex;
  align-items: center;
  flex-flow: column;
  margin: 0 auto;
  width: 100%;
  max-width: 768px;
  @media (max-width: 768px) {
    max-width: 480px;
  }
`;

export const Header = styled.header`
  height: 60px;
  background-color: ${color.main};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
