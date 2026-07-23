import { login } from "../actions/auth";
import { LockKeyhole, AlertCircle } from "lucide-react";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const resolvedParams = await searchParams;
  
  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center">
            <LockKeyhole className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary font-lora">
          Enterprise Admin
        </h2>
        <p className="mt-2 text-center text-sm text-text-secondary font-inter">
          Sign in to access the control panel
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-border-light">
          {resolvedParams.error && resolvedParams.error !== "{}" && (
            <div className="mb-4 bg-red-50 p-4 rounded-md flex items-center gap-3 border border-red-200">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{resolvedParams.error}</p>
            </div>
          )}
          
          <form className="space-y-6" action={login}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-1 font-inter"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-border-light rounded-md shadow-sm placeholder-text-secondary focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm bg-white text-text-primary"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-primary mb-1 font-inter"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-border-light rounded-md shadow-sm placeholder-text-secondary focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm bg-white text-text-primary"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-[#60131B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors font-inter"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
