import { useEffect, useState } from 'react';
import './Search.css';
import { fetchSearchImages, searchUsers } from '../../services/api';

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
  if (searchText === '') {
    setUsers([]);
    return;
  }

  searchUsers(searchText)
    .then(data => {
      setUsers(data);
    })
    .catch(error => {
      console.error(error);
    });
}, [searchText]);

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
          {users.map((user) => (
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
              key={item._id}
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