import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaGithub, FaHeart } from 'react-icons/fa';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/30">
                <HiMagnifyingGlass className="w-5 h-5 stroke-2" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Lost<span className="text-brand-500">&</span>Found
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              A modern, community-driven tracker connecting people who have lost precious belongings with the honest finders who found them. Fast, transparent, and built for everyone.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/SriLakshmi9860"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-200"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-200"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-200"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-200"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/lostitems" className="hover:text-brand-400 transition-colors">
                  Lost Items Board
                </Link>
              </li>
              <li>
                <Link to="/founditems" className="hover:text-brand-400 transition-colors">
                  Found Items Board
                </Link>
              </li>
              <li>
                <Link to="/postitem" className="hover:text-brand-400 transition-colors">
                  Report New Item
                </Link>
              </li>
              <li>
                <Link to="/mylistings" className="hover:text-brand-400 transition-colors">
                  My Active Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Guidelines */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Community
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-400">
                Always verify proof of ownership before handing over items.
              </li>
              <li className="text-slate-400">
                Meet in safe, public places like campus security or community centers.
              </li>
              <li>
                <a
                  href="https://github.com/SriLakshmi9860/Lost-and-found-tracker"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-400 hover:underline flex items-center gap-1"
                >
                  Contribute on GitHub &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p className="m-0">
            &copy; {currentYear} Lost & Found Tracker. Built with care for the community.
          </p>
          <p className="m-0 flex items-center gap-1">
            MERN Stack Application <FaHeart className="text-rose-500 w-3 h-3" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
