"use client"; // 👈 Add this at the top

import React, { useEffect, useState } from "react";
import { fetchNews } from "../utils/fetchNews";
import NewsCard from "@/components/NewsCard";
import '../app/globals.css';

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const getNews = async () => {
      try {
        const data = await fetchNews();
        setNews(data.response.results);
        setFilteredNews(data.response.results);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again.");
      }
    };
    getNews();
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  useEffect(() => {
    let filtered = [...news];
    
    if (selectedDate) {
      filtered = filtered.filter(article => {
        const articleDate = new Date(article.webPublicationDate).toISOString().split("T")[0];
        return articleDate === selectedDate;
      });
    }

    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.webPublicationDate) - new Date(a.webPublicationDate));
    } else {
      filtered.sort((a, b) => new Date(a.webPublicationDate) - new Date(b.webPublicationDate));
    }
    
    setFilteredNews(filtered);
  }, [selectedDate, sortOrder, news]);

  return (
    <div className={isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-4xl font-bold text-center w-full text-gradient">Latest News</h1>
        <button onClick={toggleTheme} className=" rounded-full border border-gray-100 dark:border-gray-200 dark:bg-gray-700 dark:text-white">
          {isDarkMode ? <span>🌞</span> : <span>🌙</span>}
        </button>
      </div>

      <div className="flex justify-center gap-4 p-4">
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className= {isDarkMode ? "bg-gray-900 text-white p-2 border rounded-md" : "bg-white text-black p-2 border rounded-md"} />
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={isDarkMode ? "bg-gray-900 text-white p-2 border rounded-md" : "bg-white text-black p-2 border rounded-md"}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {filteredNews.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {filteredNews.map((item) => (
            <li key={item.id}><NewsCard article={item} /></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
