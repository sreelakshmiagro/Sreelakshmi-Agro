'use client'

import { useState } from 'react'
import { upsertMenuItem, deleteMenuItem, updateMenuOrder } from '@/app/(admin)/admin/actions/menus'
import { useToast } from '@/components/admin/ui/Toast'
import { Trash2, Edit2, GripVertical, Plus } from 'lucide-react'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'

export default function MenuManager({ initialMenus, location }: { initialMenus: any[], location: string }) {
  const [menus, setMenus] = useState(initialMenus)
  const [isEditing, setIsEditing] = useState<any>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const toast = useToast()

  const [formData, setFormData] = useState({
    label: '',
    url: '',
    is_active: true,
    sort_order: menus.length
  })

  const handleSave = async () => {
    try {
      if (isEditing) {
        await upsertMenuItem({ id: isEditing.id, ...formData, menu_location: location })
      } else {
        await upsertMenuItem({ ...formData, menu_location: location })
      }
      toast.success('Menu item saved')
      setIsEditing(null)
      window.location.reload()
    } catch (e) {
      toast.error('Error saving menu')
    }
  }

  const handleDelete = async () => {
    if (!itemToDelete) return
    try {
      await deleteMenuItem(itemToDelete)
      toast.success('Menu item deleted')
      setShowConfirm(false)
      window.location.reload()
    } catch (e) {
      toast.error('Error deleting')
    }
  }

  const moveUp = async (index: number) => {
    if (index === 0) return
    const newMenus = [...menus]
    const temp = newMenus[index - 1].sort_order
    newMenus[index - 1].sort_order = newMenus[index].sort_order
    newMenus[index].sort_order = temp
    setMenus(newMenus.sort((a, b) => a.sort_order - b.sort_order))
    await updateMenuOrder(newMenus)
  }

  const moveDown = async (index: number) => {
    if (index === menus.length - 1) return
    const newMenus = [...menus]
    const temp = newMenus[index + 1].sort_order
    newMenus[index + 1].sort_order = newMenus[index].sort_order
    newMenus[index].sort_order = temp
    setMenus(newMenus.sort((a, b) => a.sort_order - b.sort_order))
    await updateMenuOrder(newMenus)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold capitalize">{location} Menu</h2>
        <button 
          onClick={() => {
            setIsEditing(false)
            setFormData({ label: '', url: '', is_active: true, sort_order: menus.length })
          }}
          className="px-4 py-2 bg-[var(--color-brand-primary)] text-white rounded flex items-center gap-2 hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {isEditing !== null && (
        <div className="bg-gray-50 p-4 rounded mb-6 border border-gray-200">
          <h3 className="font-medium mb-4">{isEditing ? 'Edit Item' : 'New Item'}</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Label</label>
              <input value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm mb-1">URL</label>
              <input value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full p-2 border rounded" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 bg-[var(--color-brand-primary)] text-white rounded">Save</button>
            <button onClick={() => setIsEditing(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {menus.map((item, idx) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-white border rounded">
            <div className="flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-sm text-gray-500">{item.url}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => moveUp(idx)} disabled={idx === 0} className="p-1 text-gray-500 hover:bg-gray-100 rounded">↑</button>
              <button onClick={() => moveDown(idx)} disabled={idx === menus.length - 1} className="p-1 text-gray-500 hover:bg-gray-100 rounded">↓</button>
              <button onClick={() => {
                setIsEditing(item)
                setFormData({ label: item.label, url: item.url, is_active: item.is_active, sort_order: item.sort_order })
              }} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => {
                setItemToDelete(item.id)
                setShowConfirm(true)
              }} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {menus.length === 0 && <p className="text-gray-500 py-4 text-center">No menu items found in this location.</p>}
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Menu Item"
        message="Are you sure you want to delete this menu item?"
        onConfirm={handleDelete}
        onClose={() => setShowConfirm(false)}
      />
    </div>
  )
}
