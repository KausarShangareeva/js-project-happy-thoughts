import { useState } from "react";
import styled from "styled-components";

const API_URL = "https://js-project-api-express-js.onrender.com";

const Wrapper = styled.div`
  background: var(--bg-form);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: var(--radius-input);
  border: none;
  font-family: "Play", sans-serif;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: none;
  padding: 12px 30px;
  border-radius: var(--radius-button);
  background-color: var(--bg-active);
  font-size: var(--h3-size);
  color: var(--color-font);
  cursor: pointer;
  font-family: "Play", sans-serif;

  &:hover {
    background-color: var(--bg-active-hover);
  }
`;

const Toggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: "Play", sans-serif;
  font-size: 14px;
  text-decoration: underline;
`;

const ErrorMsg = styled.p`
  color: #e03131;
  font-size: 14px;
`;

export function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isRegister ? "/register" : "/login";
    const body = isRegister
      ? { name, email, password }
      : { email, password };

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.details || "Something went wrong");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      onLogin(data);
    } catch (err) {
      setError("Could not connect to server");
    }
  };

  return (
    <Wrapper>
      <h2>{isRegister ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {isRegister && (
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button type="submit">{isRegister ? "Sign Up" : "Log In"}</Button>
      </form>
      <Toggle type="button" onClick={() => { setIsRegister(!isRegister); setError(""); }}>
        {isRegister ? "Already have an account? Log in" : "No account? Sign up"}
      </Toggle>
    </Wrapper>
  );
}
