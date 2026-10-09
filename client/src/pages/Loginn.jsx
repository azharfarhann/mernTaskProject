function Loginn(){
    const[formData,setFormData] = useState({
        userId:"",
        password: ""
    })
    const[message,setMessage] = useState("")
        const[loading,setLoading] = useState(true)
        function handleChange(e){
            setFormData({...formData,[e.target.name]:e.target.value})
        }
        async function handleSubmit(e){
            e.preventDefault();
            setMessage("");
            setLoading(true);
            try{
                const response = await axios.post("http://localhost:5000/api/public/user/login",formData)
                setMessage(response.data.message)
            } catch(error){
                setMessage(error.response?.data?.message || "login failed. please try again")
            } finally{
                setLoading(false)
            }
        }
        return (
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="text" name="userId" value={formData.userId} onChange={handleChange} placeholder="User ID " />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <button type="submit" disabled={loading}>{loading ? "Logging in" : "Login"}</button>
                <p>{message}</p>
            </form>
        )   
}
export default Loginn