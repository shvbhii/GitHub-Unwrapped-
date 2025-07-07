

import GitHubCalendar from 'react-github-calendar';


const formatNumber = (num) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

const StarIcon = () => (
    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);


export default function StatsCard({ data, username }) {
  const maxLangCount = Math.max(...data.topLanguages.map(lang => lang.count), 0);

  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg w-full animate-fade-in border border-gray-700">
      
      
      <div className="flex items-center space-x-4 mb-6">
        <img src={data.avatar_url} alt={data.name || username} className="w-20 h-20 rounded-full border-4 border-purple-500" />
        <div>
          <h2 className="text-2xl font-bold text-left">{data.name || username}</h2>
          <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline text-left block">
            @{username}
          </a>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        
        <div className="lg:col-span-1 lg:order-1 order-2">
            <h3 className="text-lg font-bold mb-3 text-left">Contribution Calendar</h3>
            <div className="p-4 bg-gray-700/50 rounded-lg text-xs">
                <GitHubCalendar username={username} blockSize={10} blockMargin={3} fontSize={12} theme={{ dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'] }} />
            </div>
        </div>

        
        <div className="lg:col-span-1 lg:order-2 order-1 space-y-6">
          <div className="p-4 bg-gray-700/50 rounded-lg text-center">
            <p className="text-sm text-gray-400">Total Repos</p>
            <p className="text-3xl font-bold">{formatNumber(data.totalRepos)}</p>
          </div>
          <div className="p-4 bg-gray-700/50 rounded-lg text-center">
            <p className="text-sm text-gray-400">Total Stars</p>
            <p className="text-3xl font-bold">{formatNumber(data.totalStars)}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3 text-left">Top Languages</h3>
            <div className="space-y-3">
              {data.topLanguages?.map(({ language, count }) => (
                <div key={language}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{language}</span>
                    <span className="text-sm text-gray-400">{count} repos</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full" style={{ width: `${(count / maxLangCount) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

       
        <div className="lg:col-span-1 lg:order-3 order-3">
            <h3 className="text-lg font-bold mb-3 text-left">Most Starred Repositories</h3>
            <div className="space-y-3">
              {data.topRepos?.map(repo => (
                <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex justify-between items-center">
                    <p className="font-bold truncate">{repo.name}</p>
                    <p className="flex items-center text-sm text-yellow-400 shrink-0"><StarIcon /> {repo.stars}</p>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{repo.description || 'No description provided.'}</p>
                </a>
              ))}
            </div>
        </div>
      </div>

       
       <div className="mt-8 text-center">
        <a href={`https://twitter.com/intent/tweet?text=Check%20out%20my%20GitHub%20Unwrapped!%20%F0%9F%8E%89&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&via=YourTwitterHandle`} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors">
            Share on X
        </a>
      </div>

    </div>
  );
}