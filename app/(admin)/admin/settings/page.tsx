import { getSettings } from '@/app/(admin)/admin/actions/settings'
import SettingsForm from '@/components/admin/settings/SettingsForm'

export const metadata = {
  title: 'Site Settings | Admin Panel',
}

export default async function SettingsPage() {
  const settings = await getSettings()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-lora font-bold text-[var(--color-text-primary)]">Site Settings</h1>
      </div>
      <SettingsForm initialSettings={settings || []} />
    </div>
  )
}
