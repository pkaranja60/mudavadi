import BottomNavbar from "@/components/BottomNavbar";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: any) {
  return (
    <main className="min-w-max min-h-max">
      <Navbar />
      <div className="max-w-screen-2xl mx-5 md:mx-14 xl:mx-auto mt-20">{children}</div>

      <BottomNavbar />
    </main>
  );
}
