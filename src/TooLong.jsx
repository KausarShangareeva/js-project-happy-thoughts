import styled from "styled-components";
import { GlobalStyles } from "./GlobalStyles";

const TooLongStyled = styled.p`
  background-color: var(--bg-active);
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: var(--radius);
`;

export function TooLong({ charCount }) {
  return (
    <TooLongStyled>
      Sorr, but your message is <strong>too Long</strong>, plece delete -
      {charCount - 140}
      characters
    </TooLongStyled>
  );
}
