import React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/20/solid';

const PaginationComponent = ({ page, setPage, max }) => {
  const maxPages = Math.max(1, Math.ceil(max));

  if (maxPages <= 1) return null;

  return (
    <div className="flex items-center justify-center pt-14 pb-8">
      <nav
        className="inline-flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm"
        aria-label="Pagination Navigation"
      >
        {/* First page */}
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          title="First Page"
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
        >
          <span className="sr-only">First</span>
          <ChevronDoubleLeftIcon className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Previous page */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          title="Previous Page"
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 px-1">
          {[...Array(maxPages)].map((_, i) => {
            const pageNum = i + 1;
            const isCurrent = page === pageNum;

            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                aria-current={isCurrent ? 'page' : undefined}
                className={`min-w-[36px] h-9 px-3 rounded-xl text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-sm shadow-brand-500/25'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next page */}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === maxPages}
          title="Next Page"
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Last page */}
        <button
          onClick={() => setPage(maxPages)}
          disabled={page === maxPages}
          title="Last Page"
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
        >
          <span className="sr-only">Last</span>
          <ChevronDoubleRightIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

export default PaginationComponent;
