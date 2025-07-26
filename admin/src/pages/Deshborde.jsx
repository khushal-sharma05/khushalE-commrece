import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Users,
  ShoppingCart,
  IndianRupee,
  Package,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const Deshborde = () => {
  const [chartData, setChartData] = useState([]);
  const [orderChart, setOrderChart] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`);
      const data = res.data;

      console.log("📊 Dashboard Data:", data);

      setChartData(data?.chartData || []);
      setOrderChart(data?.orderChart || []); // monthly orders chart
      setUserReviews(data?.reviews || []);
      setDashboardStats({
        totalUsers: data?.totalUsers || 0,
        totalOrders: data?.totalOrders || 0,
        totalRevenue: data?.totalRevenue || 0,
        totalProducts: data?.totalProducts || 0,
      });
    } catch (err) {
      console.error('❌ Error fetching dashboard data:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

      {/* ✅ Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<Users size={28} className="text-blue-600" />} label="Total Users" value={dashboardStats.totalUsers} color="blue" />
        <StatCard icon={<ShoppingCart size={28} className="text-green-600" />} label="Total Orders" value={dashboardStats.totalOrders} color="green" />
        <StatCard icon={<IndianRupee size={28} className="text-yellow-600" />} label="Total Revenue" value={`₹${dashboardStats.totalRevenue}`} color="yellow" />
        <StatCard icon={<Package size={28} className="text-purple-600" />} label="Total Products" value={dashboardStats.totalProducts} color="purple" />
      </div>

      {/* ✅ Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* 📈 Revenue Line Chart */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">📈 Revenue Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 📊 Monthly Orders Bar Chart */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">📊 Monthly Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#16a34a" barSize={45} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ✅ User Reviews Section */}
      <div className="bg-white p-5 rounded-xl shadow-md h-[450px] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">💬 Recent User Reviews</h2>
        <div className="space-y-4 pr-2">
          {Array.isArray(userReviews) && userReviews.length > 0 ? (
            userReviews.map((review, index) => (
              <div key={review._id || index} className="border border-gray-200 rounded-lg p-4 transition hover:bg-gray-50">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={16} className="text-gray-400" />
                  <p className="text-sm text-gray-500">{formatDate(review?.date)}</p>
                </div>
                <p className="text-lg font-semibold text-gray-800">{review?.name}</p>
                <p className="text-gray-600">{review?.review}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ✅ StatCard with hover and polish
const StatCard = ({ icon, label, value, color }) => {
  const colorMap = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    yellow: 'border-yellow-500',
    purple: 'border-purple-500',
  };

  return (
    <div
      className={`bg-white shadow-md rounded-xl p-5 flex items-center space-x-4 border-l-4 ${colorMap[color]} hover:shadow-lg transition duration-300`}
    >
      {icon}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
    </div>
  );
};

export default Deshborde;
