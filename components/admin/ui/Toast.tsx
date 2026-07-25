"use client";

import React from "react";
import { toast as reactToast, ToastContainer as ReactToastifyContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle2, AlertTriangle, Info, Trash2, Check } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning" | "delete";

export function ToastContainer() {
  return (
    <ReactToastifyContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      toastClassName={() =>
        "relative flex p-4 min-h-16 rounded-xl justify-between overflow-hidden cursor-pointer bg-white/95 backdrop-blur-md border border-gray-100 shadow-xl mb-3 transition-all duration-300 hover:scale-[1.02] font-sans"
      }
      style={{ width: "100%", maxWidth: "420px", zIndex: 99999 }}
    />
  );
}

const CustomToastContent = ({
  title,
  message,
  icon,
  borderClass,
  iconBgClass,
}: {
  title: string;
  message?: string;
  icon: React.ReactNode;
  borderClass: string;
  iconBgClass: string;
}) => (
  <div className={`flex items-start gap-3 w-full border-l-4 ${borderClass} pl-2 py-0.5`}>
    <div className={`p-2 rounded-full ${iconBgClass} shrink-0 mt-0.5 shadow-sm`}>
      {icon}
    </div>
    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
      <h4 className="text-sm font-bold text-gray-900 leading-snug tracking-tight font-serif">
        {title}
      </h4>
      {message && (
        <p className="text-xs font-normal text-gray-600 leading-relaxed font-sans line-clamp-2">
          {message}
        </p>
      )}
    </div>
  </div>
);

export function useToast() {
  return {
    success: (title: string, message?: string) => {
      reactToast(
        <CustomToastContent
          title={title}
          message={message}
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          borderClass="border-emerald-500"
          iconBgClass="bg-emerald-50"
        />,
        {
          progressClassName: "bg-emerald-500",
        }
      );
    },
    error: (title: string, message?: string) => {
      reactToast(
        <CustomToastContent
          title={title}
          message={message}
          icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
          borderClass="border-rose-500"
          iconBgClass="bg-rose-50"
        />,
        {
          progressClassName: "bg-rose-500",
        }
      );
    },
    info: (title: string, message?: string) => {
      reactToast(
        <CustomToastContent
          title={title}
          message={message}
          icon={<Info className="w-5 h-5 text-sky-600" />}
          borderClass="border-sky-500"
          iconBgClass="bg-sky-50"
        />,
        {
          progressClassName: "bg-sky-500",
        }
      );
    },
    warning: (title: string, message?: string) => {
      reactToast(
        <CustomToastContent
          title={title}
          message={message}
          icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
          borderClass="border-amber-500"
          iconBgClass="bg-amber-50"
        />,
        {
          progressClassName: "bg-amber-500",
        }
      );
    },
    delete: (title: string, message?: string) => {
      reactToast(
        <CustomToastContent
          title={title}
          message={message}
          icon={<Trash2 className="w-5 h-5 text-red-600" />}
          borderClass="border-red-600"
          iconBgClass="bg-red-50"
        />,
        {
          progressClassName: "bg-red-600",
        }
      );
    },
  };
}
