import { Header } from "../../src/components/layout/Header";
import { Footer } from "../../src/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col bg-white shrink-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
