import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  fetchUser,
  sendConnectionRequest,
  disconnectConnection,
} from "../api";

export default function TeacherProfile() {
  const { teacherId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("none"); // "none", "pending", "connected"
  const [loading, setLoading] = useState(false);

  // ✅ Fetch teacher details
  const fetchTeacher = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/user/${teacherId}`);
      const data = await res.json();
      setTeacher(data);
    } catch (err) {
      console.error("Error fetching teacher:", err);
    }
  };

  // ✅ Fetch connection status
  const fetchConnectionStatus = async () => {
    if (!user?.id || !teacherId) return;

    try {
      const userData = await fetchUser(user.id);
      const isConnected = userData.data.connections.some(
        (id) => id.toString() === teacherId
      );
      const hasSentRequest = userData.data.sentRequests.some(
        (id) => id.toString() === teacherId
      );
      const hasReceivedRequest = userData.data.requestsReceived.some(
        (id) => id.toString() === teacherId
      );

      if (isConnected) {
        setConnectionStatus("connected");
      } else if (hasSentRequest) {
        setConnectionStatus("pending");
      } else if (hasReceivedRequest) {
        setConnectionStatus("received");
      } else {
        setConnectionStatus("none");
      }
    } catch (error) {
      console.error("Error fetching connection status:", error);
    }
  };

  useEffect(() => {
    if (teacherId) fetchTeacher();
  }, [teacherId]);

  useEffect(() => {
    if (teacherId && user?.id) fetchConnectionStatus();
  }, [teacherId, user?.id]);

  if (!teacher) return <p>Loading teacher profile...</p>;

  // ✅ Handle connect
  const handleConnect = async () => {
    if (!user?.id) {
      alert("Please login to connect");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await sendConnectionRequest(user.id, teacher._id);
      setConnectionStatus("pending");
      alert("Connection request sent!");
    } catch (err) {
      console.error(err);
      alert("Error sending connection request");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle disconnect
  const handleDisconnect = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      await disconnectConnection(user.id, teacher._id);
      setConnectionStatus("none");
      alert("Disconnected successfully");
    } catch (err) {
      console.error("Error disconnecting:", err);
      alert("Error disconnecting");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UI
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">{teacher.name}</h2>
        <p className="text-gray-600 mb-2">{teacher.email}</p>
        <p className="text-sm text-blue-600 mb-2 capitalize">Role: {teacher.role}</p>
        <p className="text-gray-700 mb-4">{teacher.bio}</p>

        {teacher.categories && teacher.categories.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {teacher.categories.map((cat, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {teacher.idFile && (
          <img
            src={`http://localhost:5001/uploads/${teacher.idFile}`}
            alt={teacher.name}
            className="w-48 h-48 object-cover rounded-xl border mb-4"
          />
        )}

        {connectionStatus === "connected" ? (
          <div className="flex gap-2">
            <button
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={() => navigate(`/chat/${teacher._id}`)}
              disabled={loading}
            >
              {loading ? "Loading..." : "💬 Chat"}
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={handleDisconnect}
              disabled={loading}
            >
              {loading ? "Loading..." : "🚫 Disconnect"}
            </button>
          </div>
        ) : connectionStatus === "pending" ? (
          <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 rounded-lg shadow-md" disabled>
            ⏳ Pending
          </button>
        ) : (
          <button
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-2 rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={handleConnect}
            disabled={loading}
          >
            {loading ? "Sending..." : "🤝 Connect"}
          </button>
        )}
      </div>
    </div>
  );
}
