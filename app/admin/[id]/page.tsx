'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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

export default function RequestDetail() {
  const params = useParams();
  const router = useRouter();
  const [request, setRequest] = useState<DateRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchRequest();
    }
  }, [params.id]);

  const fetchRequest = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/date-requests/admin/date-requests/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setRequest(data.data);
      }
    } catch (error) {
      console.error('Error fetching request:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop"
            alt="Detail Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-300/75 via-purple-300/75 to-rose-300/75 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 text-3xl font-bold text-purple-700 bg-white/80 backdrop-blur-xl px-8 py-4 rounded-2xl shadow-2xl">
          Loading...
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop"
            alt="Detail Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-300/75 via-purple-300/75 to-rose-300/75 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 text-3xl font-bold text-purple-700 bg-white/80 backdrop-blur-xl px-8 py-4 rounded-2xl shadow-2xl">
          Request not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop"
          alt="Detail Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300/75 via-purple-300/75 to-rose-300/75 backdrop-blur-sm"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/admin')}
          className="mb-8 px-6 py-3 bg-white/85 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all font-bold text-lg text-purple-700"
        >
          ← Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white/85 backdrop-blur-2xl rounded-[2.5rem] p-12 shadow-2xl border border-white/50"
        >
          <div className="flex justify-center gap-3 mb-6">
            <div className="text-4xl animate-bounce">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-pink-500">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
              </svg>
            </div>
            <div className="text-5xl animate-bounce delay-75">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-pink-600">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
              </svg>
            </div>
            <div className="text-4xl animate-bounce delay-150">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-pink-500">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 mb-10 text-center">
            Date Request Details
          </h1>

          <div className="space-y-8">
            <div className="bg-pink-50/80 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-lg text-gray-600 mb-2 font-bold">Girlfriend Name</div>
              <div className="text-3xl font-black text-pink-700 flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-pink-500">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
                {request.girlfriend_name}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-pink-50/80 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-lg text-gray-600 mb-2 font-bold">Selected Date</div>
                <div className="text-2xl font-bold text-purple-700 flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-purple-500">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM9 10H7V12H9V10ZM13 10H11V12H13V10ZM17 10H15V12H17V10Z" fill="currentColor"/>
                  </svg>
                  {new Date(request.selected_date).toLocaleDateString()}
                </div>
              </div>

              <div className="bg-pink-50/80 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-lg text-gray-600 mb-2 font-bold">Selected Time</div>
                <div className="text-2xl font-bold text-purple-700 flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-purple-500">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
                  </svg>
                  {request.selected_time}
                </div>
              </div>
            </div>

            <div className="bg-pink-50/80 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-lg text-gray-600 mb-2 font-bold">Food Preference</div>
              <div className="text-2xl font-bold text-purple-700 flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-orange-500">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                </svg>
                {request.food_preference}
              </div>
            </div>

            <div className="bg-pink-50/80 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-lg text-gray-600 mb-2 font-bold">Date Type</div>
              <div className="text-2xl font-bold text-purple-700 flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-purple-600">
                  <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="currentColor"/>
                </svg>
                {request.date_type}
              </div>
            </div>

            <div className="bg-pink-50/80 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-lg text-gray-600 mb-2 font-bold">Mood</div>
              <div className="text-2xl font-bold text-purple-700 flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-pink-500">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
                {request.mood}
              </div>
            </div>

            {request.special_message && (
              <div className="bg-pink-50/80 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-lg text-gray-600 mb-2 font-bold">Sweet Message</div>
                <div className="text-xl font-bold text-purple-700 flex items-start gap-3">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-pink-500">
                    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="currentColor"/>
                  </svg>
                  {request.special_message}
                </div>
              </div>
            )}

            {request.image_url && (
              <div className="bg-pink-50/80 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-lg text-gray-600 mb-4 font-bold">Uploaded Photo</div>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${request.image_url}`}
                  alt="Uploaded"
                  className="max-h-[500px] rounded-2xl object-cover mx-auto shadow-2xl"
                />
              </div>
            )}

            <div className="bg-pink-50/80 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-lg text-gray-600 mb-2 font-bold">Status</div>
              <span
                className={`inline-block px-6 py-3 rounded-2xl text-xl font-black ${
                  request.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : request.status === 'APPROVED'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {request.status}
              </span>
            </div>

            <div className="bg-pink-50/80 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-lg text-gray-600 mb-2 font-bold">Submitted At</div>
              <div className="text-xl font-bold text-purple-700 flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-purple-500">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 8.75 19.54 12 22C15.25 19.54 19 14.25 19 9C19 5.13 15.87 2 12 2ZM7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.88 14.12 16.19 12 18.88C9.88 16.19 7 11.88 7 9Z" fill="currentColor"/>
                </svg>
                {new Date(request.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
