import styled from "styled-components";

const QuoteCard = styled.blockquote`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  gap: 20px;
  background-color: var(--bg-quote);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
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
