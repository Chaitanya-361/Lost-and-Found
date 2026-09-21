import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiMagnifyingGlass,
  HiMapPin,
  HiCalendar,
  HiPlusCircle,
  HiArrowRight,
  HiPhoto
} from 'react-icons/hi2';
import Axios from 'axios';
import PaginationComponent from './PaginationComponent';
import { setConstraint } from '../constraints';

export default function FoundItems() {
  const [allItems, setAllItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const itemsPerPage = 9;

  useEffect(() => {
    setConstraint(true);
    setLoading(true);

    Axios.get(`${process.env.REACT_APP_API_URL}/items`)
      .then((response) => {
        if (response.data && response.data.items) {
          setAllItems(response.data.items.reverse());
        }
      })
      .catch((err) => {
        console.error('Error fetching items:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter items by type ('Found') and search query
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const isFound = item.type === 'Found';
      if (!isFound) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const nameMatch = item.name?.toLowerCase().includes(q);
      const descMatch = item.description?.toLowerCase().includes(q);
      const locMatch = item.location?.toLowerCase().includes(q);
      return nameMatch || descMatch || locMatch;
    });
  }, [allItems, searchQuery]);

  const maxPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  // Current page items
  const paginatedItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, page, itemsPerPage]);

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

  return (
    <div className="w-full flex flex-col items-center min-h-[80vh] pb-16">
      {/* Header Banner */}
      <section className="w-full bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Found Items Directory
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white m-0">
              Community Found Items
            </h1>
            <p className="text-emerald-100/80 text-sm sm:text-base mt-2 max-w-xl">
              {user?.nickname ? `Welcome, ${user.nickname}! ` : ''}
              Did you lose something? Check the items discovered and safely held by community finders.
            </p>
          </div>

          <Link
            to="/postitem"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all text-sm shrink-0"
          >
            <HiPlusCircle className="w-5 h-5" />
            <span>Report a Found Item</span>
          </Link>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, location, keyword..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
            />
          </div>

          <div className="text-xs font-semibold text-slate-500 self-end sm:self-center">
            Showing <span className="text-slate-900 font-bold">{filteredItems.length}</span> found item(s)
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-80 rounded-2xl bg-slate-100 animate-pulse border border-slate-200/60"
              />
            ))}
          </div>
        ) : paginatedItems.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
              <HiMagnifyingGlass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">
              No Found Items
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mb-6">
              {searchQuery
                ? `No reports matched "${searchQuery}". Try a different keyword.`
                : 'There are currently no active found item reports waiting for claims.'}
            </p>
            <Link
              to="/postitem"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md text-sm transition-all"
            >
              <HiPlusCircle className="w-5 h-5" />
              <span>Report a Found Item</span>
            </Link>
          </div>
        ) : (
          /* Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((item) => {
              const isOwner = user && item.userId === user._id;
              const imageUrl = Array.isArray(item.img) ? item.img[0] : item.img;

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

                      {/* Status Tag */}
                      <div className="absolute top-3 left-3 bg-emerald-600/95 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        Found
                      </div>

                      {/* Location Chip */}
                      <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-medium truncate flex items-center gap-1.5">
                        <HiMapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{item.location || 'Location not specified'}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors truncate mb-2">
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

                  {/* Card Footer Button */}
                  <div className="p-5 pt-0">
                    <Link
                      to={`/${encodeURIComponent(item.name)}?cid=${item._id}&type=Found/${isOwner ? 'true' : 'false'}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <span>View Full Details</span>
                      <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <PaginationComponent page={page} setPage={setPage} max={maxPages} />
      </div>
    </div>
  );
}
