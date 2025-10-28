import { BookIcon, RouteIcon, ShredderIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

export function EmptyDemo() {
  return (
    <Empty className="border mt-5">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShredderIcon />
        </EmptyMedia>
        <EmptyTitle>You currently have no Resumé&apos;s</EmptyTitle>
        <EmptyDescription>
          Create or Upload a resumé to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Link href={"/workspace/cv/create"}>
            <Button size="sm">Upload a resumé</Button>
          </Link>
          <Button variant="outline" size="sm">
            <BookIcon className="opacity-72" />
            Create a new resumé
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
