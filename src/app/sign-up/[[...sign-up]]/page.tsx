import Image from "next/image";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 ">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/matatu.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-20 md:py-12">
        <SignUp />
      </div>
    </div>
  );
}
