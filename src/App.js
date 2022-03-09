import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import Layout from "./components/Layout";
function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Posts />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
