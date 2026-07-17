import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShareButtons } from "@/components/share-buttons";
import {
  learn,
  learnBySlug,
  learnHtml,
  formatDate,
} from "@/content/learn";

export function generateStaticParams() {
  return learn.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = learnBySlug(slug);
  if (!entry) return {};
  const canonical = `https://prep.md/learn/${entry.slug}`;
  return {
    title: `${entry.title} — PREP`,
    description: entry.description,
    alternates: { canonical },
    openGraph: {
      title: `${entry.title} — PREP`,
      description: entry.description,
      url: canonical,
      type: "article",
    },
  };
}

export default async function LearnEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = learnBySlug(slug);
  if (!entry) notFound();
  const html = learnHtml(entry.slug);
  const dateLabel =
    entry.kind === "guide"
      ? `Updated: ${formatDate(entry.date)}`
      : `Published: ${formatDate(entry.date)}`;
  const url = `https://prep.md/learn/${entry.slug}`;
  return (
    <div className="wrap">
      <p className="eyebrow">
        <Link href="/learn" className="text-link">
          ← Learn
        </Link>
      </p>
      <p className="learn-date">{dateLabel}</p>
      <article
        className="spec-doc"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <ShareButtons url={url} title={entry.title} text={`${entry.title} — PREP`} />
    </div>
  );
}
