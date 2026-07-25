'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveFormConfig } from '@/app/(admin)/admin/actions/forms';
import { useToast } from '@/components/admin/ui/Toast';
import { Save, Briefcase, Users, Mail, Settings, Eye, Plus, Trash2, X, ListPlus, Tag } from 'lucide-react';
import { ALL_INDIAN_STATES, getDistrictsForState } from '@/lib/indiaData';

interface FormTemplatesClientProps {
  initialConfigs: Record<string, any>;
}

const DEFAULT_CAREERS_CONFIG = {
  title: 'Submit Job Application',
  subtitle: 'Fill in details and upload your CV (PDF or DOCX format only).',
  buttonText: 'Submit Application',
  successMessage: 'Thank you for applying. Our talent acquisition team will review your resume and experience matches, and contact you if there is a match.',
  fields: {
    fullName: { label: 'FULL NAME', placeholder: 'e.g., Robert Frost', required: true, type: 'text' },
    positionApplied: {
      label: 'POSITION APPLIED FOR',
      placeholder: 'Select Open Opening',
      required: true,
      type: 'select',
      options: ['Plant Manager', 'Quality Assurance Lead', 'Production Supervisor', 'Logistics Executive']
    },
    phone: { label: 'MOBILE PHONE NUMBER', placeholder: '10-digit number', required: true, type: 'tel' },
    email: { label: 'EMAIL ADDRESS', placeholder: 'you@domain.com', required: true, type: 'email' },
    experienceYears: { label: 'TOTAL YEARS OF EXPERIENCE', placeholder: '0', required: true, type: 'number' },
    qualification: { label: 'HIGHEST EDUCATIONAL QUALIFICATION', placeholder: 'e.g., B.Tech Food Tech / MBA Operations', required: true, type: 'text' },
    currentCompany: { label: 'CURRENT COMPANY (OPTIONAL)', placeholder: 'e.g., FMCG Corp', required: false, type: 'text' },
    expectedSalary: { label: 'EXPECTED SALARY (OPTIONAL)', placeholder: 'e.g., 6,000,000 INR', required: false, type: 'text' },
    noticePeriod: { label: 'NOTICE PERIOD (OPTIONAL)', placeholder: 'e.g., Immediate / 30 Days', required: false, type: 'text' },
    resumeUpload: { label: 'UPLOAD CV/RESUME', placeholder: 'Drag & drop file or browse (PDF, DOCX Max 5MB)', required: true, type: 'file' },
    coverLetter: { label: 'COVER LETTER / SUMMARY (OPTIONAL)', placeholder: 'Tell us why you are a good fit for this position...', required: false, type: 'textarea' },
  }
};

const DEFAULT_DISTRIBUTOR_CONFIG = {
  title: 'Distributor Inquiry Form',
  subtitle: 'Please provide accurate commercial details to accelerate the onboarding check.',
  buttonText: 'Submit Partner Inquiry',
  successMessage: 'Thank you for your interest in Sreelakshmi Agro Industries. Our business development team will review your details and contact you within 24–48 hours.',
  fields: {
    companyName: { label: 'COMPANY NAME', placeholder: 'e.g., Sreelakshmi Distributors', required: true, type: 'text' },
    contactPerson: { label: 'CONTACT PERSON NAME', placeholder: 'e.g., John Doe', required: true, type: 'text' },
    phone: { label: 'MOBILE PHONE NUMBER', placeholder: '10-digit number', required: true, type: 'tel' },
    whatsapp: { label: 'WHATSAPP NUMBER (OPTIONAL)', placeholder: '10-digit number', required: false, type: 'tel' },
    email: { label: 'EMAIL ADDRESS', placeholder: 'info@company.com', required: true, type: 'email' },
    state: {
      label: 'STATE',
      placeholder: 'Select State',
      required: true,
      type: 'select',
      options: ALL_INDIAN_STATES
    },
    district: {
      label: 'DISTRICT',
      placeholder: 'Select District',
      required: true,
      type: 'select',
      options: getDistrictsForState('Kerala')
    },
    city: { label: 'CITY / TOWN', placeholder: 'e.g., City Center', required: true, type: 'text' },
    businessType: {
      label: 'BUSINESS TYPE',
      placeholder: 'Select Business Type',
      required: true,
      type: 'select',
      options: ['Wholesaler / Trader', 'Super Stockist', 'Retail Chain Partner', 'Agro-Inputs Distributor']
    },
    yearsInBusiness: { label: 'YEARS IN BUSINESS', placeholder: '0', required: true, type: 'number' },
    expectedOrderVolume: {
      label: 'EXPECTED ORDER VOLUME',
      placeholder: 'Select Volume',
      required: true,
      type: 'select',
      options: ['Under 5 Tons / Month', '5 - 15 Tons / Month', '15 - 50 Tons / Month', 'Above 50 Tons / Month']
    },
    currentProducts: { label: 'CURRENT BRANDS / PRODUCTS HANDLED', placeholder: 'e.g., Brand X Flour, Brand Y Rice', required: false, type: 'text' },
    message: { label: 'ADDITIONAL MESSAGE / ENQUIRIES', placeholder: 'Tell us about your distribution footprint...', required: false, type: 'textarea' },
  }
};

