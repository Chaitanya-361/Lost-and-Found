import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import {
  HiMapPin,
  HiCalendar,
  HiClock,
  HiTrash,
  HiPhone,
  HiArrowLeft,
  HiShieldCheck,
  HiPhoto,
  HiExclamationTriangle
} from 'react-icons/hi2';
import { setConstraint } from '../constraints';

function ItemPage() {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [deleting, setDeleting] = useState(false);

  setConstraint(true);

  const queryParams = new URLSearchParams(window.location.search);
  const itemId = queryParams.get('cid');
  const loggedInUser = JSON.parse(window.localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!itemId) {
      navigate('/lostitems');
      return;
    }

    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/items/${itemId}`)
      .then((response) => {
        if (response.data && response.data.item) {
          setItem(response.data.item);
        } else {
          toast.error('Item not found');
          navigate('/');
        }
      })
      .catch((err) => {
        console.error('Error fetching item details:', err);
        toast.error('Could not load item details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId, navigate]);

  const handleDeleteItem = () => {
    setDeleting(true);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/items/delete/${itemId}`)
      .then(() => {
        toast.success('Listing deleted successfully!', {
          position: 'bottom-right',
          autoClose: 1500,
        });
        navigate('/mylistings');
      })
      .catch((err) => {
        console.error('Error deleting item:', err);
        toast.error('Failed to delete item.');
      })
      .finally(() => {
        setDeleting(false);
        setShowDelete(false);
      });
  };

  const images = item?.img
    ? Array.isArray(item.img)
      ? item.img
      : [item.img]
    : [];

  const isOwner =
    loggedInUser &&
    item &&
    (item.userId?._id === loggedInUser._id || item.userId === loggedInUser._id);

  const isLost = item?.type === 'Lost';

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not specified';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-16 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="w-full flex flex-col items-center min-h-[85vh] pb-20">
      {/* Top Breadcrumb & Return Bar */}
      <div className="w-full border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            to={isLost ? '/lostitems' : '/founditems'}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors"
          >
            <HiArrowLeft className="w-4 h-4" />
            <span>Back to {isLost ? 'Lost Items' : 'Found Items'}</span>
          </Link>

          <div
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isLost
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}
          >
            {item.type} Item Report
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-card">
              {images.length > 0 && images[selectedImageIndex] ? (
                <img
                  src={images[selectedImageIndex]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=60';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <HiPhoto className="w-20 h-20" />
                </div>
              )}
            </div>

            {/* Thumbnail switcher if multiple images */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === index
                        ? 'border-brand-600 ring-2 ring-brand-500/20'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Main Info Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card flex flex-col gap-6">
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
                    isLost ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {isLost ? 'Missing Item' : 'Found Item'}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {item.name}
                </h1>
              </div>

              {/* Metadata Badges */}
              <div className="flex flex-col gap-3 py-4 border-y border-slate-100 text-sm">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-slate-500">
                    <HiMapPin className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">
                      Location {isLost ? 'Lost' : 'Found'}
                    </span>
                    <span className="font-semibold text-slate-900">{item.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-slate-500">
                    <HiCalendar className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">
                      Date {isLost ? 'Lost' : 'Found'}
                    </span>
                    <span className="font-semibold text-slate-900">{formatDate(item.date)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-slate-500">
                    <HiClock className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">
                      Report Published
                    </span>
                    <span className="font-semibold text-slate-900">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Detailed Description
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                  {item.description || 'No additional details provided by the reporter.'}
                </p>
              </div>

              {/* Reporter Profile & Action Button */}
              <div className="pt-2">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
                  <div className="flex items-center gap-3">
                    {item.userId?.img ? (
                      <img
                        src={item.userId.img}
                        alt="Reporter"
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-500/20"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                        {item.userId?.fullname ? item.userId.fullname.charAt(0) : 'U'}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {item.userId?.fullname || item.userId?.nickname || 'Community Member'}
                      </div>
                      <div className="text-xs text-slate-400">Listed by Reporter</div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/60 text-slate-600">
                    Verified
                  </div>
                </div>

                {isOwner ? (
                  <button
                    onClick={() => setShowDelete(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/20 transition-all text-sm"
                  >
                    <HiTrash className="w-4 h-4" />
                    <span>Delete This Listing</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowContact(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-lg shadow-brand-500/25 transition-all text-sm"
                  >
                    <HiPhone className="w-4 h-4" />
                    <span>Contact {isLost ? 'Owner' : 'Finder'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Safety Tips Card */}
            <div className="bg-brand-50/60 rounded-2xl p-5 border border-brand-100 flex items-start gap-3">
              <HiShieldCheck className="w-6 h-6 text-brand-600 shrink-0 mt-0.5" />
              <div className="text-xs text-brand-900 leading-relaxed">
                <strong>Safety Tip:</strong> When meeting in person to return or collect items, choose a public, well-lit place such as a campus front desk, library, or security office.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Transition appear show={showDelete} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowDelete(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <HiExclamationTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <Dialog.Title as="h3" className="text-lg font-bold text-slate-900">
                        Delete Listing?
                      </Dialog.Title>
                      <p className="text-xs text-slate-500">
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-6">
                    Are you sure you want to permanently delete{' '}
                    <strong className="text-slate-900">{item.name}</strong> from the database?
                  </p>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="button"
                      disabled={deleting}
                      onClick={() => setShowDelete(false)}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={deleting}
                      onClick={handleDeleteItem}
                      className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/20 transition-all"
                    >
                      {deleting ? 'Deleting...' : 'Yes, Delete'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Contact Info Modal */}
      <Transition appear show={showContact} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowContact(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                      <HiPhone className="w-6 h-6" />
                    </div>
                    <div>
                      <Dialog.Title as="h3" className="text-lg font-bold text-slate-900">
                        Contact Details
                      </Dialog.Title>
                      <p className="text-xs text-slate-500">
                        Reach out directly to arrange return or verification.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-6 flex flex-col gap-3">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 block uppercase">
                        Phone / Contact Number
                      </span>
                      <a
                        href={`tel:${item.number}`}
                        className="text-lg font-bold text-brand-600 hover:underline"
                      >
                        {item.number || 'No contact number provided'}
                      </a>
                    </div>
                    {item.userId?.email && (
                      <div className="pt-2 border-t border-slate-200/60">
                        <span className="text-xs font-semibold text-slate-400 block uppercase">
                          Email Address
                        </span>
                        <a
                          href={`mailto:${item.userId.email}`}
                          className="text-sm font-semibold text-slate-700 hover:text-brand-600 hover:underline"
                        >
                          {item.userId.email}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => setShowContact(false)}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ItemPage;
