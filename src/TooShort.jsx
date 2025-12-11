import styled from "styled-components";
import { GlobalStyles } from "./GlobalStyles";

const TooShortStyled = styled.p`
  background-color: var(--bg-active);
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: var(--radius);
`;
export function TooShort({ charCount }) {
  return (
    <TooShortStyled>
      Sorr, but your message is <strong>too short</strong>, plece add more +
      {10 - charCount} characters
    </TooShortStyled>
  );
}
