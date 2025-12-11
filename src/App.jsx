import { GlobalStyles } from "./GlobalStyles";
import styled from "styled-components";
import { Form } from "./Form.jsx";
import { QuoteBox } from "./Quote.jsx";
import { useState } from "react";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const App = () => {
  const [quote, setQuote] = useState([]);

  function getTimeAgo(date) {
    if (!date) return "";
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    return `${Math.floor(diff / 86400)} d ago`;
  }

  return (
    <>
      <GlobalStyles />
      <StyledDiv>
        <Form setQuote={setQuote} />

        {quote &&
          quote.map((q, index) => (
            <QuoteBox
              key={index}
              quote={q.text}
              countLikes={q.likes}
              quoteTime={q.time}
              getTimeAgo={getTimeAgo}
              onLikes={() => {
                const newQuotes = [...quote];
                newQuotes[index].likes += 1;
                setQuote(newQuotes);
              }}
            />
          ))}
      </StyledDiv>
    </>
  );
};
