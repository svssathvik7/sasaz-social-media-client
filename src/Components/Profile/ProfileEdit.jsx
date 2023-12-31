import React, { useState, useContext } from 'react';
import { userContextProvider } from '../Contexts/UserContext';

const ProfileEdit = () => {
  const { user } = useContext(userContextProvider);

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

  const handleSubmit = async (fieldName) => {
    // Here you can send the formData to your backend API
    // For simplicity, let's log the data to the console
    console.log('Submitting data:', formData);

    // Reset the form data and hide the input field after submitting
    changeVisibility(fieldName);
  };

  return (
    <div id="profile-edit-main">
      <div>
        {!change.name ? (
          <div>
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
      </div>

      <div>
        {!change.email ? (
          <div>
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
      </div>

      <div>
        {!change.password ? (
          <div>
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
    </div>
  );
};

export default ProfileEdit;
