import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const response = await axios.get("http://localhost:3000/read");
    const data = response.data;
    setUsers(data);
  }

  useEffect(() => {
    getUsers().then(() => {
      setLoading(false);
    });
  }, []);

  console.log(users);

  return (
    <>
      {loading ? (
        <PulseLoader color="#161616" />
      ) : (
        users.map((user) => (
          <p className="text-xl text-red-600">{user.username}</p>
        ))
      )}
    </>
  );
}

export default App;
