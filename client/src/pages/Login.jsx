import { useState } from "react";

function Login(){
    const [formData,setFormData] = useState({
        userId: "",
        password:""
    })
    function handleChange(e){
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    return (
        <div>
            <h2>Login</h2>
            <input type="text" name="userId" placeholder="User ID" value={formData.userId} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <button type="button">Login</button>
        </div>
    )
}

export default Login