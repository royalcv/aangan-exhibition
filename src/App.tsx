import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, m } from "motion/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Loader from "./components/ui/loder";
import SiteLayout from "./components/site/SiteLayout";
import MotionProvider from "./design/MotionProvider";
import { pageTransition } from "./design/motion";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// The gallery is a self-contained feature, so it's code-split from the shell.
const GalleryPage = lazy(() => import("./features/gallery").then((module) => ({ default: module.GalleryPage })));

const queryClient = new QueryClient();

/** After the outgoing page has faded, reset scroll and move focus to <main> for keyboard and screen-reader users. */
const resetForNewPage = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.getElementById("main")?.focus({ preventScroll: true });
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={resetForNewPage}>
      <m.main
        id="main"
        tabIndex={-1}
        key={location.pathname}
        className="flex-1 outline-none"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense fallback={<Loader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/videos" element={<GalleryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </m.main>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <MotionProvider>
            <Toaster />
            <Sonner />

            <BrowserRouter>
              <SiteLayout>
                <AnimatedRoutes />
              </SiteLayout>
            </BrowserRouter>
          </MotionProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
