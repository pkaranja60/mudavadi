import Navbar from "@/components/ui/nav";
import Sidebar from "@/components/ui/sidebar";

export default function Layout({ children }: any) {
  return (
    <main className="w-full h-screen flex flex-row relative">
      <Sidebar />

      <section className="w-screen h-screen flex flex-col ml-16">
        <Navbar />
        {children}
      </section>
    </main>
  );
}
