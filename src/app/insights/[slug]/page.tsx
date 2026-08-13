import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getArticleBySlug, getAllArticleSlugs } from '@/data/insights';
import '@/styles/components/insights.css';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} — MindStocs Studio`,
    description: article.description,
    openGraph: {
      title: `${article.title} | MindStocs Studio`,
      description: article.description,
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content">
        <article className="article-page">
          <div className="container container--narrow">
            <header className="article-header">
              <div className="article-header__meta">
                <span>{article.category}</span>
                <span>•</span>
                <span>{article.readingTime}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>
              <h1 className="article-header__title">{article.title}</h1>
              <p className="article-header__author">Written by: {article.author}</p>
            </header>

            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
