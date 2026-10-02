import React from "react";

/** Suspense fallback while a code-split page loads. Reserves the viewport so the footer doesn't jump. */
const Loader: React.FC = () => (
  <div className="flex min-h-[60vh] items-center justify-center" role="status">
    <span className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" aria-hidden="true" />
    <span className="sr-only">Loading</span>
  </div>
);

export default Loader;
