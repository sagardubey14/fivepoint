import axios from 'axios';

const updatePassword = async (userInfo) => {
  const { user_id, email, password } = userInfo;

  try {
    const response = await axios.post('http://localhost:3000/users/updatepass', {
      user_id,
      email,
      password
    },{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    console.log('Password update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error.response?.data || error.message);
    throw error;
  }
};

export default updatePassword;
