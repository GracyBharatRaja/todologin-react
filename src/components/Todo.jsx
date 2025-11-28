import React, { useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingTodoId, setEditingTodoID] = useState(null);
  const [editingText, setEditingText] = useState("");

  function handleAddTodo(e) {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now().toString(), text: inputValue.trim(), completed: false },
    ]);
    setInputValue("");
  }

  function handleDeleteTodo(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    if (editingTodoId === id) {
      setEditingTodoID(null);
      setEditingText("");
    }
  }

  function handleEditTodo(id, text) {
    setEditingTodoID(id);
    setEditingText(text);
  }

  function handleSaveEdit(id) {
    if (!editingText.trim()) return;
    setTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, text: editingText.trim() } : todo)));
    setEditingTodoID(null);
    setEditingText("");
  }

  function handleCancelEdit() {
    setEditingTodoID(null);
    setEditingText("");
  }

 
  function toggleCompleted(id) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

 
  function handleTodoKeyDown(e, id) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCompleted(id);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">My Todo List</h1>
          <span className="text-sm text-gray-500">
            {todos.length} item{todos.length !== 1 ? "s" : ""}
          </span>
        </div>

        <form onSubmit={handleAddTodo} className="flex gap-3 mb-4">
          <input
            className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Add a new todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="New todo"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Add
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No todos yet — add one above.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {todos.map((todo) => (
              <li key={todo.id} className="py-3 flex items-center justify-between">
                {editingTodoId === todo.id ? (
                  <div className="flex-1 flex items-center gap-3">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label="Edit todo"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(todo.id)}
                        className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span
                      onClick={() => toggleCompleted(todo.id)}
                      onKeyDown={(e) => handleTodoKeyDown(e, todo.id)}
                      role="button"
                      tabIndex={0}
                      className={`flex-1 cursor-pointer select-none ${
                        todo.completed ? "text-red-600 line-through decoration-red-600" : "text-gray-800"
                      }`}
                      aria-pressed={todo.completed}
                    >
                      {todo.text}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditTodo(todo.id, todo.text)}
                        className="px-3 py-1 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="px-3 py-1 rounded-md border border-red-600 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}