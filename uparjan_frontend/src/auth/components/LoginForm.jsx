import "./Login.css";

export default function LoginForm({
  title,
  formData,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className="login-container">

      <div className="login-card">

        <h2>{title}</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={formData.userId}
            onChange={handleChange}
            className="login-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
          />

          <button className="login-button">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}