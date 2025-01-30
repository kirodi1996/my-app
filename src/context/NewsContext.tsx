import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface NewsContextType {
  preferredSources: string[];
  preferredCategories: string[];
  preferredAuthors: string[];
  setPreferredSources: (sources: string[]) => void;
  setPreferredCategories: (categories: string[]) => void;
  setPreferredAuthors: (authors: string[]) => void;
}

export const NewsContext = createContext<NewsContextType | null>(null);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [preferredSources, setPreferredSources] = useState<string[]>([]);
  const [preferredCategories, setPreferredCategories] = useState<string[]>([]);
  const [preferredAuthors, setPreferredAuthors] = useState<string[]>([]);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const storedSources = localStorage.getItem("preferredSources");
    const storedCategories = localStorage.getItem("preferredCategories");
    const storedAuthors = localStorage.getItem("preferredAuthors");

    if (storedSources) setPreferredSources(JSON.parse(storedSources));
    if (storedCategories) setPreferredCategories(JSON.parse(storedCategories));
    if (storedAuthors) setPreferredAuthors(JSON.parse(storedAuthors));
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem("preferredSources", JSON.stringify(preferredSources));
    localStorage.setItem("preferredCategories", JSON.stringify(preferredCategories));
    localStorage.setItem("preferredAuthors", JSON.stringify(preferredAuthors));
  }, [preferredSources, preferredCategories, preferredAuthors]);

  return (
    <NewsContext.Provider
      value={{
        preferredSources,
        preferredCategories,
        preferredAuthors,
        setPreferredSources,
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
