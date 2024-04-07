import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <section className="bg-gray-900 text-white h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Data-Driven Decisions:
            <span className="sm:block">
              Bus Tally System Improves Efficiency
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Blind decision-making stops with bus tally systems. They gather
            crucial ridership data to optimize routes, schedules, and resource
            allocation. This translates to a smoother, more efficient bus system
            for all.
          </p>

          <div className="mt-8">
            <SignInButton>
              <Button className="w-full md:w-1/4  h-14 bg-[#fdb255] hover:bg-slate-400">
                Sign in with Clerk
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>
    </section>
  );
}
