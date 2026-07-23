import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getTeamMember } from '@/app/(admin)/admin/actions/team';
import { TeamForm } from '@/components/admin/team/TeamForm';

export const metadata = {
  title: 'Edit Team Member | Admin',
};

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const isNew = resolvedParams.id === 'new';
  let member = null;
  
  if (!isNew) {
    member = await getTeamMember(resolvedParams.id);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/team" className="text-gray-500 hover:text-gray-900">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-lora font-bold text-brand-primary">
            {isNew ? 'Add Team Member' : 'Edit Team Member'}
          </h1>
        </div>
      </div>

      <TeamForm initialData={member} />
    </div>
  );
}
