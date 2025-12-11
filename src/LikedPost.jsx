import styled from "styled-components";

const LikeStyled = styled.button`
  border: none;
  padding: 20px 40px;
  border-radius: var(--radius-button);
  background-color: var(--bg-loading);
  font-size: var(--h3-size);
  color: var(--bg-quote);
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Play", sans-serif;
  transition: all 0.3 ease-in;

  &:hover {
    background-color: var(--bg-active-hover);
  }
`;

export function LikedPost({ children }) {
  return <LikeStyled>{children}</LikeStyled>;
}