const DEFAULT_CONTACT_CONFIG = {
  title: 'Send Us a Quick Message',
  subtitle: 'We generally respond to messages within 24 business hours.',
  buttonText: 'Send Message →',
  successMessage: 'Thank you for contacting us. Our operations team will get in touch with you shortly.',
  fields: {
    name: { label: 'FULL NAME', placeholder: 'e.g., Jane Smith', required: true, type: 'text' },
    phone: { label: 'MOBILE NUMBER', placeholder: '10-digit number', required: true, type: 'tel' },
    email: { label: 'EMAIL ADDRESS', placeholder: 'you@email.com', required: true, type: 'email' },
    subject: { label: 'SUBJECT', placeholder: 'e.g., Pricing Inquiry / Feedback', required: true, type: 'text' },
    message: { label: 'YOUR MESSAGE', placeholder: 'Provide complete details to help us assist you...', required: true, type: 'textarea' },
  }
};

export function FormTemplatesClient({ initialConfigs }: FormTemplatesClientProps) {
  const router = useRouter();
  const toast = useToast();
  const [activeFormTab, setActiveFormTab] = useState<'careers' | 'distributor' | 'contact'>('careers');
  const [isSaving, setIsSaving] = useState(false);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);

  const [newFieldData, setNewFieldData] = useState({
    key: '',
    label: '',
    placeholder: '',
    type: 'text',
    required: false,
    optionsInput: '',
  });

  const [careersConfig, setCareersConfig] = useState(initialConfigs.form_careers_config || DEFAULT_CAREERS_CONFIG);
  const [distributorConfig, setDistributorConfig] = useState(initialConfigs.form_distributor_config || DEFAULT_DISTRIBUTOR_CONFIG);
  const [contactConfig, setContactConfig] = useState(initialConfigs.form_contact_config || DEFAULT_CONTACT_CONFIG);

  const currentConfig = activeFormTab === 'careers' ? careersConfig : (activeFormTab === 'distributor' ? distributorConfig : contactConfig);
  const setCurrentConfig = (updater: any) => {
    if (activeFormTab === 'careers') setCareersConfig(updater);
    else if (activeFormTab === 'distributor') setDistributorConfig(updater);
    else setContactConfig(updater);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (activeFormTab === 'careers') {
        await saveFormConfig('form_careers_config', careersConfig);
      } else if (activeFormTab === 'distributor') {
        await saveFormConfig('form_distributor_config', distributorConfig);
      } else {
        await saveFormConfig('form_contact_config', contactConfig);
      }
      toast.success('Form template and field configs saved successfully!');
      router.refresh();
    } catch (err: any) {
      toast.error('Failed to save form config', err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteField = (fieldKey: string) => {
    const updatedFields = { ...currentConfig.fields };
    delete updatedFields[fieldKey];
    setCurrentConfig({ ...currentConfig, fields: updatedFields });
    toast.info(`Field "${fieldKey}" removed`);
  };

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldData.key.trim() || !newFieldData.label.trim()) {
      toast.error('Field key and label are required');
      return;
    }

    const cleanKey = newFieldData.key.replace(/[^a-zA-Z0-9_]/g, '');
    const optionsArray = newFieldData.type === 'select' && newFieldData.optionsInput.trim()
      ? newFieldData.optionsInput.split(',').map(s => s.trim()).filter(Boolean)
      : undefined;

    const updatedFields = {
      ...currentConfig.fields,
      [cleanKey]: {
        label: newFieldData.label.toUpperCase(),
        placeholder: newFieldData.placeholder,
        type: newFieldData.type,
        required: newFieldData.required,
        ...(optionsArray ? { options: optionsArray } : {})
      }
    };

    setCurrentConfig({ ...currentConfig, fields: updatedFields });
    toast.success(`Field "${newFieldData.label}" added successfully!`);
    setShowAddFieldModal(false);
    setNewFieldData({ key: '', label: '', placeholder: '', type: 'text', required: false, optionsInput: '' });
  };

  const handleAddOptionToField = (fieldKey: string, optionVal: string) => {
    if (!optionVal.trim()) return;
    const existing = currentConfig.fields[fieldKey]?.options || [];
    if (existing.includes(optionVal.trim())) return;

    const updatedFields = {
      ...currentConfig.fields,
      [fieldKey]: {
        ...currentConfig.fields[fieldKey],
        options: [...existing, optionVal.trim()]
      }
    };
    setCurrentConfig({ ...currentConfig, fields: updatedFields });
  };

  const handleRemoveOptionFromField = (fieldKey: string, optionIdx: number) => {
    const existing = currentConfig.fields[fieldKey]?.options || [];
    const updatedFields = {
      ...currentConfig.fields,
      [fieldKey]: {
        ...currentConfig.fields[fieldKey],
        options: existing.filter((_: string, idx: number) => idx !== optionIdx)
      }
    };
    setCurrentConfig({ ...currentConfig, fields: updatedFields });
  };

  return (
    <div className="space-y-6">
      {/* Form Tabs */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveFormTab('careers')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-colors ${
            activeFormTab === 'careers' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Briefcase className="w-4 h-4" /> 1. Careers & Job Application Form
        </button>
        <button
          type="button"
          onClick={() => setActiveFormTab('distributor')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-colors ${
            activeFormTab === 'distributor' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Users className="w-4 h-4" /> 2. Become a Distributor Form
        </button>
        <button
          type="button"
          onClick={() => setActiveFormTab('contact')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-colors ${
            activeFormTab === 'contact' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Mail className="w-4 h-4" /> 3. Send Us a Quick Message (Contact)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Editable Form Header & Fields */}
        <div className="lg:col-span-7 space-y-6 bg-white p-6 rounded-lg border border-border-light shadow-sm">
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 capitalize">{activeFormTab} Form Configuration</h2>
              <p className="text-xs text-gray-500">Edit titles, subheadings, placeholders, dropdown options, and add/delete form fields</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowAddFieldModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md hover:bg-emerald-100 text-xs font-bold transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Field
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary/90 text-sm font-semibold disabled:opacity-50 shadow-sm"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Form Changes'}
              </button>
            </div>
          </div>

          {/* Form Header Settings */}
          <div className="space-y-4 bg-gray-50/70 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider">Form Header & Actions</h3>
            
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Form Heading Title</label>
              <input
                type="text"
                value={currentConfig.title}
                onChange={(e) => setCurrentConfig({ ...currentConfig, title: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Form Subtitle / Instruction Text</label>
              <input
                type="text"
                value={currentConfig.subtitle}
                onChange={(e) => setCurrentConfig({ ...currentConfig, subtitle: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Submit Button Text</label>
                <input
                  type="text"
                  value={currentConfig.buttonText}
                  onChange={(e) => setCurrentConfig({ ...currentConfig, buttonText: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Success Thank-You Message</label>
                <textarea
                  value={currentConfig.successMessage}
                  onChange={(e) => setCurrentConfig({ ...currentConfig, successMessage: e.target.value })}
                  rows={2}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Form Fields Settings (User Requirements: Add/Delete & Dropdown CRUD) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Fields List ({Object.keys(currentConfig.fields || {}).length} Fields)
              </h3>
              <button
                type="button"
                onClick={() => setShowAddFieldModal(true)}
                className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Custom Field
              </button>
            </div>
            
            <div className="space-y-4">
              {Object.entries(currentConfig.fields || {}).map(([key, fieldObj]: [string, any]) => (
                <div key={key} className="p-3.5 bg-white border border-gray-200 rounded-md space-y-3 relative group hover:border-brand-primary/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-gray-500 uppercase flex items-center gap-2">
                      <span>{key}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded uppercase font-semibold">
                        {fieldObj.type || 'text'}
                      </span>
                    </span>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-xs text-gray-600 font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={fieldObj.required}
                          onChange={(e) => {
                            const updatedFields = {
                              ...currentConfig.fields,
                              [key]: { ...fieldObj, required: e.target.checked }
                            };
                            setCurrentConfig({ ...currentConfig, fields: updatedFields });
                          }}
                          className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                        />
                        <span>Required Field</span>
                      </label>

                      {/* Delete Field Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteField(key)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                        title={`Delete field "${key}"`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-gray-600 font-medium mb-0.5">Field Label</label>
                      <input
                        type="text"
                        value={fieldObj.label}
                        onChange={(e) => {
                          const updatedFields = {
                            ...currentConfig.fields,
                            [key]: { ...fieldObj, label: e.target.value }
                          };
                          setCurrentConfig({ ...currentConfig, fields: updatedFields });
                        }}
                        className="w-full rounded border border-gray-300 px-2.5 py-1.5 text-xs focus:border-brand-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-600 font-medium mb-0.5">Placeholder Text</label>
                      <input
                        type="text"
                        value={fieldObj.placeholder}
                        onChange={(e) => {
                          const updatedFields = {
                            ...currentConfig.fields,
                            [key]: { ...fieldObj, placeholder: e.target.value }
                          };
                          setCurrentConfig({ ...currentConfig, fields: updatedFields });
                        }}
                        className="w-full rounded border border-gray-300 px-2.5 py-1.5 text-xs focus:border-brand-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Dropdown Options CRUD (User Requirement: CRUD Dropdown Options) */}
                  {fieldObj.type === 'select' && (
                    <div className="bg-gray-50/80 p-3 rounded border border-gray-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-bold text-brand-primary uppercase tracking-wider flex items-center gap-1.5">
                          <Tag className="w-3 h-3" />
                          <span>Dropdown Options ({(fieldObj.options || []).length})</span>
                        </label>
                      </div>

                      {/* Options Tags Repeater */}
                      <div className="flex flex-wrap gap-1.5">
                        {(fieldObj.options || []).map((opt: string, idx: number) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 bg-white border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded shadow-xs"
                          >
                            <span>{opt}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveOptionFromField(key, idx)}
                              className="text-gray-400 hover:text-red-600 ml-0.5"
                              title="Delete option"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Add Option Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          id={`new-opt-${key}`}
                          placeholder="Add new dropdown option name..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const val = (e.target as HTMLInputElement).value;
                              handleAddOptionToField(key, val);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                          className="flex-1 rounded border border-gray-300 px-2.5 py-1 text-xs focus:border-brand-primary focus:outline-none bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById(`new-opt-${key}`) as HTMLInputElement;
                            if (el && el.value) {
                              handleAddOptionToField(key, el.value);
                              el.value = '';
                            }
                          }}
                          className="px-3 py-1 bg-brand-primary text-white text-xs font-bold rounded hover:bg-brand-primary/90 transition-colors"
                        >
                          + Add Option
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Live Visual Preview */}
        <div className="lg:col-span-5 space-y-4 sticky top-6">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Eye className="w-4 h-4 text-brand-primary" />
            <span>Live Public Form Preview ({Object.keys(currentConfig.fields || {}).length} Fields)</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border-light shadow-md space-y-5">
            <div className="border-b border-border-light pb-3">
              <h3 className="font-serif text-lg font-bold text-text-primary">{currentConfig.title}</h3>
              <p className="font-sans text-xs text-text-secondary mt-1">{currentConfig.subtitle}</p>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {Object.entries(currentConfig.fields || {}).map(([key, f]: [string, any]) => (
                <div key={key} className="space-y-1">
                  <label className="block font-sans text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                    {f.label} {f.required && <span className="text-red-500">*</span>}
                  </label>
                  {f.type === 'textarea' ? (
                    <textarea
                      disabled
                      rows={2}
                      placeholder={f.placeholder}
                      className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-xs text-gray-400 cursor-not-allowed"
                    />
                  ) : f.type === 'select' ? (
                    <select
                      disabled
                      className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-400 cursor-not-allowed"
                    >
                      <option>{f.placeholder || 'Select option'}</option>
                      {(f.options || []).map((o: string, idx: number) => (
                        <option key={idx}>{o}</option>
                      ))}
                    </select>
                  ) : f.type === 'file' ? (
                    <div className="w-full border-2 border-dashed border-gray-200 rounded p-2.5 text-center text-xs text-gray-400 bg-gray-50">
                      📄 {f.placeholder || 'Drag & drop file or browse'}
                    </div>
                  ) : (
                    <input
                      disabled
                      type="text"
                      placeholder={f.placeholder}
                      className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-400 cursor-not-allowed"
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              disabled
              className="w-full bg-brand-primary text-white font-sans text-xs font-bold py-3 rounded shadow opacity-90 cursor-not-allowed"
            >
              {currentConfig.buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Add Custom Field Modal */}
      {showAddFieldModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 border border-gray-200 shadow-xl relative">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-gray-900">Add New Custom Field</h3>
              <button onClick={() => setShowAddFieldModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddField} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Field ID / Key (Unique CamelCase) *</label>
                <input
                  required
                  type="text"
                  value={newFieldData.key}
                  onChange={(e) => setNewFieldData({ ...newFieldData, key: e.target.value })}
                  placeholder="e.g. gstNumber or preferredLocation"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Field Label *</label>
                <input
                  required
                  type="text"
                  value={newFieldData.label}
                  onChange={(e) => setNewFieldData({ ...newFieldData, label: e.target.value })}
                  placeholder="e.g. GST NUMBER / PREFERRED LOCATION"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Placeholder Text</label>
                <input
                  type="text"
                  value={newFieldData.placeholder}
                  onChange={(e) => setNewFieldData({ ...newFieldData, placeholder: e.target.value })}
                  placeholder="e.g. Enter 15-digit GST details"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Field Type *</label>
                  <select
                    value={newFieldData.type}
                    onChange={(e) => setNewFieldData({ ...newFieldData, type: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                  >
                    <option value="text">Text Input</option>
                    <option value="textarea">Textarea (Multi-line)</option>
                    <option value="number">Number</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone (Tel)</option>
                    <option value="select">Dropdown Select</option>
                    <option value="file">File Upload (PDF/Image/Doc)</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newFieldData.required}
                      onChange={(e) => setNewFieldData({ ...newFieldData, required: e.target.checked })}
                      className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                    />
                    <span>Is Required?</span>
                  </label>
                </div>
              </div>

              {/* If Dropdown Select is chosen in modal */}
              {newFieldData.type === 'select' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Dropdown Options (Comma-Separated)
                  </label>
                  <input
                    type="text"
                    value={newFieldData.optionsInput}
                    onChange={(e) => setNewFieldData({ ...newFieldData, optionsInput: e.target.value })}
                    placeholder="e.g. Option 1, Option 2, Option 3"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddFieldModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded shadow"
                >
                  Add Custom Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
