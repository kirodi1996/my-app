import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface NewsContextType {
  preferredCategories: string[];
  preferredAuthors: string[];
  setPreferredCategories: (categories: string[]) => void;
  setPreferredAuthors: (authors: string[]) => void;
}

export const NewsContext = createContext<NewsContextType | null>(null);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [preferredCategories, setPreferredCategories] = useState<string[]>([]);
  const [preferredAuthors, setPreferredAuthors] = useState<string[]>([]);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    const storedAuthors = localStorage.getItem("authors");

    if (storedCategories) setPreferredCategories(JSON.parse(storedCategories));
    if (storedAuthors) setPreferredAuthors(JSON.parse(storedAuthors));
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(preferredCategories));
    localStorage.setItem("authors", JSON.stringify(preferredAuthors));
  }, [preferredCategories, preferredAuthors]);

  return (
    <NewsContext.Provider
      value={{
        preferredCategories,
        preferredAuthors,
        setPreferredCategories,
        setPreferredAuthors,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  return useContext(NewsContext);
};
