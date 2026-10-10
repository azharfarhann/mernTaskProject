import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
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
        "http://localhost:5000/api/public/user/register",
        formData,
      );
      setMessage(
        `Registration Successful. Your user ID is ${response.data.userId}`,
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        mobile: "",
        gender: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.msg || "Registration Failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-md space-y-4 rounded-lg bg-white p-6 shadow"
    >
      <h2 className="text-center text-2xl font-bold text-gray-800">Register</h2>{" "}
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full rounded border border-gray-300 p-2"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full rounded border border-gray-300 p-2"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full rounded border border-gray-300 p-2"
      />
      <input
        type="number"
        name="age"
        min={1}
        max={100}
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        className="w-full rounded border border-gray-300 p-2"
      />
      <input
        type="text"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        placeholder="Mobile"
        className="w-full rounded border border-gray-300 p-2"
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full rounded border border-gray-300 p-2"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Registering.." : "Register"}
      </button>
      <p className="text-center text-sm text-gray-700">{message}</p>
    </form>
  );
}

export default Register;
