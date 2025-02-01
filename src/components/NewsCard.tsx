import { ArticleFields } from "../types/types";

const NewsCard = ({ article }: { article: ArticleFields }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg mb-4 transition-transform transform hover:scale-105">
  {/* Title */}
  <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{article.title}</h2>

  {/* Source & Date */}
  <p className="text-sm text-gray-500 mt-1">
    {article.source} • {new Date(article.publishedAt).toLocaleDateString()}
  </p>

  {/* Image (Only if available) */}
  {article.image && (
    <img
      src={article.image}
      alt="news"
      className="w-full h-48 object-cover mt-3 rounded-lg"
    />
  )}

  {/* Description */}
  <p className="mt-3 text-gray-700 text-sm line-clamp-3">{article.description}</p>

  {/* Read More Button */}
  <a
    href={article.url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 font-semibold mt-3 inline-block hover:underline"
  >
    Read More →
  </a>
</div>
  );
};

export default NewsCard;