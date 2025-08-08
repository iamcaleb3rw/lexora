import { Footer } from "@/components/homepage/footer";
import Navbar from "@/components/homepage/Navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
