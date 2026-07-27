'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Bell, Inbox, Mail, FileText, ChevronRight, Sparkles } from 'lucide-react';
import { getFormCounts } from '@/app/(admin)/admin/actions/forms';

export function AdminNotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const [counts, setCounts] = useState<{
    distributors: number;
    contacts: number;
    applications: number;
    totalUnread: number;
  }>({ distributors: 0, contacts: 0, applications: 0, totalUnread: 0 });

  const menuRef = useRef<HTMLDivElement>(null);

  const fetchCounts = async () => {
    try {
      const data = await getFormCounts();
      const dist = data.distributors || 0;
      const cnt = data.contacts || 0;
      const app = data.applications || 0;
      const total = dist + cnt + app;

      setCounts({
        distributors: dist,
        contacts: cnt,
        applications: app,
        totalUnread: total,
      });

      if (typeof window !== 'undefined') {
        const lastSeen = Number(localStorage.getItem('admin_notifications_seen_count') || '0');
        if (total > lastSeen) {
          setHasSeen(false); // New submissions arrived!
        } else if (lastSeen > 0 && total <= lastSeen) {
          setHasSeen(true); // Already opened and seen
        }
      }
    } catch {
      // safe fallback
    }
  };

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 30000); // refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setHasSeen(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_notifications_seen_count', String(counts.totalUnread));
        }
      }
      return next;
    });
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="relative p-2 rounded-full text-gray-500 hover:text-brand-primary hover:bg-gray-100 transition-colors focus:outline-none"
        title="Form Submissions & Notifications"
      >
        <Bell className="w-5 h-5" />
        {!hasSeen && counts.totalUnread > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm animate-pulse">
            {counts.totalUnread > 99 ? '99+' : counts.totalUnread}
          </span>
        )}
      </button>

      {/* Notification Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-brand-primary p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <h3 className="font-serif font-bold text-sm">Form Submissions Inbox</h3>
            </div>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-sans font-semibold">
              {counts.totalUnread} New
            </span>
          </div>

          <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
            {/* Distributor Inquiries */}
            <Link
              href="/admin/forms/distributors"
              onClick={() => setIsOpen(false)}
              className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0">
                  <Inbox className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                    Distributor Applications
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {counts.distributors > 0
                      ? `${counts.distributors} new pending inquiry submission(s)`
                      : 'No new distributor inquiries'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {counts.distributors > 0 && (
                  <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                    {counts.distributors}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-primary" />
              </div>
            </Link>

            {/* Contact Inquiries */}
            <Link
              href="/admin/forms/contacts"
              onClick={() => setIsOpen(false)}
              className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                    Contact Form Messages
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {counts.contacts > 0
                      ? `${counts.contacts} unread contact inquiry message(s)`
                      : 'No new contact messages'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {counts.contacts > 0 && (
                  <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                    {counts.contacts}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-primary" />
              </div>
            </Link>

            {/* Job Applications */}
            <Link
              href="/admin/forms/applications"
              onClick={() => setIsOpen(false)}
              className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50 text-purple-700 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                    Job Candidate Applications
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {counts.applications > 0
                      ? `${counts.applications} new candidate application(s)`
                      : 'No new career applications'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {counts.applications > 0 && (
                  <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                    {counts.applications}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-primary" />
              </div>
            </Link>
          </div>

          <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
            <Link
              href="/admin/forms"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-brand-primary hover:underline"
            >
              View All Form Submissions →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
