import { useUsers } from "../context/UserContext";

const ROLE_COLOR = {
  Admin:  "#6366f1",
  Editor: "#f59e0b",
  Viewer: "#10b981",
};

export default function UserList({ onEdit }) {
  const { users, deleteUser } = useUsers();

  if (!users.length)
    return <p className="empty">No users yet. Add one above! 👆</p>;

  return (
    <div className="table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id}>
              <td>{idx + 1}</td>
              <td className="name-cell">{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className="badge"
                  style={{ background: ROLE_COLOR[user.role] ?? "#64748b" }}
                >
                  {user.role}
                </span>
              </td>
              <td className="actions">
                <button
                  className="btn btn-sm btn-edit"
                  onClick={() => onEdit(user)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (window.confirm(`Delete "${user.name}"?`))
                      deleteUser(user.id);
                  }}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
