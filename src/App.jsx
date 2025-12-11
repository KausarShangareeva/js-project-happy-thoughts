import { GlobalStyles } from "./GlobalStyles";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Form } from "./Form.jsx";
import { Loading } from "./Loading.jsx";
import { QuoteBox } from "./Quote.jsx";
import { LikedPost } from "./LikedPost.jsx";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedpost, setLikedPosts] = useState(function () {
    const storedValue = localStorage.getItem("likedpost");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  const [lastLikedId, setLastLikedId] = useState(null);

  useEffect(() => {
    localStorage.setItem("likedpost", JSON.stringify(likedpost));
  }, [likedpost]);

  useEffect(() => {
    async function fetchThoughts() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://happy-thoughts-api-4ful.onrender.com/thoughts"
        );

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();

        setThoughts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchThoughts();
  }, []);

  function getTimeAgo(date) {
    if (!date) return "";

    const dateObj = new Date(date);
    const now = new Date();

    const diff = Math.floor((now - dateObj) / 1000);

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }

  const handleLike = async (thoughtId) => {
    if (!likedpost.includes(thoughtId)) {
      setLikedPosts([...likedpost, thoughtId]);
      setLastLikedId(thoughtId);

      try {
        const res = await fetch(
          `https://happy-thoughts-api-4ful.onrender.com/thoughts/${thoughtId}/like`,
          { method: "POST" }
        );

        const updatedThought = await res.json();

        setThoughts((prev) =>
          prev.map((t) => (t._id === thoughtId ? updatedThought : t))
        );
      } catch (error) {
        console.error("Error while liking:", error);
      }
      setTimeout(() => setLastLikedId(null), 500);
    }
  };

  return (
    <>
      <GlobalStyles />
      <StyledDiv>
        {likedpost.length > 0 ? (
          <LikedPost>
            Wow! You liked {likedpost.length} posts so far ❤️
          </LikedPost>
        ) : (
          <LikedPost>
            Start exploring and show some love to your favorite posts ❤️
          </LikedPost>
        )}

        <Form setThoughts={setThoughts} />

        {loading ? (
          <Loading />
        ) : (
          thoughts.map((thought) => (
            <QuoteBox
              key={thought._id}
              quote={thought.message}
              countLikes={thought.hearts}
              quoteTime={thought.createdAt}
              getTimeAgo={getTimeAgo}
              onLikes={() => handleLike(thought._id)}
              animateHeart={lastLikedId === thought._id}
            />
          ))
        )}
      </StyledDiv>
    </>
  );
};
