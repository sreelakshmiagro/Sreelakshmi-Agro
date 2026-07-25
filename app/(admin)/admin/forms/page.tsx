import React from 'react';
import Link from 'next/link';
import { getFormCounts } from '../actions/forms';
import { FileText, Users, Briefcase, SlidersHorizontal, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Forms | Admin',
};

export default async function FormsPage() {
  const counts = await getFormCounts();

  const cards = [
    {
      title: 'Distributor Enquiries',
      count: counts.distributors,
      href: '/admin/forms/distributors',
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Contact Submissions',
      count: counts.contacts,
      href: '/admin/forms/contacts',
      icon: FileText,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Job Applications',
      count: counts.applications,
      href: '/admin/forms/applications',
      icon: Briefcase,
      color: 'bg-purple-50 text-purple-600',
    }
  ];

  const templates = [
    {
      title: 'Careers & Job Application Form',
      description: 'Configure headings, placeholders, CV upload rules, and labels for Job Application Form.',
      href: '/admin/forms/templates',
      icon: Briefcase,
    },
    {
      title: 'Become a Distributor Form',
      description: 'Configure company fields, state/district dropdown options, and commercial inquiry rules.',
      href: '/admin/forms/templates',
      icon: Users,
    },
    {
      title: 'Contact Us Quick Message Form',
      description: 'Configure message headings, subject line prompts, and customer support labels.',
      href: '/admin/forms/templates',
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-10 p-6">
      {/* SECTION 1: Submissions Inbox */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Form Submissions Inbox</h1>
          <p className="mt-1 text-sm text-gray-500">Manage all incoming lead inquiries, applications, and commercial submissions.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="relative flex flex-col items-start gap-4 rounded-xl border border-border-light bg-white p-6 shadow-sm hover:border-brand-primary transition-colors group"
              >
                <div className={`rounded-lg p-3 ${card.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-primary transition-colors">{card.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {card.count} unread submissions
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Form Templates & Builder (User Requirement) */}
      <div className="space-y-4 border-t border-gray-200 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-brand-primary" />
              <h2 className="text-xl font-bold text-gray-900">Form Templates & Editable Configs</h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">Edit public form titles, subheadings, submit button text, field labels, and placeholders.</p>
          </div>
          <Link
            href="/admin/forms/templates"
            className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-primary/90 shadow-sm"
          >
            <span>Open Form Builder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {templates.map((tpl, i) => {
            const Icon = tpl.icon;
            return (
              <Link
                key={i}
                href={tpl.href}
                className="bg-white p-6 rounded-xl border border-border-light shadow-sm hover:border-brand-primary transition-all flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-3">
                  <div className="p-2.5 bg-brand-primary/10 text-brand-primary rounded-lg w-max">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-brand-primary transition-colors text-base">
                    {tpl.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-brand-primary">
                  <span>Edit Form Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
