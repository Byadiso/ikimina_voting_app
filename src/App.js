import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginCode, setLoginCode] = useState("");
  const [error, setError] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [names] = useState([
    "Pazzo",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
    "Grace",
    "Hank",
    "Ivy",
    "Jack",
  ]);
  const [numbers, setNumbers] = useState([]);
  const [lastClicked, setLastClicked] = useState("");
  const [testCount, setTestCount] = useState(3);
  const [isTesting, setIsTesting] = useState(true);
  const [votingComplete, setVotingComplete] = useState(false);
  const [showLogout, setShowLogout] = useState(false); // State to control logout button visibility

  // Check login state from localStorage when the app starts
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState === "true") {
      setIsLoggedIn(true);
    }

    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    const validCode = "kigali"; // Replace this with your desired login code
    if (loginCode === validCode) {
      setIsLoggedIn(true);
      setError("");
      localStorage.setItem("isLoggedIn", "true"); // Store login state in localStorage
    } else {
      setError("Invalid login code. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogout(false); // Hide logout button upon logout
    localStorage.removeItem("isLoggedIn"); // Remove login state from localStorage
  };

  const generateRandomNumbers = () => {
    if (votingComplete) return;

    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < 10) {
      uniqueNumbers.add(Math.floor(Math.random() * 10) + 1);
    }
    setNumbers([...uniqueNumbers]);

    if (isTesting) {
      if (testCount > 1) {
        setTestCount(testCount - 1);
        setLastClicked(
          `Test click performed at: ${new Date().toLocaleString()}`
        );
      } else {
        setTestCount(0);
        setIsTesting(false);
        setLastClicked(
          `Test phase completed at: ${new Date().toLocaleString()}`
        );
      }
    } else {
      setVotingComplete(true);
      setShowLogout(true); // Show logout button after voting is complete
      setLastClicked(
        `Voting started and completed at: ${new Date().toLocaleString()}`
      );
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-welcome">
          <h1>Welcome to Ikimina Voting App!</h1>
          <p>
            Please log in to start the voting process. Enter your login code
            below:
          </p>
        </div>
        {/* <h1>Login</h1> */}
        <input
          type="text"
          placeholder="Enter login code"
          value={loginCode}
          onChange={(e) => setLoginCode(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="app-container">
      <header>
        <h1>Ikimina Vote App</h1>
        <p>
          {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
        </p>
        <p> Refresh the page to reset voting process!</p>
      </header>
      <main>
        {!votingComplete &&
          (isTesting ? (
            <p className="test-count">
              Testing in progress: {testCount} click{testCount > 1 ? "s" : ""}{" "}
              remaining
            </p>
          ) : (
            <p className="test-complete">
              Testing complete. You are starting voting.
            </p>
          ))}
        <button
          onClick={generateRandomNumbers}
          className="start-button"
          style={{
            marginTop: votingComplete ? "10px" : "0",
            backgroundColor: votingComplete ? "grey" : null,
          }}
          disabled={votingComplete}
        >
          {votingComplete ? "Voting Completed" : isTesting ? "Test" : "Start"}
        </button>
        {lastClicked && <p className="last-clicked">{lastClicked}</p>}
        {numbers.length > 0 && (
          <div className="results">
            <h2>Generated Numbers</h2>
            <ul>
              {names.map((name, index) => (
                <li key={index}>
                  {name}: {numbers[index]}
                </li>
              ))}
            </ul>
            {showLogout && (
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            )}
          </div>
        )}
      </main>
      {showLogout && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
      <footer>
        <p>
          Developed and designed by
          <a
            href="https://www.linkedin.com/in/desire-byamungu-5b0785a1/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Desire B
          </a>
          with ❤️ at
          <a
            href="https://www.nganatech.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            nganatech.com
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default App;
