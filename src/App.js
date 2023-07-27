import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

//components
import Navbar from "./components/common/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import Spinner from "./components/common/Spinner";
import RequireAuth from "./components/common/RequireAuth";
import ChatsPage from "./components/chat/ChatsPage";

function App() {
  const [user, setUser] = useState(null);
  const [isUserSet, setIsUserSet] = useState(false);

  useEffect(() => {
    const usub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsUserSet(true);
    });

    return () => usub();
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      {isUserSet ? (
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth user={user}>
                <ChatsPage></ChatsPage>
              </RequireAuth>
            }
          ></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      ) : (
        <div className="text-center m-5">
          <Spinner />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
