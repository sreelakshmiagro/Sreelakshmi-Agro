'use client';

import { useState } from 'react';
import { upsertSetting } from '@/app/(admin)/admin/actions/settings';
import { useToast } from '@/components/admin/ui/Toast';

const DEFAULT_SETTINGS = [
  // General & Contact Info
  { setting_key: 'site_phone', setting_value: '+91 9847997979', category: 'General', setting_type: 'text' },
  { setting_key: 'site_email', setting_value: 'sreelakshmi7979@gmail.com', category: 'General', setting_type: 'email' },
  { setting_key: 'site_address', setting_value: 'Sreelakshmi Agro Industries, Methalapadam, Kodungallur, Thrissur District, Pin Code- 680 669, Kerala', category: 'General', setting_type: 'text' },
  { setting_key: 'site_working_hours', setting_value: 'Mon - Sat: 9:00 AM - 6:00 PM', category: 'General', setting_type: 'text' },
  { setting_key: 'site_whatsapp', setting_value: '919847997979', category: 'General', setting_type: 'text' },

  // Contact Page Specific
  { setting_key: 'contact_hero_title', setting_value: 'Contact Sreelakshmi Agro', category: 'Contact Page', setting_type: 'text' },
  { setting_key: 'contact_hero_subtitle', setting_value: 'Have questions about our Samba Broken Wheat, bulk pricing, or distributor applications? Our team is here to assist.', category: 'Contact Page', setting_type: 'text' },
  { setting_key: 'contact_call_title', setting_value: 'Call Us Today', category: 'Contact Page', setting_type: 'text' },
  { setting_key: 'contact_call_desc', setting_value: 'For general inquiries, distributor opportunities, and immediate support.', category: 'Contact Page', setting_type: 'text' },
  { setting_key: 'contact_email_title', setting_value: 'Email Support', category: 'Contact Page', setting_type: 'text' },
  { setting_key: 'contact_email_desc', setting_value: 'Send us a detailed proposal or quality query. We read every email.', category: 'Contact Page', setting_type: 'text' },
  { setting_key: 'contact_hours_title', setting_value: 'Working Hours', category: 'Contact Page', setting_type: 'text' },
  { setting_key: 'contact_hours_desc', setting_value: 'We are available online and offline during these times.', category: 'Contact Page', setting_type: 'text' },
  { setting_key: 'contact_office_title', setting_value: 'Office', category: 'Contact Page', setting_type: 'text' },
];

export default function SettingsForm({ initialSettings }: { initialSettings: any[] }) {
  // Merge initialSettings with DEFAULT_SETTINGS so all contact keys exist
  const mergedMap = new Map<string, any>();
  DEFAULT_SETTINGS.forEach(item => mergedMap.set(item.setting_key, item));
  (initialSettings || []).forEach(item => mergedMap.set(item.setting_key, { ...item, category: item.category || 'General' }));

  const [settings, setSettings] = useState<any[]>(Array.from(mergedMap.values()));
  const toast = useToast();

  const categories = ['Contact Page', 'General', 'Social', 'Analytics', 'Footer'];

  const handleBlur = async (key: string, value: string, category: string, type: string) => {
    try {
      await upsertSetting(key, value, category, type);
      toast.success(`Saved "${key.replace(/_/g, ' ')}"`);
    } catch (error: any) {
      toast.error(`Failed to save: ${error.message}`);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => prev.map(s => s.setting_key === key ? { ...s, setting_value: value } : s));
  };

  return (
    <div className="space-y-8">
      {categories.map(category => {
        const catSettings = settings.filter(s => s.category === category);
        if (catSettings.length === 0) return null;
        return (
          <div key={category} className="bg-white p-6 rounded-lg shadow-sm border border-[var(--color-border-light)]">
            <h2 className="text-xl font-semibold mb-1 text-[var(--color-brand-primary)]">{category} Settings</h2>
            <p className="text-xs text-gray-500 mb-4">Changes save automatically when you click outside an input field.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catSettings.map(setting => (
                <div key={setting.setting_key} className={setting.setting_key.includes('desc') || setting.setting_key.includes('subtitle') || setting.setting_key.includes('address') ? 'md:col-span-2' : ''}>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {setting.setting_key.replace(/_/g, ' ')}
                  </label>
                  {setting.setting_key.includes('desc') || setting.setting_key.includes('subtitle') || setting.setting_key.includes('address') ? (
                    <textarea
                      rows={2}
                      value={setting.setting_value || ''}
                      onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                      onBlur={(e) => handleBlur(setting.setting_key, e.target.value, setting.category, setting.setting_type || 'text')}
                      className="w-full p-2.5 border border-[var(--color-border-light)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)] text-sm text-[var(--color-text-primary)] bg-white"
                      placeholder={`Enter ${setting.setting_key.replace(/_/g, ' ')}`}
                    />
                  ) : (
                    <input
                      type={setting.setting_type === 'email' ? 'email' : 'text'}
                      value={setting.setting_value || ''}
                      onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                      onBlur={(e) => handleBlur(setting.setting_key, e.target.value, setting.category, setting.setting_type || 'text')}
                      className="w-full p-2.5 border border-[var(--color-border-light)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)] text-sm text-[var(--color-text-primary)] bg-white"
                      placeholder={`Enter ${setting.setting_key.replace(/_/g, ' ')}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
