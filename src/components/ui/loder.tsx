import React from "react";
import aanganLogo from "@/assets/aangan-logo.webp";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-[100px] animate-float" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/20 blur-[100px] animate-float-reverse" />

      <div className="relative flex flex-col items-center gap-4">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 rounded-full border-2 border-white/10" />
          <span
            className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-secondary"
            style={{ animationDuration: '1s' }}
          />
          <div className="absolute inset-0 rounded-full bg-primary/25 blur-lg animate-glow-pulse" />
          <img
            src={aanganLogo}
            alt="Aangan Logo"
            className="relative h-10 w-10 rounded-full object-contain"
          />
        </div>
        <p className="text-sm font-medium tracking-wide text-muted-foreground">Loading Aangan Exhibition…</p>
      </div>
    </div>
  );
};

export default Loader;
