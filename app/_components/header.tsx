import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between px-5 pt-6">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="FSW Foods"
          height={0}
          width={0}
          sizes="100vw"
          className="h-8 w-28"
          priority
        />
      </Link>

      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </header>
  );
};

export default Header;
