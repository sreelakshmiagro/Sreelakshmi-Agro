'use client'

import { useState } from 'react'
import { upsertSetting } from '@/app/(admin)/admin/actions/settings'
import { useToast } from '@/components/admin/ui/Toast'

export default function SettingsForm({ initialSettings }: { initialSettings: any[] }) {
  const [settings, setSettings] = useState(initialSettings)
  const toast = useToast()

  const categories = ['General', 'Social', 'Analytics', 'Footer']

  const handleBlur = async (key: string, value: string, category: string, type: string) => {
    try {
      await upsertSetting(key, value, category, type)
      toast.success(`Setting saved`)
    } catch (error) {
      toast.error(`Failed to save`)
    }
  }

  const handleChange = (key: string, value: string) => {
    setSettings(prev => prev.map(s => s.setting_key === key ? { ...s, setting_value: value } : s))
  }

  return (
    <div className="space-y-8">
      {categories.map(category => {
        const catSettings = settings.filter(s => s.category === category)
        if (catSettings.length === 0) return null
        return (
          <div key={category} className="bg-white p-6 rounded-lg shadow-sm border border-[var(--color-border-light)]">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-brand-primary)]">{category} Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catSettings.map(setting => (
                <div key={setting.setting_key}>
                  <label className="block text-sm font-medium mb-1 capitalize">
                    {setting.setting_key.replace(/_/g, ' ')}
                  </label>
                  <input
                    type={setting.setting_type === 'email' ? 'email' : 'text'}
                    value={setting.setting_value || ''}
                    onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                    onBlur={(e) => handleBlur(setting.setting_key, e.target.value, setting.category, setting.setting_type)}
                    className="w-full p-2 border border-[var(--color-border-light)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)] text-[var(--color-text-primary)] bg-white"
                    placeholder={`Enter ${setting.setting_key.replace(/_/g, ' ')}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
