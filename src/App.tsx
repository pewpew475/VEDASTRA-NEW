import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import WelcomeScreen from "./Components/Welcome";
import BottomNav from "./Components/Bottom-nav";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const welcomeDurationMs = 6000;

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (showWelcome) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [showWelcome]);

  return (
    <>
      {showWelcome && (
        <WelcomeScreen
          duration={welcomeDurationMs}
          onComplete={() => setShowWelcome(false)}
        />
      )}

      <Navbar />
      <div>
        <Home />
      </div>
      <BottomNav />
      <Footer />
    </>
  );
}

export default App;