"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@starva/ui/components/breadcrumb";
import { Fragment, useEffect, useState } from "react";
import {
  type Crumb,
  useBreadcrumbs,
} from "@/components/context/breadcrumbs-context";

export function NavBreadcrumbs({ base }: { base: Crumb[] }) {
  const { crumbs } = useBreadcrumbs();
  const [mounted, setMounted] = useState(false);
  const all = [...base, ...crumbs];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {all.map((c, idx) => (
          <Fragment key={`${c.label}-${c.href ?? "page"}`}>
            <BreadcrumbItem>
              {c.href ? (
                <BreadcrumbLink
                  href={c.href}
                  className="hover:underline line-clamp-1"
                >
                  {c.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="line-clamp-1">
                  {c.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {idx !== all.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
