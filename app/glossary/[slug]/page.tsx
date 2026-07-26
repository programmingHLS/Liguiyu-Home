import { notFound } from "next/navigation";
import { getTermBySlug, getAllSlugs } from "../data";
import TermDetail from "./term-detail";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const result = getTermBySlug(slug);
    if (!result) return { title: "术语未找到" };
    return {
      title: `${result.term.name} ${result.term.en} · 术语图鉴`,
      description: result.term.explanation.slice(0, 120),
    };
  });
}

export default async function TermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = getTermBySlug(slug);
  if (!result) notFound();

  return <TermDetail term={result.term} category={result.category} />;
}
