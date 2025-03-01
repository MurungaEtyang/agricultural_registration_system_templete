import React, { useState, useEffect } from 'react';
import { getUsers, getRoles, upgradeUser } from "../../api-service/users";
import "bootstrap/dist/css/bootstrap.min.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response.success) {
          setUsers(response.response || []);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        if (response.success) {
          const rolesArray = response.response || [];
          setRoles(rolesArray);
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchUsers();
    fetchRoles();
  }, []);

  const handleSubmit = async (userId, role) => {
    try {
      const response = await upgradeUser(userId, role);
      if (response.success) {
        alert(response.message);
      }
    } catch (error) {
      console.error('Error upgrading user:', error);
    }
  };

  const handleRoleChange = async (e, userId) => {
    const role = e.target.value;
    await handleSubmit(userId, role);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Users</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    defaultValue={user.role}
                    className="form-select"
                    aria-label="Select user role"
                    style={{ width: '100%' }}
                    onChange={(e) => handleRoleChange(e, user.id)}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;