"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data, status } = useSession();

  const handleSignClick = () => {
    signIn();
  };

  const handleSignOutClick = () => {
    signOut();
  };

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

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {status === "authenticated" ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string}
                      alt={data?.user?.name as string}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button size="icon" onClick={handleSignClick}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-3 rounded-full text-sm font-normal"
            >
              <HomeIcon size={16} />
              <span className="block">Início</span>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-3 rounded-full text-sm font-normal"
                >
                  <ScrollTextIcon size={16} />
                  <span className="block">Meus Pedidos</span>
                </Button>

                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-3 rounded-full text-sm font-normal"
                >
                  <HeartIcon size={16} />
                  <span className="block">Restaurantes Favoritos</span>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator />
          </div>

          {data?.user && (
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-3 rounded-full text-sm font-normal"
              onClick={handleSignOutClick}
            >
              <LogOutIcon size={16} />
              <span className="block">Sair da Conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
