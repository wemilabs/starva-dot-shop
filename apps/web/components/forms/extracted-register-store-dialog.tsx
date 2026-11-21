"use client";

import { Button } from "@starva/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@starva/ui/components/dialog";
import { useState } from "react";
import { RegisterStoreForm } from "./register-store-form";

export function ExtractedRegisterStoreDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Claim Store</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register Store</DialogTitle>
          <DialogDescription>
            Register a new store to get started.
          </DialogDescription>
        </DialogHeader>
        <RegisterStoreForm
          onSuccess={() => setDialogOpen(false)}
          onCloseDialog={() => setDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
