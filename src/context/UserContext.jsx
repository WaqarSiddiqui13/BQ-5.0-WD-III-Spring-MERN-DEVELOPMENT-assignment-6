import { createContext, useContext, useState } from "react";

// ── 1. Create the context ──────────────────────────────────────────────────
const UserContext = createContext(null);

// ── 2. Custom hook for easy consumption ──────────────────────────────────
export const useUsers = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUsers must be used inside <UserProvider>");
  return ctx;
};

// ── 3. Provider with full CRUD state ─────────────────────────────────────
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith",    email: "bob@example.com",   role: "Editor" },
    { id: 3, name: "Carol White",  email: "carol@example.com", role: "Viewer" },
  ]);
  const [nextId, setNextId] = useState(4);

  // CREATE
  const addUser = (data) => {
    setUsers((prev) => [...prev, { id: nextId, ...data }]);
    setNextId((n) => n + 1);
  };

  // UPDATE
  const updateUser = (id, data) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...data } : u))
    );

  // DELETE
  const deleteUser = (id) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
