"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@starva/ui/components/input-group";
import { Kbd } from "@starva/ui/components/kbd";
import { SearchIcon } from "lucide-react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export const NotFoundRouteForm = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNavigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const route = inputRef.current?.value.trim();

    if (!route) return;

    const normalizedRoute = route.startsWith("/") ? route : `/${route}`;

    router.push(normalizedRoute as Route);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <form className="w-full" onSubmit={handleNavigate}>
      <InputGroup className="mx-auto sm:w-3/4">
        <InputGroupInput
          ref={inputRef}
          placeholder="Try searching for pages..."
          className="placeholder:text-sm"
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>/</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};
