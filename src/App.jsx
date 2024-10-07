// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import SignInPage from "./pages/SignInPage";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "../src/pages/ProtectedRoutes";
import { useSelector } from "react-redux";

function App() {
    // const {user} = useSelector((state) => state.auth);
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if(user && user != null) {
    //         navigate("/");
    //     }
    // }, [navigate, user])
  return (
    <>
        <BrowserRouter>
            <Routes>
               <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" />
               </Route>
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
