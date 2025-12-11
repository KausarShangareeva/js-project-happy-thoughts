import { GlobalStyles } from "./GlobalStyles";
import styled from "styled-components";

const LoadingStyling = styled.h3`
  background-color: var(--bg-loading);
  color: var(--bg-quote);
  font-size: var(--h3-size);
  font-weight: bold;
  text-align: center;
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: var(--radius);
`;

export function Loading() {
  return <LoadingStyling>Please wait for thoughts 😻</LoadingStyling>;
}
