import { useState } from "react";
import { Search } from "lucide-react";

export function SearchForm({ onSearch }) {
  const [song, setSong] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (song.trim()) {
      await onSearch(song);
      setSong(""); // Clear the input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex shadow-sm rounded-md">
        <input
          type="text"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          placeholder="Enter a song name"
          className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
