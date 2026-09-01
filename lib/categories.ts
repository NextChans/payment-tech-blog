export type Category = "regulation" | "infra" | "guide";

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "regulation", label: "규제·정책" },
  { value: "infra", label: "인프라·시스템" },
  { value: "guide", label: "등록·인허가 가이드" },
];

export function categoryLabel(category: Category): string {
  return CATEGORIES.find((c) => c.value === category)?.label ?? category;
}
