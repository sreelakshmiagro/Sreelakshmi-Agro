import React, { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor={id}
          className="font-sans text-xs font-semibold text-text-secondary uppercase tracking-wider"
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full bg-white border rounded-md px-4 py-3 font-sans text-sm text-text-primary transition-all duration-200 placeholder:text-text-tertiary focus:border-brand-primary ${
            error
              ? "border-red-500 focus:ring-4 focus:ring-red-500/10 focus:border-red-500"
              : "border-border-light focus:ring-4 focus:ring-brand-primary/10"
          } ${className}`}
          {...props}
        />
        {error && (
          <span id={`${id}-error`} role="alert" className="font-sans text-xs text-red-600 font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
