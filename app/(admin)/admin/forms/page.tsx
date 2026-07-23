import React from 'react';
import Link from 'next/link';
import { getFormCounts } from '../actions/forms';
import { FileText, Users, Briefcase } from 'lucide-react';

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

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Form Submissions</h1>
        <p className="mt-1 text-sm text-gray-500">Manage all incoming inquiries and applications.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="relative flex flex-col items-start gap-4 rounded-xl border border-border-light bg-white p-6 shadow-sm hover:border-brand-primary/50 transition-colors"
            >
              <div className={`rounded-lg p-3 ${card.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {card.count} unread submissions
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
