import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { UserData } from "../../context/UserContext";

const Sidebar = () => {
  const { user } = UserData();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: AiFillHome,
      path: "/admin/dashboard"
    },
    {
      name: "Courses",
      icon: FaBook,
      path: "/admin/course"
    },
    ...(user && user.mainrole === "superadmin" ? [{
      name: "Users",
      icon: FaUserAlt,
      path: "/admin/users"
    }] : []),
    {
      name: "Logout",
      icon: AiOutlineLogout,
      path: "/account"
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white shadow-lg text-gray-600 hover:text-gray-900"
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-500">E-Learning Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                  >
                    <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info */}
        {user && (
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">                <span className="text-white font-medium text-sm">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.mainrole === "superadmin" ? "Super Admin" : "Admin"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>    </>
  );
};

export default Sidebar;
