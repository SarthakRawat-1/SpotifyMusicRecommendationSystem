import { Music } from "lucide-react";

export function Header() {
  return (
    <header className="text-center mb-8">
      <div className="flex justify-center items-center mb-4">
        <Music className="h-12 w-12 text-purple-600" />
        <h1 className="text-4xl font-bold text-gray-800 ml-2">MusicMatcher</h1>
      </div>
      <p className="text-xl text-gray-600">Discover your next favorite song</p>
    </header>
  );
}
