'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import FloatingFlowers from '@/components/FloatingHearts';

const formSchema = z.object({
  girlfriend_name: z.string().min(1, 'Name is required'),
  selected_date: z.string().min(1, 'Date is required'),
  selected_time: z.string().min(1, 'Time is required'),
  food_preference: z.string().min(1, 'Food preference is required'),
  date_type: z.string().min(1, 'Date type is required'),
  mood: z.string().min(1, 'Mood is required'),
  special_message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function PlanDate() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await fetch('http://localhost:8080/api/date-requests', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Error submitting date request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const foodOptions = [
    { 
      value: 'Pizza', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-500">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
            <path d="M12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8Z" fill="#FF0000"/>
          </svg>
          Pizza
        </span>
      )
    },
    { 
      value: 'Burger', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-600">
            <path d="M12 2C15 2 17 5 17 7L7 7C7 5 9 2 12 2Z" fill="#D2691E"/>
            <rect x="6" y="7" width="12" height="10" rx="2" fill="#8B4513"/>
            <ellipse cx="12" cy="17" rx="6" ry="2" fill="#228B22"/>
          </svg>
          Burger
        </span>
      )
    },
    { 
      value: 'Pasta', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500">
            <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="currentColor"/>
            <path d="M8 12L12 16L16 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Pasta
        </span>
      )
    },
    { 
      value: 'Chinese', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600">
            <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="currentColor"/>
            <path d="M7 10H17M7 14H17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Chinese
        </span>
      )
    },
    { 
      value: 'South Indian', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-600">
            <ellipse cx="12" cy="12" rx="10" ry="3" fill="currentColor"/>
          </svg>
          South Indian
        </span>
      )
    },
    { 
      value: 'Other', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="currentColor"/>
            <path d="M12 17H12.01M12 7V13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Other
        </span>
      )
    },
  ];

  const dateTypeOptions = [
    { 
      value: 'Cafe Date', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-700">
            <path d="M2 21V19H22V21H2ZM20 8V5H2V8C2 10.21 3.79 12 6 12H14C16.21 12 18 10.21 18 8Z" fill="currentColor"/>
          <path d="M18 8H20C21.1 8 22 7.1 22 6V5H18V8Z" fill="currentColor"/>
        </svg>
          Cafe Date
        </span>
      )
    },
    { 
      value: 'Movie Date', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600">
            <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="currentColor"/>
            <path d="M10 11H8V9H10V11ZM10 15H8V13H10V15ZM14 15H12V13H14V15ZM14 11H12V9H14V11Z" fill="#FFFFFF"/>
          </svg>
          Movie Date
        </span>
      )
    },
    { 
      value: 'Long Drive', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01Z" fill="currentColor"/>
            <circle cx="7.5" cy="17.5" r="1.5" fill="#FFFFFF"/>
            <circle cx="16.5" cy="17.5" r="1.5" fill="#FFFFFF"/>
          </svg>
          Long Drive
        </span>
      )
    },
    { 
      value: 'Dinner Date', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-500">
            <path d="M11 9H9V2H7V9H5V2H3V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V2H19V9H17V2H15V9H13V2H11V9Z" fill="currentColor"/>
          </svg>
          Dinner Date
        </span>
      )
    },
    { 
      value: 'Shopping Date', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-pink-600">
            <path d="M7 4H17C18.1 4 19 4.9 19 6V18C19 19.1 18.1 20 17 20H7C5.9 20 5 19.1 5 18V6C5 4.9 5.9 4 7 4Z" fill="currentColor"/>
            <path d="M10 4V3C10 2.45 9.55 2 9 2C8.45 2 8 2.45 8 3V4M16 4V3C16 2.45 15.55 2 15 2C14.45 2 14 2.45 14 3V4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Shopping Date
        </span>
      )
    },
    { 
      value: 'Surprise Me', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500">
            <path d="M20 6H14V3C14 2.45 13.55 2 13 2H11C10.45 2 10 2.45 10 3V6H4C2.9 6 2 6.9 2 8V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8C22 6.9 21.1 6 20 6Z" fill="currentColor"/>
            <path d="M12 17H12.01M12 10H14C14 11.1 13.55 12 12 12V13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Surprise Me
        </span>
      )
    },
  ];

  const moodOptions = [
    { 
      value: 'Romantic', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-pink-500">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
          </svg>
          Romantic
        </span>
      )
    },
    { 
      value: 'Fun', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-400">
            <circle cx="12" cy="12" r="10" fill="currentColor"/>
            <path d="M8 14C9 16 15 16 16 14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="8" cy="9" r="1.5" fill="#FFFFFF"/>
            <circle cx="16" cy="9" r="1.5" fill="#FFFFFF"/>
          </svg>
          Fun
        </span>
      )
    },
    { 
      value: 'Adventure', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="currentColor"/>
            <path d="M12 17H12.01M12 7V13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Adventure
        </span>
      )
    },
    { 
      value: 'Cozy', 
      label: (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-400">
            <path d="M20 4H4C2.9 4 2 4.9 2 6V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V6C22 4.9 21.1 4 20 4Z" fill="currentColor"/>
            <path d="M12 8V16H20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Cozy
        </span>
      )
    },
  ];

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Beautiful Background with Image and Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop"
            alt="Romantic Success Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-300/75 via-purple-300/75 to-rose-300/75 backdrop-blur-sm"></div>
        </div>
        
        <FloatingFlowers />
        <div className="relative z-10 text-center max-w-2xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white/85 backdrop-blur-2xl rounded-[2.5rem] p-12 shadow-2xl border border-white/50"
          >
            <div className="flex justify-center gap-3 mb-6">
              <div className="text-4xl animate-bounce">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-yellow-500">
                  <path d="M12 2L15 9H22L16.5 13.5L18 21L12 17L6 21L7.5 13.5L2 9H9L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="text-5xl animate-bounce delay-75">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-pink-500">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
              </div>
              <div className="text-4xl animate-bounce delay-150">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-yellow-500">
                  <path d="M12 2L15 9H22L16.5 13.5L18 21L12 17L6 21L7.5 13.5L2 9H9L12 2Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 mb-8">
              Your date request has been sent successfully ❤️
            </h1>
            <p className="text-2xl md:text-3xl text-purple-700 font-bold">
              Now your boyfriend can see everything from his admin panel 😘
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 relative">
      {/* Beautiful Background with Image and Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
          alt="Romantic Date Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300/75 via-purple-300/75 to-rose-300/75 backdrop-blur-sm"></div>
      </div>

      <FloatingFlowers />
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white/85 backdrop-blur-2xl rounded-[2.5rem] p-12 shadow-2xl border border-white/50"
          >
            {/* Decorative Header */}
            <div className="flex justify-center gap-3 mb-6">
              <div className="text-3xl animate-bounce">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-pink-400">
                  {[...Array(5)].map((_, i) => (
                    <ellipse 
                      key={i}
                      cx="12" cy="12" 
                      rx="2" ry="6" 
                      transform={`rotate(${i * 72} 12 12)`} 
                      fill="currentColor"
                    />
                  ))}
                  <circle cx="12" cy="12" r="2" fill="#FFD700"/>
                </svg>
              </div>
              <div className="text-4xl animate-bounce delay-75">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-pink-500">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
              </div>
              <div className="text-3xl animate-bounce delay-150">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-pink-400">
                  {[...Array(5)].map((_, i) => (
                    <ellipse 
                      key={i}
                      cx="12" cy="12" 
                      rx="2" ry="6" 
                      transform={`rotate(${i * 72} 12 12)`} 
                      fill="currentColor"
                    />
                  ))}
                  <circle cx="12" cy="12" r="2" fill="#FFD700"/>
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 text-center mb-10">
              Let's Plan Our Perfect Date! 😘
            </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label className="block text-xl font-bold text-purple-700 mb-3">
                Your Name 💕
              </label>
              <input
                {...register('girlfriend_name')}
                type="text"
                className="w-full px-6 py-4 rounded-2xl border-2 border-pink-200 bg-white/70 backdrop-blur-sm focus:border-pink-500 focus:outline-none text-xl font-medium transition-all hover:border-pink-300"
                placeholder="Enter your name"
              />
              {errors.girlfriend_name && (
                <p className="text-red-500 mt-2 font-semibold">{errors.girlfriend_name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xl font-bold text-purple-700 mb-3">
                  📅 Date
                </label>
                <input
                  {...register('selected_date')}
                  type="date"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-pink-200 bg-white/70 backdrop-blur-sm focus:border-pink-500 focus:outline-none text-xl font-medium transition-all hover:border-pink-300"
                />
                {errors.selected_date && (
                  <p className="text-red-500 mt-2 font-semibold">{errors.selected_date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xl font-bold text-purple-700 mb-3">
                  ⏰ Time
                </label>
                <input
                  {...register('selected_time')}
                  type="time"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-pink-200 bg-white/70 backdrop-blur-sm focus:border-pink-500 focus:outline-none text-xl font-medium transition-all hover:border-pink-300"
                />
                {errors.selected_time && (
                  <p className="text-red-500 mt-2 font-semibold">{errors.selected_time.message}</p>
                )}
              </div>
            </div>

            {/* Food Preference with Cute Cards */}
            <div>
              <label className="block text-xl font-bold text-purple-700 mb-4">
                🍕 Food Preference
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {foodOptions.map((option) => (
                  <label key={option.value} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option.value}
                      {...register('food_preference')}
                      className="sr-only peer"
                    />
                    <div className="px-5 py-4 rounded-2xl border-2 border-pink-200 bg-white/70 backdrop-blur-sm hover:border-pink-400 transition-all text-center font-bold text-lg peer-checked:border-pink-500 peer-checked:bg-pink-50 peer-checked:shadow-xl">
                      {option.label}
                    </div>
                  </label>
                ))}
              </div>
              {errors.food_preference && (
                <p className="text-red-500 mt-2 font-semibold">{errors.food_preference.message}</p>
              )}
            </div>

            {/* Date Type with Cards */}
            <div>
              <label className="block text-xl font-bold text-purple-700 mb-4">
                🎬 Date Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dateTypeOptions.map((option) => (
                  <label key={option.value} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option.value}
                      {...register('date_type')}
                      className="sr-only peer"
                    />
                    <div className="px-5 py-4 rounded-2xl border-2 border-pink-200 bg-white/70 backdrop-blur-sm hover:border-pink-400 transition-all text-center font-bold text-lg peer-checked:border-pink-500 peer-checked:bg-pink-50 peer-checked:shadow-xl">
                      {option.label}
                    </div>
                  </label>
                ))}
              </div>
              {errors.date_type && (
                <p className="text-red-500 mt-2 font-semibold">{errors.date_type.message}</p>
              )}
            </div>

            {/* Mood with Cards */}
            <div>
              <label className="block text-xl font-bold text-purple-700 mb-4">
                ❤️ Mood
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {moodOptions.map((option) => (
                  <label key={option.value} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option.value}
                      {...register('mood')}
                      className="sr-only peer"
                    />
                    <div className="px-5 py-4 rounded-2xl border-2 border-pink-200 bg-white/70 backdrop-blur-sm hover:border-pink-400 transition-all text-center font-bold text-lg peer-checked:border-pink-500 peer-checked:bg-pink-50 peer-checked:shadow-xl">
                      {option.label}
                    </div>
                  </label>
                ))}
              </div>
              {errors.mood && (
                <p className="text-red-500 mt-2 font-semibold">{errors.mood.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xl font-bold text-purple-700 mb-3">
                💌 Sweet Message for Me
              </label>
              <textarea
                {...register('special_message')}
                rows={5}
                className="w-full px-6 py-4 rounded-2xl border-2 border-pink-200 bg-white/70 backdrop-blur-sm focus:border-pink-500 focus:outline-none text-xl font-medium resize-none transition-all hover:border-pink-300"
                placeholder="Leave a sweet message for your boyfriend 💌"
              />
            </div>

            <div>
              <label className="block text-xl font-bold text-purple-700 mb-3">
                🖼 Optional Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-6 py-4 rounded-2xl border-2 border-pink-200 bg-white/70 backdrop-blur-sm focus:border-pink-500 focus:outline-none text-lg transition-all hover:border-pink-300"
              />
              {imagePreview && (
                <div className="mt-6">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 rounded-2xl object-cover mx-auto shadow-xl"
                  />
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(236, 72, 153, 0.4), 0 10px 10px -5px rgba(236, 72, 153, 0.2)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white text-2xl rounded-2xl shadow-2xl font-black disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send Date Request 💕'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
