import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";   // your existing Form.jsx
import Todo from "./components/Todo";   // your existing Todo.jsx

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Form />} />
      <Route path="/todos" element={<Todo />} />
    </Routes>
  );
}