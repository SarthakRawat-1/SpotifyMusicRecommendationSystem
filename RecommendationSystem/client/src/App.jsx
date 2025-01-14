"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { SearchForm } from "./components/Searchform";
import { RecommendationList } from "./components/Recommendation";

export default function Home() {
  const [recommendations, setRecommendations] = useState([]);

  const handleSearch = async (song) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ song_name: song }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations);
      } else {
        console.error("Error fetching recommendations:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Header />
        <SearchForm onSearch={handleSearch} />
        <RecommendationList recommendations={recommendations} />
      </div>
    </main>
  );
}
