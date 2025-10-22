import { useEffect } from "react";
import { clarity } from 'react-microsoft-clarity';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initStorageCheck } from "@/utils/storageCheck";
import Landing from "./pages/Landing";
import CardReaction from "./pages/CardReaction";
import Chat from "./pages/Chat";
import Queue from "./pages/Queue";
import Quiz from "./pages/Quiz";
import Preparation from "./pages/Preparation";
import Loading from "./pages/Loading";
import ArtisticChanneling from "./pages/ArtisticChanneling";
import Recognition from "./pages/Recognition";
import SpecialOffer from "./pages/SpecialOffer";
import Packages from "./pages/Packages";
import Upsell1 from "./pages/Upsell1";
import Upsell2 from "./pages/Upsell2";
import Downsell1 from "./pages/Downsell1";
import Downsell2 from "./pages/Downsell2";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function getBasename(): string {
  if (import.meta.env.VITE_BRANCH_MAIN === 'true') return ''

  if (import.meta.env.MODE === 'development') return ''

  let baseUrl = import.meta.env.VITE_BASE_PATH as string

  const isUpsellRoute = window.location.pathname.includes('/up/')

if (isUpsellRoute) {
  baseUrl = baseUrl + '/up'
}

  return baseUrl
}

const App = () => {

  useEffect(() => {
    // Verifica disponibilidade de storage (silencioso)
    initStorageCheck();
    
    const clarityId = import.meta.env.VITE_CLARITY_ID

    if (!clarityId) return

    clarity.init(clarityId);
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={getBasename()}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/card-reaction" element={<CardReaction />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/preparation" element={<Preparation />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/artistic-channeling" element={<ArtisticChanneling />} />
            <Route path="/recognition" element={<Recognition />} />
            <Route path="/special-offer" element={<SpecialOffer />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/upsell-1" element={<Upsell1 />} />
            <Route path="/upsell-2" element={<Upsell2 />} />
            <Route path="/downsell-1" element={<Downsell1 />} />
            <Route path="/downsell-2" element={<Downsell2 />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider >
  )
}

export default App;
