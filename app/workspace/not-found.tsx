import Link from "next/link";
import illustration from "@/public/404.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full">
      <Image
        src={illustration}
        alt="404 Image"
        className="size-70 my-8 mx-auto "
      />
      <div className="flex items-center justify-center flex-col">
        <p className="mx-auto text-center font-medium">
          We could not find the page you are looking for
        </p>
        <Link href={"/workspace"} className="mx-auto">
          <Button variant={"outline"}>Back to workspace</Button>
        </Link>
      </div>
    </div>
  );
}
