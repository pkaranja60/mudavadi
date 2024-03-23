import Navbar from "@/components/ui/nav";
import Sidebar from "@/components/ui/sidebar";

export default function Layout({ children }: any) {
  return (
    <main className="w-full h-full flex">
      <Sidebar />

      <section className="w-screen h-screen">
        <Navbar />
        {children}
      </section>
    </main>
  );
}
