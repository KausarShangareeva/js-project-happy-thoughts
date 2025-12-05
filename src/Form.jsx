import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  background: var(--bg-form);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const TitleH1 = styled.h1`
  font-size: var(--h1-size);
  font-weight: 500;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 20px 20px 50px 20px;
  border-radius: var(--radius-input);
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: var(--h2-size);
  }

  &:focus::placeholder {
    color: #adb5bd;
  }
`;

const StyledBullon = styled.button`
  border: none;
  padding: 20px 40px;
  border-radius: var(--radius-button);
  background-color: var(--bg-active);
  font-size: var(--h3-size);
  color: var(--color-font);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--bg-active-hover);
  }
`;

export function Form({ setQuote }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;

    const newQuote = {
      text: inputValue,
      time: new Date(),
      likes: 0,
    };

    setQuote((prev) => [...prev, newQuote]);
    setInputValue("");
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TitleH1>What's is making me happy!</TitleH1>
      <StyledInput
        type="text"
        placeholder="Wraite your quote"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></StyledInput>
      <StyledBullon type="submit">💜 Send Happy Thought 💜</StyledBullon>
    </StyledForm>
  );
}

const QuoteCard = styled.blockquote`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  gap: 20px;
  background-color: var(--bg-quote);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
`;

const QuoteText = styled.p`
  font-size: var(--p-size);
`;

const LikeButton = styled.button`
  height: 50px;
  width: 50px;
  border-radius: var(--radius-circle);
  background-color: ${(props) =>
    props.count >= 1 ? "var(--bg-active)" : "var(--bg-like)"};
  border: none;
  cursor: pointer;
`;

const StyledDiv1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledDiv2 = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export function QuoteBox({
  countLikes,
  onLikes,
  quoteTime,
  quote,
  getTimeAgo,
}) {
  return (
    <QuoteCard>
      <QuoteText>{quote}</QuoteText>
      <StyledDiv1>
        <StyledDiv2>
          <LikeButton count={countLikes} onClick={onLikes}>
            💜
          </LikeButton>
          <span>x {countLikes}</span>
        </StyledDiv2>
        <p>{getTimeAgo(quoteTime)}</p>
      </StyledDiv1>
    </QuoteCard>
  );
}
