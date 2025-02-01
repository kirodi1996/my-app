export interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    source: string;
    author: string;
    publishedAt: string;
    image: string;
  }

export  interface NewsFilters {
    categories?: string[];
    authors?: string[];
    date?: string;
  }

export interface Article {
  source: {name: string};
  title: string;
  author: string;
  description: string;
  url: string;
  publishedAt: string;
  image: string;
  urlToImage: string;
  webTitle: string;
  fields: {
    byline: string, 
    thumbnail: string
  };
  webUrl: string;
  webPublicationDate: string;
  source_id: string;
  creator: string[];
  link: string;
  pubDate: string;
  image_url: string;
}

export interface ArticleFields {
    source: string;
    title: string;
    author: string;
    description: string;
    url: string;
    publishedAt: string;
    image: string | null;
}