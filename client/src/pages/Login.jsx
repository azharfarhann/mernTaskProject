import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/public/user/login",
        formData,
      );
      setMessage(response.data.msg);
     setTimeout(()=> {
        navigate("/users")
     },10000)
    //   console.error(response.data.msg)
    } catch (error) {
      setMessage(
        error.response?.data?.msg || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        name="userId"
        placeholder="User ID"
        value={formData.userId}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging In.." : "Login"}
      </button>
      <p>{message}</p>
    </form>
  );
}

export default Login;
