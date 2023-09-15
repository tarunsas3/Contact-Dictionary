import { useEffect, useState } from "react";
import "./App.css";
import { IoIosContact } from "react-icons/io";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [contactDisplay, setContactDisplay] = useState(true);
  const [updateContact, setUpdateContact] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    company: {
      name: "",
    },
  });

  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    company: {
      name: "",
    },
  });

  const handleDeleteClick = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        console.log("User Successfully Deleted : ", response.status);
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleUpdateClick = (user) => {
    setUpdateData({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: {
        name: user.company.name,
      },
    });
    setContactDisplay(false);
    setUpdateContact(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "company") {
      setFormData({
        ...formData,
        company: {
          ...formData.company,
          name: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    if (name === "company") {
      setUpdateData({
        ...updateData,
        company: {
          ...updateData.company,
          name: value,
        },
      });
    } else {
      setUpdateData({
        ...updateData,
        [name]: value,
      });
    }
  };

  const handleNewContactClick = () => {
    setContactDisplay(false);
    setUpdateContact(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      website: "",
      company: {
        name: "",
      },
    });
  };

  const handleSaveClick = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", formData, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        setUsers([...users, response.data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setContactDisplay(true);
    setUpdateContact(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      website: "",
      company: {
        name: "",
      },
    });
  };

  const handleUpdateClickFunction = (id) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, updateData, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        const updatedUser = response.data;
        setUsers((prevUsers) => {
          const userIndex = prevUsers.findIndex((user) => user.id === id);
          if (userIndex !== -1) {
            const updatedUsers = [...prevUsers];
            updatedUsers[userIndex] = updatedUser;
            return updatedUsers;
          }
          return prevUsers;
        });
        setContactDisplay(true);
        setUpdateContact(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      {contactDisplay && !updateContact && (
        <div className="container">
          <div className="buttonContainer">
            <h1>Contact Dictionary</h1>
            <button onClick={handleNewContactClick}>
              <IoIosContact className="icon" /> New Contact
            </button>
          </div>
          <hr />
          <div className="displayContact">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Website</th>
                  <th>Company</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.website}</td>
                      <td>{user?.company?.name}</td>
                      <td className="actionButtonContainer">
                        <button onClick={() => handleUpdateClick(user)}>
                          Update
                        </button>
                        <button onClick={() => handleDeleteClick(user.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!contactDisplay && !updateContact && (
        <div className="formContainer">
          <div className="formDisplay">
            <h3>
              <IoIosContact className="icon" /> New Contact
            </h3>
            <form>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
              />
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={formData.company.name}
                onChange={handleInputChange}
              />
              <button type="button" onClick={handleSaveClick}>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
      {!contactDisplay && updateContact && (
        <div className="formContainer">
          <div className="formDisplay">
            <h3>
              <IoIosContact className="icon" /> Update Contact
            </h3>
            <form>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={updateData.name}
                onChange={handleUpdateChange}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={updateData.email}
                onChange={handleUpdateChange}
              />
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={updateData.phone}
                onChange={handleUpdateChange}
              />
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={updateData.website}
                onChange={handleUpdateChange}
              />
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={updateData.company.name}
                onChange={handleUpdateChange}
              />
              <button
                type="button"
                onClick={() => handleUpdateClickFunction(updateData.id)}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
