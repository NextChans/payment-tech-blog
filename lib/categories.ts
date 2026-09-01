export type Category = "regulation" | "infra";

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "regulation", label: "규제·정책" },
  { value: "infra", label: "인프라·시스템" },
];

export function categoryLabel(category: Category): string {
  return CATEGORIES.find((c) => c.value === category)?.label ?? category;
}
