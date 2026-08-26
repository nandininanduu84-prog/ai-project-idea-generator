import React, { useEffect, useState } from 'react';
import { adminService } from '../services/services';
import { toast } from 'react-toastify';
import { FaSpinner, FaTrash, FaUsers, FaLaptop } from 'react-icons/fa';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    if (activeTab === 'stats') {
      fetchStats();
    } else if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const response = await adminService.getDashboardStats();
      setStats(response.data.stats);
    } catch (error) {
      toast.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await adminService.getAllUsers();
      setUsers(response.data.users);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminService.deleteUser(userId);
        setUsers(users.filter((u) => u._id !== userId));
        toast.success('User deleted');
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <FaSpinner className="text-4xl text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('stats')}
          className={`btn ${activeTab === 'stats' ? 'btn-primary' : 'btn-outline'}`}
        >
          Statistics
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline'}`}
        >
          Users
        </button>
      </div>

      {activeTab === 'stats' && stats && (
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <FaUsers className="text-4xl text-primary mx-auto mb-4" />
            <p className="text-gray-600">Total Users</p>
            <p className="text-4xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="card text-center">
            <FaLaptop className="text-4xl text-primary mx-auto mb-4" />
            <p className="text-gray-600">Total Projects</p>
            <p className="text-4xl font-bold">{stats.totalProjects}</p>
          </div>
          <div className="card text-center">
            <FaSpinner className="text-4xl text-primary mx-auto mb-4" />
            <p className="text-gray-600">Total Generations</p>
            <p className="text-4xl font-bold">{stats.totalGenerations}</p>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Users List</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Branch</th>
                  <th className="text-left p-2">Year</th>
                  <th className="text-left p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.branch}</td>
                    <td className="p-2">{user.yearOfStudy}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="btn btn-outline text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
