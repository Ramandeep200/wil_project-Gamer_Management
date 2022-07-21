import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router,Routes, Route, } from "react-router-dom";

const Welcome = lazy(() => import("./Pages/Welcome"));
const Signup = lazy(() => import("./Pages/Signup"));
const Login = lazy(() => import("./Pages/Login"));
const Profile = lazy(() => import("./Pages/Profile"));
const Users = lazy(() => import("./Pages/Users"));
const User = lazy(() => import("./Pages/User"));
const CreateUser = lazy(() => import("./Pages/CreateUser"));
const Accessrequest = lazy(() => import("./Pages/Accessrequest"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add/:id" element={<User />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/accessrequest" element={<Accessrequest />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
