import { useState } from 'react';
import StatsCard from '../components/StatsCard';
import Footer from '../components/Footer';

export default function Home() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/stats?username=${username}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'User not found.');
      }
      const stats = await res.json();
      setData(stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          GitHub Unwrapped
        </h1>
        <p className="text-gray-400 mb-6">Get your personalized GitHub stats card!</p>
        
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., shvbhii"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !username}
            className="w-full mt-4 px-4 py-3 bg-purple-600 rounded-md font-bold text-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors transform hover:scale-105"
          >
            {loading ? 'Generating...' : 'Unwrap!'}
          </button>
        </form>

        {error && <p className="mt-4 text-red-400">{error}</p>}
        
        {data && <StatsCard data={data} username={username} />}
      </div>
      
      <Footer />
    </main>
  );
}