'use client'

import { updateUserRole, updateUserStatus } from '@/app/(admin)/admin/actions/users'
import { useToast } from '@/components/admin/ui/Toast'
import { StatusBadge } from '@/components/admin/ui/StatusBadge'

export default function UserManager({ users, currentUserId }: { users: any[], currentUserId: string }) {
  const toast = useToast()

  const handleRoleChange = async (id: string, newRole: string) => {
    if (id === currentUserId) {
      toast.error('Cannot change your own role')
      return
    }
    try {
      await updateUserRole(id, newRole)
      toast.success('Role updated successfully')
      window.location.reload()
    } catch (e) {
      toast.error('Failed to update role')
    }
  }

  const handleStatusToggle = async (id: string, currentStatus: boolean) => {
    if (id === currentUserId) {
      toast.error('Cannot deactivate your own account')
      return
    }
    try {
      await updateUserStatus(id, !currentStatus)
      toast.success('Status updated successfully')
      window.location.reload()
    } catch (e) {
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[var(--color-border-light)] overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-[var(--color-border-light)]">
          <tr>
            <th className="text-left p-4 font-medium text-gray-600">Name</th>
            <th className="text-left p-4 font-medium text-gray-600">Role</th>
            <th className="text-left p-4 font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border-light)]">
          {users.map((row: any) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="p-4 font-medium">{row.full_name}</td>
              <td className="p-4">
                <select
                  value={row.role || 'editor'}
                  onChange={(e) => handleRoleChange(row.id, e.target.value)}
                  className="border border-[var(--color-border-light)] rounded p-1.5 text-sm bg-white text-[var(--color-text-primary)]"
                  disabled={row.id === currentUserId}
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <StatusBadge status={row.is_active ? 'active' : 'inactive'} />
                  <button
                    onClick={() => handleStatusToggle(row.id, row.is_active)}
                    disabled={row.id === currentUserId}
                    className="text-xs text-[var(--color-brand-primary)] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Toggle
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
