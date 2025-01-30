import React from "react";
import { useParams } from "react-router-dom";

const ArticleDetails = () => {
  const { id } = useParams(); // The article URL is encoded as the id

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Article Details</h1>
      <p>Fetching article details for: {decodeURIComponent(id || "")}</p>
      <a
        href={decodeURIComponent(id || "")}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500"
      >
        Read full article
      </a>
    </div>
  );
};

export default ArticleDetails;
