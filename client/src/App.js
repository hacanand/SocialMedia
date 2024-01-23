import Login from "./pages/login/Login";
import React, { useEffect, useRef } from "react";
import SignUp from "./pages/signUp/SignUp";
import { Routes, Route } from "react-router-dom";
import RequireUser from "./components/RequireUser";
import Feed from "./components/feed/Feed";
import Home from "./pages/home/Home";
import Profile from "./components/profile/Profile";
import UpdateProfile from "./components/updateProfile/updateProfile";
import LoadingBar  from "react-top-loading-bar";
import { useSelector } from "react-redux";
import CreatePost from "./components/createPost/CreatePost";
import NotloginedIn from "./components/NotloginedIn";
 
function App() {
  const loadingRef = useRef(null);
 
  // @ts-ignore
  const isLoading = useSelector(state => state.appConfigReducer.isLoading);
  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);
  return (
    <div className="App">
      <LoadingBar height={1} color="#5f9fff" ref={loadingRef} />
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/updateProfile"
              element={<UpdateProfile />}
            />
          </Route>
        </Route>
        <Route element={<NotloginedIn />}>
        <Route path="/login" element= {<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
