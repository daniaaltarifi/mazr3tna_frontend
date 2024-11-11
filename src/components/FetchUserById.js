// FetchUserById.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const FetchUserById = (API_URL) => {
  const [fetchUser, setFetchUser] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("account"));

    if (storedUser && storedUser.id) {
      const getUserById = async () => {
        try {
          const response = await axios.get(`${API_URL}/auth/getuserbyid/${storedUser.id}`);
          if (response.data) {
            setFetchUser(response.data);
            // console.log("Fetched user data:", response.data);
          } else {
            console.error(response.data.message);

          }
        } catch (err) {
          console.error("Error fetching user by ID:", err);
        }
      };

      getUserById();
    }
  }, [API_URL]);

  return { fetchUser };
};

export default FetchUserById;
