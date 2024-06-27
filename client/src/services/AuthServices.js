import axios from 'axios';
// const url = "http://ec2-54-234-133-143.compute-1.amazonaws.com:4000"
// const url = "http://localhost:4000";

const register = async (fullName, email, password) => {
  try {
    const response = await axios.post(`/api/user/register`, {
      fullName,
      email,
      password,
    });

    console.log('Registration successful:', response.data);

    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`/api/user/login`, {
      email,
      password,
    });

    if (response.status === 200) {
      console.log('Login successful:', response.data);
      return response.data;
    } else {
      console.error('Login failed:', response.status, response.data);
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error;
  }
};

const getData = async () => {
  try {
    const response = await axios.post(
      `/api/user/get-user-info-by-id`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const AuthServices = {
  register,
  login,
  getData,
};

export default AuthServices;
