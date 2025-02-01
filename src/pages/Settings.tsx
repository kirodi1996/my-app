import { useEffect, useState } from "react";
import { useNewsContext } from "../context/NewsContext";

const sources = ["BBC News", "CNN", "New York Times", "Reuters"];
const categories = ["Technology", "Business", "Sports", "Health"];
const authors = ["John Doe", "Jane Smith", "Alice Johnson"];

const Settings = () => {
  const newsContext = useNewsContext(); 

  const [selectedSources, setSelectedSources] = useState<string[]>(newsContext?.preferredSources || []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(newsContext?.preferredCategories || []);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(newsContext?.preferredAuthors || []);

  // Load preferences when component mounts
  useEffect(() => {
    const storedSources = localStorage.getItem("sources");
    const storedCategories = localStorage.getItem("categories");
    const storedAuthors = localStorage.getItem("authors");

    if (storedSources) setSelectedSources(JSON.parse(storedSources));
    if (storedCategories) setSelectedCategories(JSON.parse(storedCategories));
    if (storedAuthors) setSelectedAuthors(JSON.parse(storedAuthors));
  }, []);

  // If context is still loading, show a loading message
  if (!newsContext) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const { setPreferredSources, setPreferredCategories, setPreferredAuthors } = newsContext;

  const toggleSelection = (list: string[], setList: (items: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleSavePreferences = () => {
    setPreferredSources(selectedSources);
    setPreferredCategories(selectedCategories);
    setPreferredAuthors(selectedAuthors);

    localStorage.setItem("sources", JSON.stringify(selectedSources));
    localStorage.setItem("categories", JSON.stringify(selectedCategories));
    localStorage.setItem("authors", JSON.stringify(selectedAuthors));

    alert("Preferences saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Settings</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Preferred Sources */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Preferred Sources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sources.map((source) => (
              <label key={source} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSources.includes(source)}
                  onChange={() => toggleSelection(selectedSources, setSelectedSources, source)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                {source}
              </label>
            ))}
          </div>
        </div>

        {/* Preferred Categories */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Preferred Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleSelection(selectedCategories, setSelectedCategories, category)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Preferred Authors */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Preferred Authors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {authors.map((author) => (
              <label key={author} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAuthors.includes(author)}
                  onChange={() => toggleSelection(selectedAuthors, setSelectedAuthors, author)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                {author}
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSavePreferences}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Settings;
