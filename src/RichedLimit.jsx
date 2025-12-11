import styled from "styled-components";
import { GlobalStyles } from "./GlobalStyles";

const RichedLimitStyled = styled.p`
  background-color: var(--bg-active);
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: var(--radius);
`;

export function RichedLimit({ charCount }) {
  return (
    <RichedLimitStyled>
      You have riched the limit (- {charCount - 140})
    </RichedLimitStyled>
  );
}
