'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, LogOut, Menu, ShieldCheck, User, X } from 'lucide-react';
import { useAuth } from './auth-context';
import { Brand } from './brand';
import { Button } from './ui';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const links = [
    ['How It Works', '/#how'],
    ['What We Help With', '/#help'],
    ['About', '/about'],
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-mist/90 backdrop-blur">
      <nav className="container flex h-[76px] items-center justify-between">
        <Brand />

        <div className="hidden items-center gap-7 md:flex">
          {links.map(([l, h]) => (
            <Link key={l} href={h} className="text-sm font-semibold text-ink/70 hover:text-ink">
              {l}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-2.5 rounded-full border border-line/80 bg-white/90 px-3.5 py-1.5 shadow-xs backdrop-blur-sm hover:border-line hover:bg-white transition-all text-left cursor-pointer"
                aria-expanded={accountMenuOpen}
                aria-haspopup="true"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage text-xs font-bold text-white shadow-xs">
                  {user.name?.trim() ? user.name.trim().charAt(0).toUpperCase() : <User size={14} />}
                </span>
                <div className="flex flex-col text-left">
                  <span className="max-w-[140px] truncate text-xs font-bold text-ink leading-snug">
                    {user.name || user.email}
                  </span>
                  {user.name && user.email && (
                    <span className="max-w-[140px] truncate text-[10px] font-medium text-ink/60 leading-none">
                      {user.email}
                    </span>
                  )}
                </div>
                <ChevronDown size={14} className={`text-ink/60 transition-transform duration-200 ${accountMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-lg z-50 animate-in fade-in zoom-in-95">
                  <div className="border-b border-line/60 p-3">
                    <p className="truncate text-sm font-bold text-ink">{user.name || 'Citizen User'}</p>
                    <p className="truncate text-xs text-ink/60">{user.email}</p>
                    <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-sage/10 px-2 py-0.5 text-[10px] font-bold text-sage">
                      <ShieldCheck size={12} /> Active Citizen Account
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        setAccountModalOpen(true);
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-ink/80 hover:bg-mist hover:text-ink transition cursor-pointer"
                    >
                      <User size={15} className="text-sage" /> My Account
                    </button>
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition cursor-pointer"
                    >
                      <LogOut size={15} /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold text-ink/70 hover:text-ink">
                Log In
              </Link>
              <Button href="/signup" className="py-2.5">
                Get Started
              </Button>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 focus:outline-none focus:ring-4 focus:ring-blue/20 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-line bg-mist transition-all duration-300 md:hidden ${
          open ? 'max-h-96' : 'max-h-0 border-transparent'
        }`}
      >
        <div className="container flex flex-col gap-4 py-5">
          {links.map(([l, h]) => (
            <Link key={l} href={h} onClick={() => setOpen(false)} className="font-semibold">
              {l}
            </Link>
          ))}

          {user ? (
            <div className="flex flex-col gap-3 border-t border-line/80 pt-3">
              <div className="flex items-center gap-3 rounded-xl border border-line/60 bg-white/80 p-3 shadow-xs">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage text-sm font-bold text-white shadow-xs shrink-0">
                  {user.name?.trim() ? user.name.trim().charAt(0).toUpperCase() : <User size={16} />}
                </span>
                <div className="flex flex-col overflow-hidden text-left">
                  <span className="truncate text-sm font-bold text-ink leading-snug">
                    {user.name || user.email}
                  </span>
                  {user.name && user.email && (
                    <span className="truncate text-xs font-medium text-ink/60">
                      {user.email}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  setAccountModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-line/80 bg-white py-2.5 text-sm font-semibold text-ink/80 hover:text-ink transition cursor-pointer"
              >
                <User size={16} className="text-sage" /> My Account
              </button>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-line/80 bg-white/60 py-2.5 text-sm font-semibold text-ink/80 hover:bg-white hover:text-ink transition cursor-pointer"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className="font-semibold">
                Log In
              </Link>
              <Button href="/signup" onClick={() => setOpen(false)}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Account Info Modal */}
      {accountModalOpen && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={22} className="text-sage" />
                <h3 className="text-lg font-bold text-ink">My Account</h3>
              </div>
              <button
                onClick={() => setAccountModalOpen(false)}
                className="rounded-lg p-1 text-ink/50 hover:bg-mist hover:text-ink transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-4 rounded-xl border border-line/60 bg-mist/60 p-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage text-lg font-bold text-white shadow-xs shrink-0">
                  {user.name?.trim() ? user.name.trim().charAt(0).toUpperCase() : <User size={22} />}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-base font-bold text-ink">{user.name || 'Citizen User'}</p>
                  <p className="truncate text-xs text-ink/60">{user.email}</p>
                </div>
              </div>

              <dl className="grid gap-3 rounded-xl border border-line/60 bg-white p-4 text-xs">
                <div className="flex justify-between py-1 border-b border-line/40">
                  <dt className="font-semibold text-ink/50">Account Status</dt>
                  <dd className="font-bold text-sage">Active & Verified</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-line/40">
                  <dt className="font-semibold text-ink/50">Authentication Type</dt>
                  <dd className="font-bold text-ink">LokSeva Citizen Auth</dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="font-semibold text-ink/50">Primary Role</dt>
                  <dd className="font-bold text-ink">Public Citizen Advocate</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setAccountModalOpen(false)}
                className="rounded-xl border border-line bg-mist px-5 py-2 text-xs font-bold text-ink hover:bg-line/40 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
