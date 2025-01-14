import { Disc } from "lucide-react";

export function RecommendationList({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recommended Songs
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((song, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="p-4">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <Disc className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {song.name}
              </h3>
              <p className="text-gray-600">{song.artists}</p>
              <p className="text-sm text-gray-500">{song.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
