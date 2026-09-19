import { useState } from "react";
import { UserProvider, useUsers } from "./context/UserContext";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

// Stats bar reads from context
function StatsBar() {
  const { users } = useUsers();
  const counts = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] ?? 0) + 1;
    return acc;
  }, {});
  return (
    <div className="stats-bar">
      <span>👥 Total <strong>{users.length}</strong></span>
      {Object.entries(counts).map(([role, n]) => (
        <span key={role}>{role} <strong>{n}</strong></span>
      ))}
    </div>
  );
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const openCreate = () => { setEditingUser(null); setShowForm(true); };
  const openEdit   = (u) => { setEditingUser(u);   setShowForm(true); };
  const closeForm  = ()  => { setShowForm(false);  setEditingUser(null); };

  return (
    <UserProvider>
      <div className="app">
        {/* ── Header ── */}
        <header className="app-header">
          <div>
            <h1>👤 User Manager</h1>
            <p className="subtitle">Powered by <code>useContext</code></p>
          </div>
          <button className="btn btn-primary" onClick={openCreate}>
            + Add User
          </button>
        </header>

        {/* ── Stats ── */}
        <StatsBar />

        {/* ── Form (modal-like card) ── */}
        {showForm && (
          <div className="form-overlay">
            <UserForm editingUser={editingUser} onCancel={closeForm} />
          </div>
        )}

        {/* ── Table ── */}
        <main className="app-main">
          <UserList onEdit={openEdit} />
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
