import { Footer } from "@/components/homepage/footer";
import Hero from "@/components/homepage/hero";
import Navbar from "@/components/homepage/Navbar";
import Steps from "@/components/homepage/steps";
import Trusted from "@/components/homepage/trusted";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  return (
    <div>
      <Hero />
      <Trusted />
      <Steps />
    </div>
  );
}
