import { useEffect, useState, useRef } from "react";
import { fetchNews } from "../api/newsApi";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    source: "",
    date: "",
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

  useEffect(() => {
    getNews();
  }, []);

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
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      >
        <option value="">All Categories</option>
        <option value="technology">Technology</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
      </select>

      <select
        value={filters.source}
        onChange={(e) => setFilters({ ...filters, source: e.target.value })}
        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      >
        <option value="">All Sources</option>
        <option value="bbc-news">BBC News</option>
        <option value="cnn">CNN</option>
        <option value="the-guardian">The Guardian</option>
      </select>

      <input
        type="date"
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />
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

  // return(
  //   <div className="max-w-6xl mx-auto px-4 py-6">
  //     <h1 className="text-3xl font-bold text-center mb-6">Search News</h1>

  //     {/* Search Input */}
  //     <input
  //       type="text"
  //       placeholder="Search articles..."
  //       value={query}
  //       onChange={(e) => setQuery(e.target.value)}
  //       className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition mb-4"
  //     />

  //     {/* Filter Options */}
  //     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
  //       <select
  //         value={filters.category}
  //         onChange={(e) => setFilters({ ...filters, category: e.target.value })}
  //         className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
  //       >
  //         <option value="">All Categories</option>
  //         <option value="technology">Technology</option>
  //         <option value="business">Business</option>
  //         <option value="sports">Sports</option>
  //       </select>

  //       <select
  //         value={filters.source}
  //         onChange={(e) => setFilters({ ...filters, source: e.target.value })}
  //         className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
  //       >
  //         <option value="">All Sources</option>
  //         <option value="bbc-news">BBC News</option>
  //         <option value="cnn">CNN</option>
  //         <option value="the-guardian">The Guardian</option>
  //       </select>

  //       <input
  //         type="date"
  //         value={filters.date}
  //         onChange={(e) => setFilters({ ...filters, date: e.target.value })}
  //         className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
  //       />
  //     </div>

  //     {/* Articles List */}
  //     {loading ? (
  //       <p className="text-center text-lg font-semibold">Loading...</p>
  //     ) : (
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {articles.map((article, index) => (
  //           <NewsCard key={index} article={article} />
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default Home;
