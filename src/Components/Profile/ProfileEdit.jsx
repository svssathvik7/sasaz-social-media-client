import React, { useState, useContext } from 'react';
import { userContextProvider } from '../Contexts/UserContext';
import axios from 'axios';

const ProfileEdit = () => {
  const { user, setUsers } = useContext(userContextProvider);

  const [change, setChange] = useState({
    name: true,
    email: true,
    password: true,
    newPassword: true,
    randomData: true,
    randomData2: true,
    randomData3: true,
  });

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    newPassword: '',
    randomData: '',
    randomData2: '',
    randomData3: '',
  });

  const changeVisibility = (fieldName) => {
    setChange((prevChange) => ({
      ...prevChange,
      [fieldName]: !prevChange[fieldName],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = (fieldName) => {
    changeVisibility(fieldName);
    // Reset the form data when cancel is clicked
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: user[fieldName], // Reset to the original value
    }));
  };

  const handleSubmit = async (changedField) => {
    // Here you can send the formData to your backend API
    // For simplicity, let's log the data to the console
    const email = user.email;
    const newData = formData[changedField];
    const response = await axios.post('http://localhost:5001/api/authenticate/editUser', { email, changedField, newData });
    const data = response.data;
    if (data.status === true) {
      setFormData((prevValue) => {
        return { ...prevValue, [changedField]: newData }
      });
      setUsers((prevValue) => {
        return { ...prevValue, [changedField]: newData }
      });
    }
    else {
      console.log(data.message);
      console.log("There might be some issue please try again!");
    }
    // Reset the form data and hide the input field after submitting
    changeVisibility(changedField);
  };

  return (
    <div id="profile-edit-main">
      {change.name ? (
        <div className='profile-edit-dynamics'>
          <h3>{user.name}</h3>
          <button name="name" onClick={() => changeVisibility('name')}>
            Edit
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter your new name..."
            value={formData.name}
            onChange={handleInputChange}
          />
          <button name="name" onClick={() => handleCancel('name')}>
            Cancel
          </button>
          <button name="name" onClick={() => handleSubmit('name')}>
            Submit
          </button>
        </div>
      )}
      {change.email ? (
        <div className='profile-edit-dynamics'>
          <h3>{user.email}</h3>
          <button name="email" onClick={() => changeVisibility('email')}>
            Edit
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            name="email"
            placeholder="Enter your new email..."
            value={formData.email}
            onChange={handleInputChange}
          />
          <button name="email" onClick={() => handleCancel('email')}>
            Cancel
          </button>
          <button name="email" onClick={() => handleSubmit('email')}>
            Submit
          </button>
        </div>
      )}

      {change.password ? (
        <div className='profile-edit-dynamics'>
          <h3>Change your password</h3>
          <button name="password" onClick={() => changeVisibility('password')}>
            Edit
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            name="password"
            placeholder="Enter your new password..."
            value={formData.password}
            onChange={handleInputChange}
          />
          <button name="password" onClick={() => handleCancel('password')}>
            Cancel
          </button>
          <button name="password" onClick={() => handleSubmit('password')}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
