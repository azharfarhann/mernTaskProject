import { useState,useEffect } from "react";
import axios from "axios";

function Users() {
    const[users,setUsers] = useState([])
    const[page,setPage] = useState(1)
    const[totalPages,setTotalPages] = useState(1)

    useEffect(() => {
        async function fetchUsers() {
            try{
                const response = await axios.get(`http://localhost:5000/api/public/user/users?page=${page}&limit=5`)
                setUsers(response.data.users)
                console.log(response.data.users)
                setTotalPages(response.data.totalPages)

            }catch(error){
                console.log(error)

            }
        };
        fetchUsers()
    },[page])
    return (
        <div>
            <h2>Registered Users </h2>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Mobile</th>
                        <th>Gender</th>
                        <th>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=> (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.mobile}</td>
                            <td>{user.gender}</td>
                            <td>{user.userId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          <p>Page {page} of {totalPages}</p>
          <button onClick={()=> setPage(page -1)} disabled={page === 1}>Previous</button>
          <button onClick={()=> setPage(page + 1)} disabled={page === totalPages}>Next</button>
        </div>
    )
}

export default Users;