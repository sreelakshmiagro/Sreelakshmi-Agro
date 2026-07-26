'use client';

import { useState } from 'react';
import { upsertSetting } from '@/app/(admin)/admin/actions/settings';
import { useToast } from '@/components/admin/ui/Toast';
import { Save, Loader } from 'lucide-react';

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
  const [savingCategory, setSavingCategory] = useState<string | null>(null);
  const toast = useToast();

  const categories = ['Contact Page', 'General', 'Social', 'Analytics', 'Footer'];

  const handleChange = (key: string, value: string) => {
    setSettings(prev => prev.map(s => s.setting_key === key ? { ...s, setting_value: value } : s));
  };

  const saveCategorySettings = async (category: string) => {
    setSavingCategory(category);
    const catSettings = settings.filter(s => s.category === category);

    try {
      await Promise.all(
        catSettings.map(s =>
          upsertSetting(s.setting_key, s.setting_value || '', s.category, s.setting_type || 'text')
        )
      );
      toast.success(`${category} settings saved successfully!`);
    } catch (error: any) {
      toast.error(`Failed to save ${category} settings: ${error.message}`);
    } finally {
      setSavingCategory(null);
    }
  };

  return (
    <div className="space-y-8">
      {categories.map(category => {
        const catSettings = settings.filter(s => s.category === category);
        if (catSettings.length === 0) return null;
        const isSaving = savingCategory === category;

        return (
          <div key={category} className="bg-white p-6 rounded-xl shadow-sm border border-[var(--color-border-light)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-gray-100 gap-4">
              <div>
                <h2 className="text-xl font-bold text-[var(--color-brand-primary)] font-serif">{category} Settings</h2>
                <p className="text-xs text-gray-500 mt-1">Manage content, titles, descriptions, and contact information.</p>
              </div>

              <button
                type="button"
                onClick={() => saveCategorySettings(category)}
                disabled={isSaving}
                className="bg-brand-primary hover:bg-brand-secondary text-white font-sans text-xs font-semibold px-5 py-2.5 rounded-lg shadow transition-all duration-200 flex items-center justify-center gap-2 shrink-0 disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save {category} Settings</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {catSettings.map(setting => (
                <div
                  key={setting.setting_key}
                  className={setting.setting_key.includes('desc') || setting.setting_key.includes('subtitle') || setting.setting_key.includes('address') ? 'md:col-span-2' : ''}
                >
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {setting.setting_key.replace(/_/g, ' ')}
                  </label>
                  {setting.setting_key.includes('desc') || setting.setting_key.includes('subtitle') || setting.setting_key.includes('address') ? (
                    <textarea
                      rows={3}
                      value={setting.setting_value || ''}
                      onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                      className="w-full p-3 border border-[var(--color-border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm text-[var(--color-text-primary)] bg-white"
                      placeholder={`Enter ${setting.setting_key.replace(/_/g, ' ')}`}
                    />
                  ) : (
                    <input
                      type={setting.setting_type === 'email' ? 'email' : 'text'}
                      value={setting.setting_value || ''}
                      onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                      className="w-full p-3 border border-[var(--color-border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm text-[var(--color-text-primary)] bg-white"
                      placeholder={`Enter ${setting.setting_key.replace(/_/g, ' ')}`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Card Submit Action */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => saveCategorySettings(category)}
                disabled={isSaving}
                className="bg-brand-primary hover:bg-brand-secondary text-white font-sans text-sm font-semibold px-6 py-2.5 rounded-lg shadow transition-all duration-200 flex items-center gap-2 disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save {category} Settings</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
