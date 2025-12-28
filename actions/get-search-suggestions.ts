"use server";

import { prisma } from "@/lib/prisma";

export async function getSearchSuggestions(query: string) {
  // 1. Don't search for single letters (save performance)
  if (!query || query.length < 2) return [];

  // 2. Find matching products (limit to 5 for speed)
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { category: { name: { contains: query, mode: "insensitive" } } },
      ],
    },
    select: {
      id: true,
      name: true,
      category: {
        select: { name: true }
      }
    },
    take: 5,
  });

  return products;
}