"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@starva/ui/components/dialog";
import { usePathname, useRouter } from "next/navigation";
import { SignInForm } from "@/components/forms/signin-form";
import { Logo } from "@/components/logo";

export default function SignInModal() {
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = pathname === "/sign-in";

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && router.back()}>
      <DialogContent
        className="sm:max-w-[425px] z-70"
        aria-describedby={undefined}
      >
        <DialogHeader className="hidden">
          <DialogTitle className="self-center">
            <Logo />
          </DialogTitle>
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}
