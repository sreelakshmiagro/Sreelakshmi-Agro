'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveFormConfig } from '@/app/(admin)/admin/actions/forms';
import { useToast } from '@/components/admin/ui/Toast';
import { Save, Briefcase, Users, Mail, Settings, Eye, CheckCircle2 } from 'lucide-react';

interface FormTemplatesClientProps {
  initialConfigs: Record<string, any>;
}

const DEFAULT_CAREERS_CONFIG = {
  title: 'Submit Job Application',
  subtitle: 'Fill in details and upload your CV (PDF or DOCX format only).',
  buttonText: 'Submit Application',
  successMessage: 'Thank you for applying. Our talent acquisition team will review your resume and experience matches, and contact you if there is a match.',
  fields: {
    fullName: { label: 'FULL NAME', placeholder: 'e.g., Robert Frost', required: true },
    positionApplied: { label: 'POSITION APPLIED FOR', placeholder: 'Select Open Opening', required: true },
    phone: { label: 'MOBILE PHONE NUMBER', placeholder: '10-digit number', required: true },
    email: { label: 'EMAIL ADDRESS', placeholder: 'you@domain.com', required: true },
    experienceYears: { label: 'TOTAL YEARS OF EXPERIENCE', placeholder: '0', required: true },
    qualification: { label: 'HIGHEST EDUCATIONAL QUALIFICATION', placeholder: 'e.g., B.Tech Food Tech / MBA Operations', required: true },
    currentCompany: { label: 'CURRENT COMPANY (OPTIONAL)', placeholder: 'e.g., FMCG Corp', required: false },
    expectedSalary: { label: 'EXPECTED SALARY (OPTIONAL)', placeholder: 'e.g., 6,000,000 INR', required: false },
    noticePeriod: { label: 'NOTICE PERIOD (OPTIONAL)', placeholder: 'e.g., Immediate / 30 Days', required: false },
    resumeUpload: { label: 'UPLOAD CV/RESUME', placeholder: 'Drag & drop file or browse (PDF, DOCX Max 5MB)', required: true },
    coverLetter: { label: 'COVER LETTER / SUMMARY (OPTIONAL)', placeholder: 'Tell us why you are a good fit for this position...', required: false },
  }
};

const DEFAULT_DISTRIBUTOR_CONFIG = {
  title: 'Distributor Inquiry Form',
  subtitle: 'Please provide accurate commercial details to accelerate the onboarding check.',
  buttonText: 'Submit Partner Inquiry',
  successMessage: 'Thank you for your interest in Sreelakshmi Agro Industries. Our business development team will review your details and contact you within 24–48 hours.',
  fields: {
    companyName: { label: 'COMPANY NAME', placeholder: 'e.g., Sreelakshmi Distributors', required: true },
    contactPerson: { label: 'CONTACT PERSON NAME', placeholder: 'e.g., John Doe', required: true },
    phone: { label: 'MOBILE PHONE NUMBER', placeholder: '10-digit number', required: true },
    whatsapp: { label: 'WHATSAPP NUMBER (OPTIONAL)', placeholder: '10-digit number', required: false },
    email: { label: 'EMAIL ADDRESS', placeholder: 'info@company.com', required: true },
    state: { label: 'STATE', placeholder: 'Select an option', required: true },
    district: { label: 'DISTRICT', placeholder: 'Select an option', required: true },
    city: { label: 'CITY / TOWN', placeholder: 'e.g., City Center', required: true },
    businessType: { label: 'BUSINESS TYPE', placeholder: 'Select an option', required: true },
    yearsInBusiness: { label: 'YEARS IN BUSINESS', placeholder: '0', required: true },
    expectedOrderVolume: { label: 'EXPECTED ORDER VOLUME', placeholder: 'Select an option', required: true },
    currentProducts: { label: 'CURRENT BRANDS / PRODUCTS HANDLED', placeholder: 'e.g., Brand X Flour, Brand Y Rice', required: false },
    message: { label: 'ADDITIONAL MESSAGE / ENQUIRIES', placeholder: 'Tell us about your distribution footprint...', required: false },
  }
};

const DEFAULT_CONTACT_CONFIG = {
  title: 'Send Us a Quick Message',
  subtitle: 'We generally respond to messages within 24 business hours.',
  buttonText: 'Send Message →',
  successMessage: 'Thank you for contacting us. Our operations team will get in touch with you shortly.',
  fields: {
    name: { label: 'FULL NAME', placeholder: 'e.g., Jane Smith', required: true },
    phone: { label: 'MOBILE NUMBER', placeholder: '10-digit number', required: true },
    email: { label: 'EMAIL ADDRESS', placeholder: 'you@email.com', required: true },
    subject: { label: 'SUBJECT', placeholder: 'e.g., Pricing Inquiry / Feedback', required: true },
    message: { label: 'YOUR MESSAGE', placeholder: 'Provide complete details to help us assist you...', required: true },
  }
};

export function FormTemplatesClient({ initialConfigs }: FormTemplatesClientProps) {
  const router = useRouter();
  const toast = useToast();
  const [activeFormTab, setActiveFormTab] = useState<'careers' | 'distributor' | 'contact'>('careers');
  const [isSaving, setIsSaving] = useState(false);

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
      toast.success('Form template and field labels updated successfully!');
      router.refresh();
    } catch (err: any) {
      toast.error('Failed to save form config', err.message);
    } finally {
      setIsSaving(false);
    }
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
              <p className="text-xs text-gray-500">Edit titles, subtitles, placeholders, and field visibility</p>
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white rounded-md hover:bg-brand-primary/90 text-sm font-semibold disabled:opacity-50 shadow-sm"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Form Changes'}
            </button>
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

          {/* Form Fields Settings */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Field Labels & Placeholders</h3>
            
            <div className="space-y-4">
              {Object.entries(currentConfig.fields || {}).map(([key, fieldObj]: [string, any]) => (
                <div key={key} className="p-3 bg-white border border-gray-200 rounded-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-gray-500 uppercase">{key}</span>
                    <label className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
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
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Live Visual Preview */}
        <div className="lg:col-span-5 space-y-4 sticky top-6">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Eye className="w-4 h-4 text-brand-primary" />
            <span>Live Public Form Preview</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border-light shadow-md space-y-5">
            <div className="border-b border-border-light pb-3">
              <h3 className="font-serif text-lg font-bold text-text-primary">{currentConfig.title}</h3>
              <p className="font-sans text-xs text-text-secondary mt-1">{currentConfig.subtitle}</p>
            </div>

            <div className="space-y-3">
              {Object.entries(currentConfig.fields || {}).slice(0, 5).map(([key, f]: [string, any]) => (
                <div key={key} className="space-y-1">
                  <label className="block font-sans text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                    {f.label} {f.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    disabled
                    type="text"
                    placeholder={f.placeholder}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-400 cursor-not-allowed"
                  />
                </div>
              ))}
              {Object.keys(currentConfig.fields || {}).length > 5 && (
                <p className="text-[11px] text-gray-400 italic text-center pt-1">+ {Object.keys(currentConfig.fields).length - 5} more fields enabled</p>
              )}
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
    </div>
  );
}
