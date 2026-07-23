import { getUsers } from '@/app/(admin)/admin/actions/users'
import UserManager from '@/components/admin/users/UserManager'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'User Management | Admin Panel',
}

export default async function UsersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('user_profiles').select('role').eq('id', user.id).single()
  
  if (profile?.role !== 'super_admin') {
    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>Only super administrators can access user management.</p>
      </div>
    )
  }

  const users = await getUsers()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-lora font-bold text-[var(--color-text-primary)]">User Management</h1>
      </div>
      <UserManager users={users || []} currentUserId={user.id} />
    </div>
  )
}
