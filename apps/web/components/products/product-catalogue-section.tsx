"use client";

import type { Product } from "@starva/db/schema";
import { FilteredProducts } from "@/components/products/filtered-products";

type ProductWithOrg = Product & {
  organization?: {
    id: string;
    name: string;
    logo: string | null;
    slug: string;
    metadata: string | null;
  } | null;
};

type ProductCatalogueSectionProps = {
  data: ProductWithOrg[];
  defaultStatus?: string;
};

export function ProductCatalogueSection({
  data,
  defaultStatus,
}: ProductCatalogueSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
      <FilteredProducts data={data} defaultStatus={defaultStatus} />
    </div>
  );
}
