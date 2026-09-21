import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import {
  HiEnvelope,
  HiLockClosed,
  HiUser,
  HiIdentification,
  HiCamera,
  HiEye,
  HiEyeSlash,
  HiArrowRight,
  HiMagnifyingGlass
} from 'react-icons/hi2';

function Signup() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const signupSchema = Yup.object().shape({
    fullname: Yup.string().required('Full name is required'),
    nickname: Yup.string().required('Username or nickname is required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleRegister = async (values) => {
    setSubmitting(true);
    const { nickname, fullname, email, password } = values;

    const createUser = async (payload) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/users/create`,
          payload
        );
        if (response.data === 'Done') {
          toast.success('Account created successfully! Please log in.', {
            position: 'bottom-right',
            autoClose: 1500,
          });
          navigate('/log-in');
        } else {
          toast.error(response.data?.msg || 'Could not create account.');
        }
      } catch (err) {
        console.error('Registration error:', err);
        toast.error('An error occurred while creating your account.');
      } finally {
        setSubmitting(false);
      }
    };

    if (image) {
      try {
        const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'uutsacov';
        const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'Lost-and-Found';

        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', uploadPreset);
        data.append('cloud_name', cloudName);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: data,
        });
        const uploadData = await res.json();

        await createUser({
          nickname,
          fullname,
          email,
          password,
          img: uploadData.secure_url,
        });
      } catch (err) {
        console.error('Image upload error:', err);
        // Fallback: create user without image
        await createUser({ nickname, fullname, email, password });
      }
    } else {
      await createUser({ nickname, fullname, email, password });
    }
  };

  return (
    <div className="w-full flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {/* Auth Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <HiMagnifyingGlass className="w-5 h-5 stroke-2" />
              </div>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Join the community to report and track lost belongings
            </p>
          </div>

          <Formik
            initialValues={{
              fullname: '',
              nickname: '',
              email: '',
              password: '',
            }}
            validationSchema={signupSchema}
            onSubmit={handleRegister}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form className="flex flex-col gap-4">
                {/* Profile Picture Upload Avatar */}
                <div className="flex flex-col items-center justify-center mb-2">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-500/30 bg-slate-100 flex items-center justify-center shadow-inner">
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Avatar preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <HiUser className="w-10 h-10 text-slate-300" />
                      )}
                    </div>
                    <label
                      htmlFor="avatar-input"
                      className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-brand-500 transition-colors"
                      title="Upload Avatar"
                    >
                      <HiCamera className="w-4 h-4" />
                      <input
                        id="avatar-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 mt-2">
                    Profile Photo (Optional)
                  </span>
                </div>

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <HiIdentification className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      placeholder="Jane Doe"
                      value={values.fullname}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-sm"
                    />
                  </div>
                  {touched.fullname && errors.fullname && (
                    <p className="text-xs text-rose-500 mt-1">{errors.fullname}</p>
                  )}
                </div>

                {/* Username / Nickname */}
                <div>
                  <label
                    htmlFor="nickname"
                    className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1"
                  >
                    Username / Nickname
                  </label>
                  <div className="relative">
                    <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="nickname"
                      name="nickname"
                      type="text"
                      placeholder="janedoe"
                      value={values.nickname}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-sm"
                    />
                  </div>
                  {touched.nickname && errors.nickname && (
                    <p className="text-xs text-rose-500 mt-1">{errors.nickname}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <HiEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={values.email}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-sm"
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={values.password}
                      onChange={handleChange}
                      className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showPassword ? (
                        <HiEyeSlash className="w-5 h-5" />
                      ) : (
                        <HiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <p className="text-xs text-rose-500 mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-lg shadow-brand-500/25 transition-all text-sm disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </span>
                  ) : (
                    <>
                      <span>Sign Up</span>
                      <HiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </Form>
            )}
          </Formik>

          {/* Card Footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 m-0">
              Already registered?{' '}
              <Link
                to="/log-in"
                className="font-bold text-brand-600 hover:text-brand-700 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
