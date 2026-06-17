import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { TransitionProvider } from "./context/TransitionContext";
import TransitionOverlay from "./components/TransitionOverlay";
import ScrollManager from "./components/ScrollManager";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";
import { EASE_LUX } from "./lib/motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE_LUX }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/collections/:collectionId" element={<CollectionPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <TransitionProvider>
      <ScrollManager />
      <TransitionOverlay />
      <Header />
      <AnimatedRoutes />
      <Footer />
    </TransitionProvider>
  );
}
