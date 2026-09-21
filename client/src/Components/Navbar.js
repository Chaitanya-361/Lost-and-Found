import React, { Fragment, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import {
  HiMagnifyingGlass,
  HiBars3,
  HiXMark,
  HiChevronDown,
  HiPlusCircle,
  HiArrowRightOnRectangle,
  HiTag,
  HiClipboardDocumentList
} from 'react-icons/hi2';
import { setConstraint } from '../constraints';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = window.localStorage.getItem('token');
  const user = JSON.parse(window.localStorage.getItem('user') || 'null');

  const handleSignout = () => {
    setConstraint(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setMobileMenuOpen(false);
    navigate('/log-in');
  };

  const isActive = (path) => location.pathname.toLowerCase() === path.toLowerCase();

  const navLinkStyle = (path) =>
    `text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg flex items-center gap-1.5 ${
      isActive(path)
        ? 'text-brand-600 bg-brand-50 font-semibold'
        : 'text-slate-600 hover:text-brand-600 hover:bg-slate-100/70'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full glass-nav backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <HiMagnifyingGlass className="w-5 h-5 stroke-2" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-brand-700 bg-clip-text text-transparent">
                Lost<span className="text-brand-600">&</span>Found
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase -mt-1">
                Community Tracker
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
            <Link to="/" className={navLinkStyle('/')}>
              Home
            </Link>

            {/* Items Browser Dropdown */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button
                className={`text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg flex items-center gap-1 ${
                  isActive('/lostitems') || isActive('/founditems')
                    ? 'text-brand-600 bg-brand-50 font-semibold'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-slate-100/70'
                }`}
              >
                <span>Browse Items</span>
                <HiChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 mt-2 w-52 origin-top-left rounded-xl bg-white p-1.5 shadow-xl border border-slate-100 ring-1 ring-black/5 focus:outline-none z-50">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/lostitems"
                        className={`${
                          active ? 'bg-rose-50 text-rose-700' : 'text-slate-700'
                        } flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-colors`}
                      >
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        Lost Items
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/founditems"
                        className={`${
                          active ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700'
                        } flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-colors`}
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Found Items
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

            {token && (
              <>
                <Link to="/postitem" className={navLinkStyle('/postitem')}>
                  <HiPlusCircle className="w-4 h-4 text-brand-500" />
                  Post Item
                </Link>
                <Link to="/mylistings" className={navLinkStyle('/mylistings')}>
                  <HiClipboardDocumentList className="w-4 h-4 text-slate-400" />
                  My Listings
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {token ? (
              <div className="flex items-center gap-3">
                {/* User Info Chip */}
                <div className="flex items-center gap-2.5 pl-3 pr-2 py-1 bg-slate-50 border border-slate-200/80 rounded-full">
                  {user?.img ? (
                    <img
                      src={user.img}
                      alt={user.nickname || 'User'}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-500/20"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-xs font-bold text-white uppercase">
                      {user?.nickname ? user.nickname.charAt(0) : 'U'}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                    {user?.nickname || 'Account'}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignout}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                >
                  <HiArrowRightOnRectangle className="w-4 h-4" />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/log-in"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 rounded-xl transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/sign-up"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 rounded-xl shadow-sm shadow-brand-500/20 transition-all hover:shadow-md hover:shadow-brand-500/30"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-brand-600 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <HiXMark className="w-6 h-6" />
              ) : (
                <HiBars3 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-xl"
          >
            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive('/') ? 'bg-brand-50 text-brand-600 font-semibold' : 'text-slate-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/lostitems"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                  isActive('/lostitems') ? 'bg-rose-50 text-rose-600 font-semibold' : 'text-slate-700'
                }`}
              >
                <span>Lost Items</span>
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              </Link>
              <Link
                to="/founditems"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                  isActive('/founditems') ? 'bg-emerald-50 text-emerald-600 font-semibold' : 'text-slate-700'
                }`}
              >
                <span>Found Items</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </Link>

              {token ? (
                <>
                  <Link
                    to="/postitem"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-lg text-base font-medium flex items-center gap-2 ${
                      isActive('/postitem') ? 'bg-brand-50 text-brand-600 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <HiPlusCircle className="w-5 h-5 text-brand-500" />
                    Post Item
                  </Link>
                  <Link
                    to="/mylistings"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-lg text-base font-medium flex items-center gap-2 ${
                      isActive('/mylistings') ? 'bg-brand-50 text-brand-600 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <HiTag className="w-5 h-5 text-slate-400" />
                    My Listings
                  </Link>
                  <div className="pt-4 border-t border-slate-100 mt-2 flex flex-col gap-2">
                    <div className="flex items-center gap-2.5 px-3 py-1 text-slate-600 text-sm font-medium">
                      <span>Signed in as </span>
                      <strong className="text-slate-900 font-bold">{user?.nickname || 'User'}</strong>
                    </div>
                    <button
                      onClick={handleSignout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-rose-600 bg-rose-50 font-semibold rounded-xl"
                    >
                      <HiArrowRightOnRectangle className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-4 border-t border-slate-100 mt-2 flex flex-col gap-2">
                  <Link
                    to="/log-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 text-slate-700 font-semibold bg-slate-100 rounded-xl"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 text-white font-semibold bg-gradient-to-r from-brand-600 to-indigo-600 rounded-xl shadow-md shadow-brand-500/20"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
