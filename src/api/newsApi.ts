import { Article, NewsArticle, NewsFilters  } from "../types/types";

const NEWSAPI_KEY = "87b4a522feef477b8a46eeb741167b97";
const GUARDIAN_KEY = "8fe973e7-d8ab-4bd1-b769-b89ee087218f";
const NEWSDATA_KEY = "pub_67027274bc8289556a141c45f7f2b99f48fd4";

const fetchData = async (url: string): Promise<any|null> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return null;
  }
};

// Fetch articles from NewsAPI
const fetchNewsAPI = async (query: string = '', filters: NewsFilters = {}): Promise<NewsArticle[]> => {
  let url = `https://newsapi.org/v2/top-headlines?apiKey=${NEWSAPI_KEY}&country=de`;
  if(query) url+= `&q=+${query}`;
  if (filters.categories.length) url += `&category=${filters.categories.join(',')}`;
  if (filters.date) url += `&from=${filters.date}&to=${filters.date}`;

  const data = await fetchData(url);
  return data?.articles?.map((article: Article) => ({
    source: article.source.name,
    title: article.title,
    author: article.author,
    description: article.description,
    url: article.url,
    publishedAt: article.publishedAt,
    image: article.urlToImage,
  })) || [];
};

// Fetch articles from The Guardian API
const fetchGuardianAPI = async (query: string, filters: NewsFilters): Promise<NewsArticle[]> => {
  let url = `https://content.guardianapis.com/search?api-key=${GUARDIAN_KEY}&show-fields=thumbnail,byline`;

  if(query) url+= `&q=${query}`;
  if (filters.categories.length) url += `&section=${filters.categories.join(',')}`;
  if (filters.date) url += `&from-date=${filters.date}`;

  const data = await fetchData(url);
  return data?.response?.results?.map((article: Article) => ({
    source: "The Guardian",
    title: article.webTitle,
    author: article.fields?.byline || "Unknown",
    description: "",
    url: article.webUrl,
    publishedAt: article.webPublicationDate,
    image: article.fields?.thumbnail || "",
  })) || [];
};


const fetchNewsDataIO = async (query: string, filters: NewsFilters): Promise<NewsArticle[]> => {
  let url = `https://newsdata.io/api/1/news?apikey=${NEWSDATA_KEY}`;

  if(query) url+= `&q=${query}`;
  if (filters.categories.length) url += `&category=${filters.categories.join(',')}`;

  const data = await fetchData(url);

  if (data?.results?.message) {
    return [];
  }

  return data?.results?.map((article: Article) => ({
    source: article.source_id,
    title: article.title,
    author: article.creator?.join(", ") || "Unknown",
    description: article.description,
    url: article.link,
    publishedAt: article.pubDate,
    image: article.image_url,
  })) || [];
};


export const fetchNews = async (
  query: string,
  filters: { preferredCategories?: string[]; preferredSources?: string[]; authors?: string[] } = {}
): Promise<NewsArticle[]> => {
  const [newsAPI, guardian, newsData] = await Promise.all([
    fetchNewsAPI(query, filters),
    fetchGuardianAPI(query, filters),
    fetchNewsDataIO(query, filters),
  ]);

  let allArticles: NewsArticle[] = [...newsAPI, ...guardian, ...newsData];

  if (filters.authors && filters.authors.length > 0) {
    allArticles = allArticles.filter((article) =>
      article.author && filters.authors.includes(article.author)
    );
  }

  return allArticles;
};
