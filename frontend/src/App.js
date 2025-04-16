import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [paging, setPaging] = useState({});
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(2);
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSizeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setSize(value);
      setPage(1);
    }
  };


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:3001/users?page=${page}&size=${size}&sort=${sort}`);
        setUsers(res.data.data);
        setPaging(res.data.paging);
      } catch (err) {
        setError('Failed to fetch users. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, [page, size, sort]);
  

  return (
    <div className="App">
      <h2>User Table</h2>

      {error && <div className="error">{error}</div>}

      {/* sorting */}
      <div className="controls">
        <label>
          Sort by:
          <select onChange={e => {
            setSort(e.target.value);
            setPage(1); // Reset to first page
          }}>
            <option value="">None</option>
            <option value="name">Name (Asc)</option>
            <option value="-name">Name (Desc)</option>
            <option value="id">ID (Asc)</option>
            <option value="-id">ID (Desc)</option>
          </select>
        </label>

        <label>
          Page Size:
          <input type="number" min="1" value={size} onChange={handleSizeChange} />
        </label>
      </div>

      {/* user table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="2">No users found</td></tr>
            )}
          </tbody>
        </table>
      )}

      {/* pagination */}
      <div className="pagination">
        {paging.previous && <button onClick={() => setPage(page - 1)}>Previous</button>}
        <span>Page {page} of {paging.totalPages || 1}</span>
        {paging.next && <button onClick={() => setPage(page + 1)}>Next</button>}
      </div>
    </div>
  );
}

export default App;