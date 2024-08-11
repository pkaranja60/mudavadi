import BottomNavbar from "@/components/ui/bottomnav";
import Navbar from "@/components/ui/nav";
import Sidebar from "@/components/ui/sidebar";

export default function Layout({ children }: any) {
  return (
    <main className="min-w-max min-h-max">
      {/* <Sidebar /> */}
      <Navbar />
      <div className="max-w-screen-2xl mx-auto mt-20">{children}</div>

      <BottomNavbar />
    </main>
  );
}
