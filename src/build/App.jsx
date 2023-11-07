import React from 'react'
import Layout from './features/Layout'
import SinglePage from './features/SinglePage'
import { Route, Routes } from "react-router-dom";
import Header from './features/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path="singlePage/:id" element={<SinglePage />} />
      </Routes>
    </div>
  );
}

export default App