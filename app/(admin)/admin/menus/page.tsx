import { getMenusByLocation } from '@/app/(admin)/admin/actions/menus'
import MenuManager from '@/components/admin/menus/MenuManager'

export const metadata = {
  title: 'Menu Management | Admin Panel',
}

export default async function MenusPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const resolvedParams = await searchParams;
  const currentTab = resolvedParams.tab || 'header'
  const menus = await getMenusByLocation(currentTab)

  const tabs = [
    { id: 'header', label: 'Header Menu' },
    { id: 'footer', label: 'Footer Menu' },
    { id: 'quick_links', label: 'Quick Links' },
    { id: 'social', label: 'Social Links' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-lora font-bold text-[var(--color-text-primary)]">Menu Management</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-[var(--color-border-light)] overflow-hidden">
        <div className="flex border-b border-[var(--color-border-light)] overflow-x-auto">
          {tabs.map(tab => (
            <a
              key={tab.id}
              href={`/admin/menus?tab=${tab.id}`}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${currentTab === tab.id ? 'border-b-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] bg-gray-50' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-gray-50'}`}
            >
              {tab.label}
            </a>
          ))}
        </div>
        <div className="p-6">
          <MenuManager initialMenus={menus || []} location={currentTab} />
        </div>
      </div>
    </div>
  )
}
