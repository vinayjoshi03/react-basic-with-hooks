import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import Layout from "./Layout";
let ThemeContext = React.createContext();
function App() {
  
  return (
    <ThemeContext.Provider value={{data:'black'}} >
      <Layout>
        <Routes>
          <Route exact path="/" element={<Posts />}></Route>
        </Routes>
      </Layout>
    </ThemeContext.Provider>
  );
}

export default App;

