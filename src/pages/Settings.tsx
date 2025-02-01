import { useEffect, useState } from "react";
import { useNewsContext } from "../context/NewsContext";

const categories: string[] = ["Technology", "Business", "Sports", "Health"];
const authors: string[] = ["Dominic Booth", "Edward Helmore", "Shivam Verma"];

const Settings = () => {
  const newsContext = useNewsContext(); 

  const [selectedCategories, setSelectedCategories] = useState<string[]>(newsContext?.preferredCategories || []);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(newsContext?.preferredAuthors || []);

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    const storedAuthors = localStorage.getItem("authors");

    if (storedCategories) setSelectedCategories(JSON.parse(storedCategories));
    if (storedAuthors) setSelectedAuthors(JSON.parse(storedAuthors));
  }, []);

  if (!newsContext) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const { setPreferredCategories, setPreferredAuthors } = newsContext;

  const toggleSelection = (list: string[], setList: (items: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleSavePreferences = () => {
    setPreferredCategories(selectedCategories);
    setPreferredAuthors(selectedAuthors);

    localStorage.setItem("categories", JSON.stringify(selectedCategories));
    localStorage.setItem("authors", JSON.stringify(selectedAuthors));

    alert("Preferences saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Settings</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
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
