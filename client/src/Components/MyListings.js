import React, { useEffect, useState, useMemo, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import {
  HiPlusCircle,
  HiMapPin,
  HiCalendar,
  HiTrash,
  HiArrowRight,
  HiPhoto,
  HiShieldCheck,
  HiExclamationTriangle
} from 'react-icons/hi2';
import Axios from 'axios';
import { toast } from 'react-toastify';
import PaginationComponent from './PaginationComponent';
import { setConstraint } from '../constraints';

export default function MyListings() {
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem('user') || 'null');
  const token = window.localStorage.getItem('token');

  const [allItems, setAllItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    setConstraint(true);

    if (!token || !user) {
      navigate('/log-in');
      return;
    }

    fetchMyItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  const fetchMyItems = () => {
    setLoading(true);
    Axios.get(`${process.env.REACT_APP_API_URL}/items`)
      .then((response) => {
        if (response.data && response.data.items) {
          const userItems = response.data.items
            .reverse()
            .filter((item) => item.userId === user._id);
          setAllItems(userItems);
        }
      })
      .catch((err) => {
        console.error('Error fetching listings:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setDeleting(true);

    Axios.delete(`${process.env.REACT_APP_API_URL}/items/delete/${deleteTarget._id}`)
      .then(() => {
        toast.success('Listing deleted successfully!', {
          position: 'bottom-right',
          autoClose: 1500,
        });
        setAllItems((prev) => prev.filter((item) => item._id !== deleteTarget._id));
        setDeleteTarget(null);
      })
      .catch((err) => {
        console.error('Failed to delete item:', err);
        toast.error('Could not delete listing. Please try again.');
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  const maxPages = Math.max(1, Math.ceil(allItems.length / itemsPerPage));

  const paginatedItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return allItems.slice(startIndex, startIndex + itemsPerPage);
  }, [allItems, page, itemsPerPage]);

  const lostCount = useMemo(
    () => allItems.filter((i) => i.type === 'Lost').length,
    [allItems]
  );
  const foundCount = useMemo(
    () => allItems.filter((i) => i.type === 'Found').length,
    [allItems]
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recent';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (!user) return null;

  return (
    <div className="w-full flex flex-col items-center min-h-[80vh] pb-16">
      {/* Header Banner */}
      <section className="w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold mb-3 border border-brand-500/30">
              <HiShieldCheck className="w-4 h-4 text-brand-400" />
              Member Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white m-0">
              My Active Listings
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
              Manage, update, or remove the reports you have published to the community board.
            </p>
          </div>

          <Link
            to="/postitem"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-600/30 transition-all text-sm shrink-0"
          >
            <HiPlusCircle className="w-5 h-5" />
            <span>Create New Report</span>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Posted
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {allItems.length}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              All
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Lost Reports
              </div>
              <div className="text-2xl font-black text-rose-600 mt-1">
                {lostCount}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              Lost
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Found Reports
              </div>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                {foundCount}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              Found
            </div>
          </div>
        </div>

        {/* Listings Grid / Empty State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-80 rounded-2xl bg-slate-100 animate-pulse border border-slate-200/60"
              />
            ))}
          </div>
        ) : paginatedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
              <HiPlusCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">
              You Have No Active Listings
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mb-6">
              When you post lost or found items, they will appear here so you can easily manage them.
            </p>
            <Link
              to="/postitem"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-md text-sm transition-all"
            >
              <HiPlusCircle className="w-5 h-5" />
              <span>Create Your First Report</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((item) => {
              const imageUrl = Array.isArray(item.img) ? item.img[0] : item.img;
              const isLost = item.type === 'Lost';

              return (
                <motion.div
                  key={item._id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header with Badge */}
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=60';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <HiPhoto className="w-12 h-12" />
                        </div>
                      )}

                      {/* Type Tag */}
                      <div
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 text-white ${
                          isLost ? 'bg-rose-600/95' : 'bg-emerald-600/95'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        {item.type}
                      </div>

                      {/* Location Chip */}
                      <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-medium truncate flex items-center gap-1.5">
                        <HiMapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                        <span className="truncate">{item.location || 'Location not specified'}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate mb-2">
                        {item.name}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {item.description || 'No description provided.'}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <HiCalendar className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>Date: {formatDate(item.date || item.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-5 pt-0 flex items-center gap-2">
                    <Link
                      to={`/${encodeURIComponent(item.name)}?cid=${item._id}&type=${item.type}/true`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                    >
                      <span>View</span>
                      <HiArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="p-2.5 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 transition-colors"
                      title="Delete Report"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <PaginationComponent page={page} setPage={setPage} max={maxPages} />
      </div>

      {/* Modern Delete Confirmation Dialog */}
      <Transition appear show={!!deleteTarget} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setDeleteTarget(null)}>
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
                    Are you sure you want to remove{' '}
                    <strong className="text-slate-900">{deleteTarget?.name}</strong> from the community board?
                  </p>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="button"
                      disabled={deleting}
                      onClick={() => setDeleteTarget(null)}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={deleting}
                      onClick={handleDelete}
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
    </div>
  );
}
