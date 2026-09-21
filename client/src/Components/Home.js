import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiMagnifyingGlass,
  HiPlusCircle,
  HiSparkles,
  HiShieldCheck,
  HiMapPin,
  HiArrowRight
} from 'react-icons/hi2';
import macbookImg from '../img/macbook.png';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!window.localStorage.getItem('token');

  const handlePostClick = () => {
    if (isLoggedIn) {
      navigate('/postitem');
    } else {
      navigate('/log-in');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        {/* Decorative background gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-brand-100/60 via-indigo-50/40 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-rose-100/40 blur-2xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 flex flex-col items-start text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
                <HiSparkles className="w-4 h-4 text-brand-500 animate-pulse" />
                <span>Smart Community Lost & Found Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
                Reuniting People with what{' '}
                <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 bg-clip-text text-transparent">
                  Matters Most.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
                Lost your keys, wallet, phone, or pet? Or found an item someone is desperately searching for? Broadcast it in seconds and let the community bring it home.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePostClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-lg shadow-brand-500/25 transition-all"
                >
                  <HiPlusCircle className="w-5 h-5" />
                  <span>Report an Item</span>
                </motion.button>

                <Link
                  to="/lostitems"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all hover:border-slate-300"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>Browse Lost</span>
                </Link>

                <Link
                  to="/founditems"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all hover:border-slate-300"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Browse Found</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-6 w-full max-w-lg">
                <div>
                  <div className="text-2xl font-black text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Free to Use</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">Instant</div>
                  <div className="text-xs text-slate-500 font-medium">Photo Uploads</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">Direct</div>
                  <div className="text-xs text-slate-500 font-medium">Finder Contact</div>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Interactive Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 ring-1 ring-slate-900/5">
                {/* Mock Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Recent Lost Report
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
                    High Priority
                  </span>
                </div>

                {/* Mock Image & Details */}
                <div className="mt-4 rounded-2xl overflow-hidden bg-slate-900 aspect-video relative group">
                  <img
                    src={macbookImg}
                    alt="Matte Black MacBook"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
                    <HiMapPin className="w-3.5 h-3.5 text-rose-500" />
                    Central Library
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    Matte Black MacBook Air 13"
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    Left in a grey felt sleeve on table 4 at the main reading room. Has developer stickers on cover.
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
                      JD
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">John Doe</span>
                      <span className="text-[10px] text-slate-400">Reported today</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/lostitems')}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    Details <HiArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Quick Action Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            How Can We Help You Today?
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Choose what you need to do and start making a difference in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Lost Item */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl p-8 bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6">
                <HiMagnifyingGlass className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-3">
                Lost Something?
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Browse Lost Items
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Explore reports submitted by others or see if anyone has spotted what you lost.
              </p>
            </div>
            <Link
              to="/lostitems"
              className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 group"
            >
              <span>View Lost Items Board</span>
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Card 2: Found Item */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl p-8 bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <HiShieldCheck className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3">
                Found Someone's Item?
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Browse Found Items
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Check our database of items recovered by honest community members waiting for their owners.
              </p>
            </div>
            <Link
              to="/founditems"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 group"
            >
              <span>View Found Items Board</span>
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Card 3: Post Item */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl p-8 bg-gradient-to-br from-brand-600 to-indigo-700 text-white shadow-card hover:shadow-card-hover flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-6 backdrop-blur-md">
                <HiPlusCircle className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-md">
                Take Action
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Publish a Report
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed mb-6">
                Upload pictures, location, and description in under 60 seconds to notify the community.
              </p>
            </div>
            <button
              onClick={handlePostClick}
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-100 group self-start"
            >
              <span>Submit a Listing</span>
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="w-full bg-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-600 text-xs font-bold uppercase tracking-wider">
              Simple & Transparent
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              How Lost & Found Tracker Works
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              A hassle-free 3-step process designed to get belongings back to their owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-start p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-black text-sm flex items-center justify-center mb-5 shadow-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Create a Report
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Log in and share photos, the exact location where the item was lost or discovered, and when it happened.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-5 shadow-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Match & Connect
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Browse listings with real-time search. When a match is found, reach out directly using the provided contact info.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-5 shadow-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Verify & Reunite
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Verify proof of ownership safely and return the belonging. The poster can then close or delete their active listing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-brand-950 to-indigo-950 p-8 sm:p-12 lg:p-16 text-center text-white shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-brand-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full" />

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to Help Someone Recover What They Lost?
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Join hundreds of caring people on campus and in the community. It takes under a minute to sign up and post.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={handlePostClick}
              className="px-6 py-3.5 rounded-xl font-semibold text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all text-sm sm:text-base"
            >
              Post an Item Now
            </button>
            <Link
              to="/lostitems"
              className="px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all text-sm sm:text-base"
            >
              Search Listings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
