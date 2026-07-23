import { PreloaderUI } from "@/components/common/GlobalPreloader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FDF8F2] pointer-events-auto">
      <PreloaderUI />
    </div>
  );
}
