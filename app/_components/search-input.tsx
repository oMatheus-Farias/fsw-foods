"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) return;

    router.push(`restaurants?search=${search}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar Restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button type="submit" size="icon">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
