import { useEffect, useState, useRef } from "react";
import { fetchNews } from "../api/newsApi";
import NewsCard from "../components/NewsCard";
import { NewsArticle } from "../types/types";

const categories = ["Technology", "Business", "Sports", "Health"];

const Home = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  
  const [filters, setFilters] = useState(() => { //TODO typecast
    return {
      categories: JSON.parse(localStorage.getItem("categories") || "[]"),
      sources: JSON.parse(localStorage.getItem("sources") || "[]"),
      date: "",
      authors: JSON.parse(localStorage.getItem("authors") || "[]"),
    };
  });

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const getNews = async () => {
    setLoading(true);
    try {
      const newsData = await fetchNews(query, filters);
      setArticles(newsData);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {

    // Clear the previous timeout and set a new one
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set a new debounce timeout
    debounceRef.current = setTimeout(() => {
        getNews();
    }, 300);

    // Clean up the timeout on unmount or query change
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };

  }, [query, filters]);

  const updateFilters = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    localStorage.setItem(key, JSON.stringify(value));
  };

  const toggleCheckbox = (key: string, value: string) => {
    const updatedList = filters[key].includes(value)
      ? filters[key].filter((item: string) => item !== value)
      : [...filters[key], value];

    updateFilters(key, updatedList);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-16">
    <h1 className="text-3xl font-bold text-center mb-6">Search News</h1>

    {/* Search Input */}
    <input
      type="text"
      placeholder="Search articles..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition mb-4"
    />

    {/* Filters */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Preferred Categories (Checkboxes) */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <div className="grid grid-cols-1 gap-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => toggleCheckbox("categories", category)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Date</h2>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => updateFilters("date", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>
        </div>

    {/* Show Loading Spinner */}
    {loading ? (
      <div className="flex justify-center items-center py-10">
        <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    )}
  </div>

  )
};

export default Home;
