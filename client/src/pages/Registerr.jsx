import axios from "axios";
import { useState } from "react";

function Registerr() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    mobile: "",
    gender: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/public/user/register",
        formData,
      );
      setMessage(`Registration success. your userId is ${response.data.userId}`);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        mobile: "",
        gender: "",
      });
    } catch (error) {
      setMessage(error.response.data.msg || "Register failed");
    } finally {
      setLoading(false);
    }
  }
  return (
    
    <form onSubmit={handleSubmit}>
        <h2>Register</h2>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="first Name"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <input
        type="text"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        placeholder="Mobile"
      />
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Registering.." : "Register"}
      </button>
      <p>{message}</p>
    </form>
  );
}

export default Registerr;
