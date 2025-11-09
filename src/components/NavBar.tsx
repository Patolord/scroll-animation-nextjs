import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <nav className="fixed w-screen px-8 py-6 flex items-center gap-8 will-change-opacity z-2">
      <div className="flex flex-1 items-center gap-12">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <Link
          href="/"
          className="normal-case font-host-grotesk text-2xl flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={32}
            height={32}
            className="w-8"
          />
          Teacher Gamer Revolution
        </Link>
      </div>
      <div className="flex flex-1 gap-6 justify-end">
        <Button>
          <Link href="/training">Training</Link>
        </Button>
        <Button variant="secondary">
          <Link href="/buy-books">Buy Books</Link>
        </Button>
      </div>
    </nav>
  );
}
