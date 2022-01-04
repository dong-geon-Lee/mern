// import React, { useEffect, useState } from "react";
// import "./App.css";
// import Clock from "./Clock";
// import Snippet from "./Snippet";

// const App = () => {
//   const snippets = [
//     {
//       id: 1,
//       title: "snippets 1",
//     },
//     {
//       id: 2,
//       title: "snippets 2",
//     },
//     {
//       id: 3,
//       title: "snippets 3",
//     },
//   ];

//   const [click, setClick] = useState(0);
//   const [showMessage, setShowMessage] = useState(false);
//   const [time, setTime] = useState(new Date().toLocaleTimeString());
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [randomNumber, setRandomNumber] = useState(Math.random());
//   const [messageShown, setMessageShown] = useState(false);

//   const onClick = () => {
//     setClick(click + 1);
//   };

//   const booleanClick = () => {
//     setShowMessage(!showMessage);
//   };

//   const sendData = (e) => {
//     e.preventDefault();

//     console.log(username, password);

//     setUsername("");
//     setPassword("");
//   };

//   const inputUsername = (username) => {
//     setUsername(username);
//   };

//   const inputPassword = (password) => {
//     setPassword(password);
//   };

//   useEffect(() => {
//     setInterval(() => {
//       setTime(new Date().toLocaleTimeString());
//       setRandomNumber(Math.random());
//     }, 5000);
//   }, []);

//   useEffect(() => {
//     console.log('message transform! detected!');
//   }, [messageShown])

//   return (
//     <form onSubmit={sendData} className="App">
//       <p>Clicks: {click}</p>
//       <p>Boolean toggle: {showMessage ? "change" : "stay"}</p>
//       {showMessage && <p>We are changing MacBook</p>}
//       {messageShown && <p>Some message!!!</p>}

//       <Clock time={time}></Clock>
//       <h1>{randomNumber}</h1>
//       {snippets.map((snippet) => (
//         <Snippet title={snippet.title} key={snippet.id}></Snippet>
//       ))}

//       <input
//         type="text"
//         onChange={(e) => inputUsername(e.target.value)}
//         value={username}
//         placeholder="Username"
//       />
//       <input
//         type="password"
//         onChange={(e) => inputPassword(e.target.value)}
//         value={password}
//         placeholder="Password"
//       />

//       <button type="submit">Log in</button>
//       <button onClick={onClick}>Click me!</button>
//       <button onClick={booleanClick}>Toggle </button>
//       <button onClick={() => setMessageShown(!messageShown)}>
//         Toggle message
//       </button>
//     </form>
//   );
// };

// export default App;
