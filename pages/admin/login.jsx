import styles from "../../styles/Login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        router.push("/admin");
      } else {
        console.error("Login failed with status", response.status);
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login request failed:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>

        <input
          placeholder="Username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleClick} className={styles.button}>
          Sign In
        </button>

        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default Login;
