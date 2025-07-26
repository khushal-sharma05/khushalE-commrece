import { Home, Eye, MessageSquare, ShoppingCart, User, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const BottomNavbar = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSend = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/send-message`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Message sent!");
        setMessage("");
        setChatOpen(false);
      } else {
        toast.error(res.data.message || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
   
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50 flex justify-around items-center py-2 md:hidden">
        <NavItem icon={<Home size={22} />} label="Home" link="/" />
        <NavItem icon={<Eye size={22} />} label="Tips" link="/about" />
        <div
          onClick={() => setChatOpen(true)}
          className="flex flex-col items-center text-[11px] text-gray-600 hover:text-black cursor-pointer"
        >
          <MessageSquare size={22} />
          <span className="mt-1">Chat</span>
        </div>
        <NavItem icon={<ShoppingCart size={22} />} label="Cart" link="/cart" />
        <NavItem icon={<User size={22} />} label="Account" link="/login" />
      </div>

     
      {chatOpen && (
        <div className="fixed bottom-16 right-4 w-72 bg-white border border-gray-300 rounded-xl shadow-xl z-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold">Message Us</h2>
            <X className="cursor-pointer" size={18} onClick={() => setChatOpen(false)} />
          </div>
          <textarea
            rows={3}
            className="w-full p-2 text-sm border border-gray-300 rounded-md resize-none"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="mt-2 w-full text-sm bg-blue-500 text-white py-1.5 rounded-md hover:bg-blue-600"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      )}
    </>
  );
};

const NavItem = ({ icon, label, link }) => (
  <Link to={link} className="flex flex-col items-center text-[11px] text-gray-600 hover:text-black cursor-pointer">
    {icon}
    <span className="mt-1">{label}</span>
  </Link>
);

export default BottomNavbar;
