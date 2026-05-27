import Navbar from "./Navbar";
import Footer from "./Footer";
import WelcomeModal from "./WelcomeModal";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <WelcomeModal />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
