import { useState } from "react";
import { useUsers } from "../context/UserContext";

const ROLES = ["Admin", "Editor", "Viewer"];

const emptyForm = { name: "", email: "", role: "Viewer" };

export default function UserForm({ editingUser, onCancel }) {
  const { addUser, updateUser } = useUsers();
  const [form, setForm] = useState(editingUser ?? emptyForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    editingUser ? updateUser(editingUser.id, form) : addUser(form);
    onCancel();
  };

  return (
    <form className="user-form" onSubmit={handleSubmit} noValidate>
      <h2>{editingUser ? "✏️ Edit User" : "➕ Add New User"}</h2>

      <div className="field">
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="field">
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="user@email.com" />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="field">
        <label>Role</label>
        <select name="role" value={form.role} onChange={handleChange}>
          {ROLES.map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingUser ? "Save Changes" : "Add User"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
