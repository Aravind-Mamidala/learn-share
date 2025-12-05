import React, { useEffect, useState } from "react";
import { fetchReceivedRequests, acceptConnectionRequest, rejectConnectionRequest } from "../api";
import { useAuth } from "../context/AuthContext";

const Requests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState({});

  const fetchRequests = async () => {
    try {
      const res = await fetchReceivedRequests(user.id);
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setRequests([]);
    }
  };

  const handleAccept = async (fromId) => {
    setLoading((prev) => ({ ...prev, [fromId]: true }));
    try {
      await acceptConnectionRequest(user.id, fromId);
      fetchRequests();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, [fromId]: false }));
    }
  };

  const handleReject = async (fromId) => {
    setLoading((prev) => ({ ...prev, [fromId]: true }));
    try {
      await rejectConnectionRequest(user.id, fromId);
      fetchRequests();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, [fromId]: false }));
    }
  };

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-100">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Requests Received</h1>
        {requests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-3xl sm:text-4xl">📬</span>
            </div>
            <p className="text-gray-600 text-lg sm:text-xl">No new requests.</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {requests.map((r) => (
              <div key={r._id} className="bg-white border border-gray-200 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{r.name}</h2>
                <p className="text-gray-600 mb-2 text-sm sm:text-base break-words">{r.email}</p>
                <p className="text-sm text-gray-600 capitalize mb-4">Role: {r.role}</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => handleAccept(r._id)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium text-sm sm:text-base shadow-md hover:shadow-lg"
                    disabled={loading[r._id]}
                  >
                    {loading[r._id] ? "Accepting..." : "✓ Accept"}
                  </button>
                  <button
                    onClick={() => handleReject(r._id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-medium text-sm sm:text-base shadow-md hover:shadow-lg"
                    disabled={loading[r._id]}
                  >
                    {loading[r._id] ? "Rejecting..." : "✗ Reject"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
