// components/DevToArticles.tsx
import React from 'react';

async function getArticles() {
  const res = await fetch('https://dev.to/api/articles?per_page=3&tag=javascript', {
    next: { revalidate: 3600 } // Se actualiza cada hora para no saturar
  });
  return res.json();
}

export default async function DevToArticles() {
  const articles = await getArticles();

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold mb-6">Artículos recomendados (vía Dev.to)</h3>
      <div className="grid gap-4">
        {articles.map((article: any) => (
          <a key={article.id} href={article.url} target="_blank" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100">
            <h4 className="font-semibold text-gray-800">{article.title}</h4>
            <p className="text-sm text-gray-500">{article.readable_publish_date}</p>
          </a>
        ))}
      </div>
    </section>
  );
}