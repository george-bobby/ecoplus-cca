// src/app/news/page.js
import Parser from 'rss-parser';
import NewsPageClient from './NewsPageClient';

// Server Component for data fetching
const NewsPage = async () => {
  const parser = new Parser();

  // List of RSS feed URLs specifically related to climate and carbon footprint
const feedUrls = [
  {
    url: 'https://news.un.org/feed/subscribe/en/news/topic/climate-change/feed/rss.xml',
    name: 'UN News'
  },
  {
    url: 'https://www.carbonbrief.org/feed',
    name: 'Carbon Brief'
  },
  {
    url: 'https://www.sciencedaily.com/rss/environment.xml',
    name: 'Science Daily'
  },
  {
    url: 'https://www.theguardian.com/environment/rss',
    name: 'The Guardian'
  },
  {
    url: 'https://www.climatechangenews.com/feed/',
    name: 'Climate Home News'
  },
  {
    url: 'https://www.carboncreditmarkets.com/en/blog-feed.xml',
    name: 'Carbon Credit Markets'
  },
  {
    url: 'https://www.carbonnews.co.nz/rssfeed.asp',
    name: 'Carbon News'
  },
  {
    url: 'https://carbonliteracy.com/feed/',
    name: 'Carbon Literacy'
  },
  {
    url: 'https://www.goclimate.com/blog/feed/',
    name: 'GoClimate'
  },
  {
    url: 'https://www.green.earth/blog/rss.xml',
    name: 'Green Earth'
  }
  ];
  
  // Fetch data from all the sources
  const fetchFeeds = async () => {
    const feeds = await Promise.all(
      feedUrls.map(async (source) => {
        try {
          const feed = await parser.parseURL(source.url);
          return {
            title: feed.title || source.name,
            sourceName: source.name,
            items: feed.items.map(item => ({
              title: item.title,
              link: item.link,
              contentSnippet: item.contentSnippet,
              pubDate: item.pubDate,
              enclosure: {
                url: item.enclosure?.url || null
              }
            }))
          };
        } catch (error) {
          console.error(`Error fetching feed from ${source.name}:`, error);
          return null;
        }
      })
    );
    return feeds.filter((feed) => feed && feed.items && feed.items.length > 0);
  };

  const feeds = await fetchFeeds();

  return <NewsPageClient initialFeeds={feeds} />;
};

export default NewsPage;