// src/pages/api/stats.js

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const headers = {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  };

  try {
    // We now make two parallel API calls
    const [userRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers })
    ]);

    // Check if user was found
    if (!userRes.ok) {
      return res.status(userRes.status).json({ error: 'User not found or API error' });
    }

    // Process the data
    const user = await userRes.json();
    const repositories = await repoRes.json();

    let totalStars = 0;
    const languages = {};

    repositories.forEach(repo => {
      totalStars += repo.stargazers_count;
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([language, count]) => ({ language, count }));

    
    const topRepos = repositories
    .filter(repo => !repo.fork) // Optional: filter out forked repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map(repo => ({
        name: repo.name,
        stars: repo.stargazers_count,
        url: repo.html_url,
        description: repo.description,
    }));

    // Updated stats object
    const stats = {
    name: user.name,
    avatar_url: user.avatar_url,
    totalRepos: repositories.length,
    totalStars,
    topLanguages,
    topRepos, // Add the new data here
    };

res.status(200).json(stats);

    res.status(200).json(stats);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}