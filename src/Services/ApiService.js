import { capParagraph } from "../Utils";

const base_url = process.env.REACT_APP_GITHUB_API_URL;

export const getTrendingRepos = async (filter_params = null) => {
  try {
    const url = filter_params ? base_url + filter_params : base_url;
    const response = await fetch(url);
    const data = await response.json();
    
    const trendingRepos = data.items.map((repo) => ({
        id: repo.id,
        name: repo.name,
        owner: repo.owner.login,
        description: repo.description && capParagraph(repo.description),
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        topics: repo.topics ?? [],
    }));
    
    return trendingRepos;
  } catch (error) {
    return [];
  }

};
