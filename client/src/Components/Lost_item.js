import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  HiPhoto,
  HiMapPin,
  HiCalendar,
  HiPhone,
  HiTag,
  HiXMark,
  HiCheck,
  HiArrowUpTray,
  HiSparkles
} from 'react-icons/hi2';

const LostItem = () => {
  const navigate = useNavigate();
  const usertoken = window.localStorage.getItem('token');
  const user = JSON.parse(window.localStorage.getItem('user') || 'null');
  const userId = user?._id;

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required('Item title is required'),
    description: Yup.string().required('Please provide a brief description'),
    type: Yup.string().required('Please select whether the item is Lost or Found'),
    location: Yup.string().required('Location is required'),
    date: Yup.string().required('Date is required'),
    number: Yup.string().required('Contact phone or email is required'),
  });

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (values) => {
    if (!usertoken || !userId) {
      toast.error('Please log in to submit a report');
      navigate('/log-in');
      return;
    }

    if (images.length === 0) {
      toast.error('Please attach at least one photograph of the item');
      return;
    }

    setUploading(true);

    try {
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'uutsacov';
      const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'Lost-and-Found';

      // Upload all images to Cloudinary
      const uploadPromises = images.map((img) => {
        const data = new FormData();
        data.append('file', img);
        data.append('upload_preset', uploadPreset);
        data.append('cloud_name', cloudName);

        return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: data,
        })
          .then((res) => {
            if (!res.ok) throw new Error('Cloudinary upload failed');
            return res.json();
          })
          .then((data) => data.secure_url);
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      const newItem = {
        ...values,
        userId: userId,
        img: uploadedUrls,
      };

      const config = { headers: { token: usertoken } };
      await axios.post(`${process.env.REACT_APP_API_URL}/items/newItem`, newItem, config);

      toast.success('Report posted successfully! Thank you for helping the community.', {
        position: 'bottom-right',
        autoClose: 1800,
      });

      navigate('/mylistings');
    } catch (error) {
      console.error('Error posting item:', error);
      toast.error('Failed to publish report. Please verify connection and try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full">
        {/* Form Title Card */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-3 border border-brand-200">
            <HiSparkles className="w-4 h-4 text-brand-500" />
            <span>Community Report Submission</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Publish a Lost or Found Item
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
            Provide as much detail as possible to help owners and finders quickly recognize the item.
          </p>
        </div>

        <Formik
          initialValues={{
            name: '',
            userId: userId || '',
            description: '',
            type: 'Lost',
            location: '',
            date: '',
            number: '',
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleChange, errors, touched }) => (
            <Form className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-10 flex flex-col gap-8">
              {/* 1. Item Type Selector (Lost vs Found) */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Report Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFieldValue('type', 'Lost')}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      values.type === 'Lost'
                        ? 'border-rose-500 bg-rose-50/60 text-rose-900 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-3.5 h-3.5 rounded-full bg-rose-500" />
                      <div className="text-left">
                        <div className="font-bold text-sm">I Lost It</div>
                        <div className="text-xs text-slate-500">I am looking for my item</div>
                      </div>
                    </div>
                    {values.type === 'Lost' && <HiCheck className="w-5 h-5 text-rose-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFieldValue('type', 'Found')}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      values.type === 'Found'
                        ? 'border-emerald-500 bg-emerald-50/60 text-emerald-900 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                      <div className="text-left">
                        <div className="font-bold text-sm">I Found It</div>
                        <div className="text-xs text-slate-500">I am holding someone's item</div>
                      </div>
                    </div>
                    {values.type === 'Found' && <HiCheck className="w-5 h-5 text-emerald-600" />}
                  </button>
                </div>
              </div>

              {/* 2. Photo Upload Section */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Photos of the Item <span className="text-rose-500">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-brand-400 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-colors bg-slate-50/50">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                    <HiArrowUpTray className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    Click to browse or drag & drop pictures
                  </p>
                  <p className="text-xs text-slate-400 mt-1 mb-4">
                    PNG, JPG, or WEBP up to 5MB each (multiple photos supported)
                  </p>

                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors shadow-sm">
                    <HiPhoto className="w-4 h-4" />
                    <span>Select Images</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Selected Images Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                    {images.map((file, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group bg-slate-100"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload preview ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                        >
                          <HiXMark className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Form Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Item Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Item Title / Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <HiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. Black Leather Fossil Wallet with ID"
                      value={values.name}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-sm"
                    />
                  </div>
                  {touched.name && errors.name && (
                    <p className="text-xs text-rose-500 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Location {values.type === 'Lost' ? 'Lost' : 'Found'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <HiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="e.g. Science Quad, 2nd floor hall"
                      value={values.location}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-sm"
                    />
                  </div>
                  {touched.location && errors.location && (
                    <p className="text-xs text-rose-500 mt-1">{errors.location}</p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Date {values.type === 'Lost' ? 'Lost' : 'Found'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <HiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="date"
                      name="date"
                      type="text"
                      placeholder="e.g. Yesterday morning or 2025-05-10"
                      value={values.date}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-sm"
                    />
                  </div>
                  {touched.date && errors.date && (
                    <p className="text-xs text-rose-500 mt-1">{errors.date}</p>
                  )}
                </div>

                {/* Contact Information */}
                <div className="sm:col-span-2">
                  <label htmlFor="number" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Contact Information <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <HiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="number"
                      name="number"
                      type="text"
                      placeholder="e.g. Phone number (+1 555-0199) or contact handle"
                      value={values.number}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-sm"
                    />
                  </div>
                  {touched.number && errors.number && (
                    <p className="text-xs text-rose-500 mt-1">{errors.number}</p>
                  )}
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Detailed Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Provide distinguishing features, colors, brands, unique stickers, or any identifying marks..."
                    value={values.description}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-sm resize-none"
                  />
                  {touched.description && errors.description && (
                    <p className="text-xs text-rose-500 mt-1">{errors.description}</p>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={uploading}
                  className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-lg shadow-brand-500/25 transition-all disabled:opacity-50"
                >
                  {uploading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading & Publishing...
                    </span>
                  ) : (
                    'Publish Report'
                  )}
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LostItem;