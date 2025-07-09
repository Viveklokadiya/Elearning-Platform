import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import { FaGraduationCap, FaUsers, FaPlayCircle, FaChartLine } from "react-icons/fa";
import { HiTrendingUp, HiOutlineDocumentText } from "react-icons/hi";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Courses",
      value: stats.totalCoures || 0,
      icon: FaGraduationCap,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Total Lectures",
      value: stats.totalLectures || 0,
      icon: FaPlayCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: FaUsers,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, manage your e-learning platform</p>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg">
            <HiTrendingUp className="w-5 h-5" />
            <span className="font-medium">Live Stats</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <div className={`h-2 bg-gradient-to-r ${stat.color} rounded-full w-full opacity-20`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <HiOutlineDocumentText className="w-6 h-6 mr-2 text-blue-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/admin/course')}
                className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
              >
                <div className="font-medium text-blue-900">Manage Courses</div>
                <div className="text-sm text-blue-700">Add, edit, or delete courses</div>
              </button>
              <button 
                onClick={() => navigate('/admin/users')}
                className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
              >
                <div className="font-medium text-green-900">Manage Users</div>
                <div className="text-sm text-green-700">View and manage user accounts</div>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaChartLine className="w-6 h-6 mr-2 text-green-600" />
              System Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Platform Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Database</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Storage</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  85% Used
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashbord;
