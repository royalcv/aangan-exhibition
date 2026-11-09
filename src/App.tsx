import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, m } from "motion/react";

import Loader from "./components/ui/loder";
import SiteLayout from "./components/site/SiteLayout";
import MotionProvider from "./design/MotionProvider";
import { pageTransition } from "./design/motion";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Home is the usual landing page, so it ships in the main bundle; the other pages are code-split.
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Stalls = lazy(() => import("./pages/Stalls"));
const GalleryPage = lazy(() => import("./features/gallery").then((module) => ({ default: module.GalleryPage })));

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
            <Route path="/stalls" element={<Stalls />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </m.main>
    </AnimatePresence>
  );
};

/**
 * The whole site, without a router or head provider: src/main.tsx wraps it for the browser and
 * src/entry-server.tsx wraps it for build-time pre-rendering.
 */
const App: React.FC = () => (
  <MotionProvider>
    <SiteLayout>
      <AnimatedRoutes />
    </SiteLayout>
  </MotionProvider>
);

export default App;
