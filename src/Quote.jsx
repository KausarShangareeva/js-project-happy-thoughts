import { useState } from "react";
import styled, { css, keyframes } from "styled-components";

const heartJump = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.5); }
  50% { transform: scale(1); }
  75% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const LikeButton = styled.button`
  height: 50px;
  width: 50px;
  border-radius: var(--radius-circle);
  background-color: ${(props) =>
    props.count >= 1 ? "var(--bg-active)" : "var(--bg-like)"};
  border: none;
  transition: 0.5s ease-out;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-active-hover);
  }

  ${(props) =>
    props.animate &&
    css`
      animation: ${heartJump} 0.5s ease-out;
    `}
`;

const QuoteCard = styled.blockquote`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  gap: 20px;
  background-color: var(--bg-quote);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
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
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
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

const AuthorName = styled.p`
  font-size: 12px;
  color: #868e96;
`;

const ActionButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;

  &:hover {
    opacity: 0.7;
  }
`;

const EditInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: var(--radius-input);
  border: 1px solid #dee2e6;
  font-family: "Play", sans-serif;
  font-size: 16px;
`;

export function QuoteBox({
  countLikes,
  onLikes,
  quoteTime,
  quote,
  getTimeAgo,
  animateHeart,
  authorName,
  isOwner,
  onDelete,
  onEdit,
}) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(quote);

  const handleSave = () => {
    if (editValue.length >= 5 && editValue.length <= 140) {
      onEdit(editValue);
      setEditing(false);
    }
  };

  return (
    <QuoteCard>
      {authorName && <AuthorName>by {authorName}</AuthorName>}

      {editing ? (
        <StyledDiv2 style={{ width: "100%" }}>
          <EditInput
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <ActionButton onClick={handleSave}>Save</ActionButton>
          <ActionButton onClick={() => setEditing(false)}>X</ActionButton>
        </StyledDiv2>
      ) : (
        <QuoteText>{quote}</QuoteText>
      )}

      <StyledDiv1>
        <StyledDiv2>
          <LikeButton
            count={countLikes}
            onClick={onLikes}
            animate={animateHeart}
          >
            💜
          </LikeButton>
          <span>x {countLikes}</span>
        </StyledDiv2>

        <StyledDiv2>
          {isOwner && !editing && (
            <>
              <ActionButton onClick={() => setEditing(true)}>Edit</ActionButton>
              <ActionButton onClick={onDelete}>Delete</ActionButton>
            </>
          )}
          <p>{getTimeAgo(quoteTime)}</p>
        </StyledDiv2>
      </StyledDiv1>
    </QuoteCard>
  );
}
