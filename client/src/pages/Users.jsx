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
                // console.log(response.data.users)
                setTotalPages(response.data.totalPages)

            }catch(error){
                console.log(error)

            }
        };
        fetchUsers()
    },[page])
   
return (
  <div className="p-4">
    <h2 className="mb-4 text-xl font-bold">
      Registered Users
    </h2>

    {users.map((user) => (
      <div key={user._id} className="mb-3 border bg-white p-4">
        <p>Name: {user.firstName} {user.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
        <p>Mobile: {user.mobile}</p>
        <p>Gender: {user.gender}</p>
        <p>User ID: {user.userId}</p>
      </div>
    ))}

    <p className="mb-3">
      Page {page} of {totalPages}
    </p>

    <button
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
      className="mr-2 border bg-white p-2 disabled:opacity-50"
    >
      Previous
    </button>

    <button
      onClick={() => setPage(page + 1)}
      disabled={page === totalPages}
      className="border bg-white p-2 disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

}

export default Users;