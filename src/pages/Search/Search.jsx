import { useEffect, useState } from 'react';
import './Search.css';
import { fetchSearchImages, fetchUsers } from '../../services/api';

function Search() {

  const [searchImages, setSearchImages] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    fetchSearchImages()
      .then(data => {
        setSearchImages(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchUsers()
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

 const filteredUsers = users.filter(user =>
  user.username?.toLowerCase().includes(searchText.toLowerCase()) ||
  user.name?.toLowerCase().includes(searchText.toLowerCase())
);

  return (
    <div className="search-page">
      <div className="search-bar">
        <i className="bi bi-search"></i>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {searchText !== '' && (
        <div className="search-results">
          {filteredUsers.map((user) => (
            <div
              className="search-user"
              key={user.id}
            >
              <img
                src={user.avatar}
                alt={user.username}
              />

              <div className="search-user-info">
                <div className="search-user-name">
                  {user.name}
                </div>
                <div className="search-user-username">
                  @{user.username}
                </div>
              </div>
            </div>
          ))}
        </div>

      )}

      {searchText === '' && (
        <div className="search-grid">

          {searchImages.map((item) => (
            <div
              className="search-item"
              key={item.id}
            >
              <img
                src={item.image}
                alt=""
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;