import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatRoom from "./pages/ChatRoom";
import { Route, Routes } from "react-router-dom";

function App() {
  const [isLogin, setIslogin] = useState(true);

  const handePage = () => {
    if (isLogin === true) {
      setIslogin(false);
    } else {
      setIslogin(true);
    }
  };

  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/chatroom" element={<ChatRoom/>}/>
      </Routes>
    </div>
  );
}

export default App;
