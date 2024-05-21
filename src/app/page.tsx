import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Button>
          <Link rel="stylesheet" href="/table">Go To Table</Link>
        </Button>
      </div>
    </main>
  );
}
