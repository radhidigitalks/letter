'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface DateRequest {
  _id: string;
  girlfriend_name: string;
  selected_date: string;
  selected_time: string;
  food_preference: string;
  date_type: string;
  mood: string;
  special_message: string;
  image_url: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState<DateRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/date-requests/admin/date-requests`);
      const data = await response.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/date-requests/admin/date-requests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      fetchRequests();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteRequest = async (id: string) => {
    if (confirm('Are you sure you want to delete this request?')) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/date-requests/admin/date-requests/${id}`, {
          method: 'DELETE',
        });
        fetchRequests();
      } catch (error) {
        console.error('Error deleting request:', error);
      }
    }
  };

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'PENDING').length,
    approved: requests.filter(r => r.status === 'APPROVED').length,
    rejected: requests.filter(r => r.status === 'REJECTED').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop"
            alt="Admin Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-200/75 via-purple-200/75 to-rose-200/75 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 text-3xl font-bold text-purple-700 bg-white/80 backdrop-blur-xl px-8 py-4 rounded-2xl shadow-2xl">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop"
          alt="Admin Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/75 via-purple-200/75 to-rose-200/75 backdrop-blur-sm"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex justify-center gap-3 mb-6">
          <div className="text-3xl animate-bounce">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-pink-500">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
            </svg>
          </div>
          <div className="text-4xl animate-bounce delay-75">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-pink-600">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
            </svg>
          </div>
          <div className="text-3xl animate-bounce delay-150">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-pink-500">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 mb-10 text-center">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/85 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
          >
            <div className="text-5xl font-black text-purple-600 mb-2">{stats.total}</div>
            <div className="text-xl font-bold text-gray-700">Total Requests</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/85 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
          >
            <div className="text-5xl font-black text-yellow-600 mb-2">{stats.pending}</div>
            <div className="text-xl font-bold text-gray-700">Pending</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/85 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
          >
            <div className="text-5xl font-black text-green-600 mb-2">{stats.approved}</div>
            <div className="text-xl font-bold text-gray-700">Approved</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/85 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
          >
            <div className="text-5xl font-black text-red-600 mb-2">{stats.rejected}</div>
            <div className="text-xl font-bold text-gray-700">Rejected</div>
          </motion.div>
        </div>

        <div className="bg-white/85 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-pink-100 to-purple-100">
                <tr>
                  <th className="px-8 py-6 text-left text-purple-700 font-black text-lg">Name</th>
                  <th className="px-8 py-6 text-left text-purple-700 font-black text-lg">Date</th>
                  <th className="px-8 py-6 text-left text-purple-700 font-black text-lg">Time</th>
                  <th className="px-8 py-6 text-left text-purple-700 font-black text-lg">Food</th>
                  <th className="px-8 py-6 text-left text-purple-700 font-black text-lg">Date Type</th>
                  <th className="px-8 py-6 text-left text-purple-700 font-black text-lg">Mood</th>
                  <th className="px-8 py-6 text-left text-purple-700 font-black text-lg">Status</th>
                  <th className="px-8 py-6 text-left text-purple-700 font-black text-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <motion.tr
                    key={request._id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-pink-100 hover:bg-pink-50/50 transition-all"
                  >
                    <td className="px-8 py-6 font-bold text-lg text-gray-800">{request.girlfriend_name}</td>
                    <td className="px-8 py-6 text-lg text-gray-700">{new Date(request.selected_date).toLocaleDateString()}</td>
                    <td className="px-8 py-6 text-lg text-gray-700">{request.selected_time}</td>
                    <td className="px-8 py-6 text-lg text-gray-700">{request.food_preference}</td>
                    <td className="px-8 py-6 text-lg text-gray-700">{request.date_type}</td>
                    <td className="px-8 py-6 text-lg text-gray-700">{request.mood}</td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-5 py-2 rounded-full text-base font-bold ${
                          request.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : request.status === 'APPROVED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-3 flex-wrap">
                        <Link
                          href={`/admin/${request._id}`}
                          className="px-5 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 font-bold transition-all hover:scale-105 shadow-lg"
                        >
                          View
                        </Link>
                        {request.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => updateStatus(request._id, 'APPROVED')}
                              className="px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 font-bold transition-all hover:scale-105 shadow-lg"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(request._id, 'REJECTED')}
                              className="px-5 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 font-bold transition-all hover:scale-105 shadow-lg"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteRequest(request._id)}
                          className="px-5 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 font-bold transition-all hover:scale-105 shadow-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
