import React, { useState } from "react";
const NewsCard = ({ article }) => {
    const [likeCount, setLikeCount] = useState(0);
    const handleLike = () => setLikeCount(likeCount + 1);

    return (
      <div className="border p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold">{article.webTitle}</h2>
        <p className="text-gray-600">{article.sectionName} - {new Date(article.webPublicationDate).toLocaleString()}</p>
        <a href={article.webUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 inline-block">Read more</a>
        <div className="flex items-center mt-4">
          <button onClick={handleLike} className="flex items-center text-gray-500 dark:text-gray-300 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
              <path fillRule="evenodd" d="M10 18l-1.45-1.32C4.4 12.36 2 9.28 2 6.3 2 3.42 4.42 1 7.3 1c1.83 0 3.42.92 4.2 2.38C12.28 1.92 13.87 1 15.7 1 18.58 1 21 3.42 21 6.3c0 2.98-2.4 6.06-6.55 10.38L10 18z" clipRule="evenodd" />
            </svg>
            Like
          </button>
          <span className="ml-2 text-gray-500 dark:text-gray-300">{likeCount} {likeCount === 1 ? "like" : "likes"}</span>
        </div>
      </div>
    );
  };

  export default NewsCard;