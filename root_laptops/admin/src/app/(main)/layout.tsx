import { Toaster } from "@/shared/components/ui/toaster";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}