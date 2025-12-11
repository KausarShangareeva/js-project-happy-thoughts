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

const Error = styled.span`
  background-color: var(--bg-active);
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: var(--radius);
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
    font-family: "Play", sans-serif;
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
  font-family: "Play", sans-serif;

  &:hover {
    background-color: var(--bg-active-hover);
  }
`;

const TooLong = styled.p`
  background-color: var(--bg-active);
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: var(--radius);
`;

const TooShort = styled.p`
  background-color: var(--bg-active);
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: var(--radius);
`;

export function Form({ setQuote }) {
  const [inputValue, setInputValue] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;

    const newQuote = {
      text: inputValue,
      time: new Date(),
      likes: 0,
    };

    if (charCount < 10 || charCount > 140) {
      setShowError(true);
    } else {
      setShowError(false);
      setQuote((prev) => [newQuote, ...prev]);
      setCharCount(0);
      setInputValue("");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TitleH1>What's is making me happy!</TitleH1>
      <StyledInput
        type="text"
        placeholder="Wraite your quote"
        value={inputValue}
        onChange={handleChange}
      ></StyledInput>
      <p>
        140 /
        {charCount > 140 ? (
          <Error> You have riched the limit (- {charCount - 140})</Error>
        ) : (
          charCount
        )}
      </p>
      {showError && charCount > 140 && (
        <TooLong>
          Sorr, but your message is <strong>too Long</strong>, plece delete -{" "}
          {charCount - 140}
          characters
        </TooLong>
      )}
      {showError && charCount < 10 && (
        <TooShort>
          Sorr, but your message is <strong>too short</strong>, plece add more +{" "}
          {charCount} characters
        </TooShort>
      )}
      <StyledBullon type="submit">💜 Send Happy Thought 💜</StyledBullon>
    </StyledForm>
  );
}
