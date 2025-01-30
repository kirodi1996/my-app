import { useState } from "react";
import { useNewsContext } from "../context/NewsContext";

const sources = ["BBC News", "CNN", "New York Times", "Reuters"];
const categories = ["Technology", "Business", "Sports", "Health"];
const authors = ["John Doe", "Jane Smith", "Alice Johnson"];

const Settings = () => {
  const newsContext = useNewsContext();
  if (!newsContext) return <p className="text-center text-gray-500">Loading...</p>;

  const {
    preferredSources,
    preferredCategories,
    preferredAuthors,
    setPreferredSources,
    setPreferredCategories,
    setPreferredAuthors,
  } = newsContext;

  const toggleSelection = (list: string[], setList: (items: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
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
                  checked={preferredSources.includes(source)}
                  onChange={() => toggleSelection(preferredSources, setPreferredSources, source)}
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
                  checked={preferredCategories.includes(category)}
                  onChange={() => toggleSelection(preferredCategories, setPreferredCategories, category)}
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
                  checked={preferredAuthors.includes(author)}
                  onChange={() => toggleSelection(preferredAuthors, setPreferredAuthors, author)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                {author}
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={() => alert("Preferences Saved!")}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Settings;
