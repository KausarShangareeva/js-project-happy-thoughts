import { GlobalStyles } from "./GlobalStyles";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Form } from "./Form.jsx";
import { Loading } from "./Loading.jsx";
import { QuoteBox } from "./Quote.jsx";
import { LikedPost } from "./LikedPost.jsx";
import { Login } from "./Login.jsx";

const API_URL = "https://js-project-api-express-js.onrender.com";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const LogoutBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoutButton = styled.button`
  border: none;
  padding: 8px 20px;
  border-radius: var(--radius-button);
  background-color: var(--bg-like);
  cursor: pointer;
  font-family: "Play", sans-serif;

  &:hover {
    background-color: var(--bg-active);
  }
`;

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedpost, setLikedPosts] = useState(() => {
    const storedValue = localStorage.getItem("likedpost");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  const [lastLikedId, setLastLikedId] = useState(null);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem("likedpost", JSON.stringify(likedpost));
  }, [likedpost]);

  useEffect(() => {
    async function fetchThoughts() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/thoughts`);
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        setThoughts(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchThoughts();
  }, []);

  function getTimeAgo(date) {
    if (!date) return "";
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
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
        const res = await fetch(`${API_URL}/thoughts/${thoughtId}/like`, {
          method: "POST",
        });
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

  const handleDelete = async (thoughtId) => {
    try {
      const res = await fetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: "DELETE",
        headers: { Authorization: user.accessToken },
      });
      if (res.ok) {
        setThoughts((prev) => prev.filter((t) => t._id !== thoughtId));
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleEdit = async (thoughtId, newMessage) => {
    try {
      const res = await fetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.accessToken,
        },
        body: JSON.stringify({ message: newMessage }),
      });
      if (res.ok) {
        const updated = await res.json();
        setThoughts((prev) =>
          prev.map((t) => (t._id === thoughtId ? updated : t))
        );
      }
    } catch (error) {
      console.error("Error editing:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <GlobalStyles />
      <StyledDiv>
        {!user ? (
          <Login onLogin={setUser} />
        ) : (
          <LogoutBar>
            <p>Hi, {user.name}!</p>
            <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
          </LogoutBar>
        )}

        {likedpost.length > 0 ? (
          <LikedPost>
            Wow! You liked {likedpost.length} posts so far
          </LikedPost>
        ) : (
          <LikedPost>
            Start exploring and show some love to your favorite posts
          </LikedPost>
        )}

        {user && <Form setThoughts={setThoughts} user={user} />}

        {loading ? (
          <Loading />
        ) : (
          thoughts.map((thought) => (
            <QuoteBox
              key={thought._id}
              id={thought._id}
              quote={thought.message}
              countLikes={thought.hearts}
              quoteTime={thought.createdAt}
              getTimeAgo={getTimeAgo}
              onLikes={() => handleLike(thought._id)}
              animateHeart={lastLikedId === thought._id}
              authorName={thought.user?.name}
              isOwner={user && thought.user && String(thought.user._id) === String(user.id)}
              onDelete={() => handleDelete(thought._id)}
              onEdit={(newMsg) => handleEdit(thought._id, newMsg)}
            />
          ))
        )}
      </StyledDiv>
    </>
  );
};
