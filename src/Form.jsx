import { useState } from "react";
import styled from "styled-components";
import { TooLong } from "./TooLong";
import { TooShort } from "./TooShort";
import { RichedLimit } from "./RichedLimit";

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
    font-family: "Play", sans-serif;
  }

  &:focus::placeholder {
    color: #adb5bd;
  }
`;

const StyledButton = styled.button`
  border: none;
  padding: 20px 40px;
  border-radius: var(--radius-button);
  background-color: var(--bg-active);
  font-size: var(--h3-size);
  color: var(--color-font);
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Play", sans-serif;
  transition: all 0.3 ease-in;

  &:hover {
    background-color: var(--bg-active-hover);
  }
`;

export function Form({ setThoughts }) {
  const [inputValue, setInputValue] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue) return;

    if (charCount < 10 || charCount > 140) {
      setShowError(true);
    } else {
      setShowError(false);
      const res = await fetch(
        "https://happy-thoughts-api-4ful.onrender.com/thoughts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: inputValue }),
        }
      );
      const newThoughtFromAPI = await res.json();
      setThoughts((prev) => [newThoughtFromAPI, ...prev]);
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
        {charCount > 140 ? <RichedLimit charCount={charCount} /> : charCount}
      </p>
      {showError && charCount > 140 && <TooLong charCount={charCount} />}
      {showError && charCount < 10 && <TooShort charCount={charCount} />}
      <StyledButton type="submit">💜 Send Happy Thought 💜</StyledButton>
    </StyledForm>
  );
}
