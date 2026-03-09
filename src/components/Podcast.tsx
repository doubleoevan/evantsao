import { cn } from "../lib/utils.ts";
import { Link } from "./Link";
import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

export type Feed = {
  title?: string;
  description?: string;
  link?: string;
  feedUrl?: string;
  generator?: string;
  language?: string;
  copyright?: string;
  lastBuildDate?: string;
  paginationLinks?: {
    self?: string;
  };
  image?: {
    link?: string;
    url?: string;
    title?: string;
  };
  itunes?: {
    owner?: {
      name?: string;
    };
    image?: string;
    categories?: string[];
    categoriesWithSubs?: {
      name?: string;
      subs?: {
        name?: string;
      }[];
    }[];
    author?: string;
    explicit?: string;
  };
  items?: FeedItem[];
};

export type FeedItem = {
  title?: string;
  pubDate?: string;
  isoDate?: string;
  guid?: string;
  content?: string;
  contentSnippet?: string;
  "content:encoded"?: string;
  "content:encodedSnippet"?: string;
  enclosure?: {
    url?: string;
    length?: string;
    type?: string;
  };
  itunes?: {
    author?: string;
    summary?: string;
    explicit?: string;
    duration?: string;
    episode?: string;
    season?: string;
    keywords?: string;
    episodeType?: string;
  };
};

type PodcastData = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  episodes: PodcastEpisode[];
  tagline?: string;
};

type PodcastEpisode = {
  title: string;
  pubDate: string;
  isoDate?: string;
  guid?: string;
  contentSnippet?: string;
  enclosure?: {
    url?: string;
    length?: string;
    type?: string;
  };
  duration?: string;
  episode?: string;
  season?: string;
  episodeType?: string;
};

type PodcastProps = {
  feed: Feed;
  tagline?: string;
};

const EPISODES_PER_PAGE = 10;

function toPodcast(feed: Feed): PodcastData {
  return {
    title: feed.title ?? "Podcast",
    description: feed.description ?? "",
    imageUrl: feed.image?.url ?? feed.itunes?.image ?? "",
    link: feed.link ?? "",
    episodes: (feed.items ?? []).map((item) => ({
      title: item.title ?? "Untitled episode",
      pubDate: item.pubDate ?? "",
      isoDate: item.isoDate,
      guid: item.guid,
      contentSnippet:
        item.contentSnippet ??
        item["content:encodedSnippet"] ??
        item.itunes?.summary ??
        item.content ??
        item["content:encoded"] ??
        "",
      duration: item.itunes?.duration,
      episode: item.itunes?.episode,
      season: item.itunes?.season,
      episodeType: item.itunes?.episodeType,
      enclosure: item.enclosure,
    })),
  };
}

function toDateLabel(dateString?: string): string {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function toDurationLabel(durationString?: string): string {
  if (!durationString) {
    return "";
  }

  const duration = parseInt(durationString, 10);
  if (isNaN(duration)) {
    return "";
  }

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  return hours > 0 ? `${hours} hours ${minutes} minutes` : `${minutes} minutes`;
}

export function Podcast({ feed, tagline }: PodcastProps) {
  const podcast = useMemo(() => toPodcast(feed), [feed]);
  const [page, setPage] = useState(1);

  // paginate the current page episodes
  const pageCount = Math.ceil(podcast.episodes.length / EPISODES_PER_PAGE);
  const pageEpisodes = useMemo(() => {
    const startIndex = (page - 1) * EPISODES_PER_PAGE;
    const endIndex = startIndex + EPISODES_PER_PAGE;
    return podcast.episodes.slice(startIndex, endIndex);
  }, [page, podcast.episodes]);

  function onPageClick(page: number) {
    if (page < 1 || page > pageCount) {
      return;
    }
    setPage(page);
  }

  return (
    <div className="flex flex-col gap-10">
      <header>
        <h2 className="text-3xl font-extrabold">
          <Link
            href={podcast.link}
            className="inline-flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {podcast.title} <ExternalLink aria-hidden="true" />
          </Link>
        </h2>
        <article className="flex flex-col md:flex-row! gap-4 pt-4">
          <figure className="flex flex-col items-center gap-4">
            <a
              href={podcast.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border hover:border-primary"
            >
              <img
                className="w-2xl object-cover rounded-xl border hover:border-primary bg-background"
                src={podcast.imageUrl}
                alt={podcast.title}
              />
            </a>
          </figure>
          <div className="flex flex-col gap-4 md:max-w-xl">
            <p>
              {tagline && <span className="block pb-2">{tagline}</span>}
              <span className="block pb-2">{podcast.description}</span>
              <span className="text-muted-foreground">{podcast.episodes.length} episodes</span>
            </p>
          </div>
        </article>
      </header>

      <div className="flex flex-col gap-10">
        {pageEpisodes.map((item, index) => {
          const episodeNumber = podcast.episodes.length - (page - 1) * EPISODES_PER_PAGE + index;

          return (
            <article key={`${item.isoDate ?? item.pubDate}-${index}`}>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <p className="text-muted-foreground">
                  {item.pubDate && `${toDateLabel(item.isoDate ?? item.pubDate)} • `}
                  Season {item.season} • Episode {episodeNumber}
                  {item.duration && ` • ${toDurationLabel(item.duration)}`}
                </p>
                <p className="line-clamp-4">{item.contentSnippet}</p>
                {item.enclosure?.url && (
                  <audio controls preload="none" className="w-full">
                    <source src={item.enclosure.url} type={item.enclosure.type ?? "audio/mpeg"} />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {pageCount > 1 && (
        <nav
          className="flex flex-wrap items-center justify-center gap-2"
          aria-label="Podcast episode pagination"
        >
          <button
            type="button"
            onClick={() => onPageClick(page - 1)}
            disabled={page === 1}
            className="
              relative inline-block
              font-medium transition
              disabled:cursor-not-allowed disabled:opacity-50

              after:absolute after:left-0 after:bottom-0
              after:h-0.5 after:w-0 after:bg-primary
              after:transition-all after:duration-300

              hover:after:w-full hover:text-primary
              disabled:hover:text-current disabled:hover:after:w-0
            "
          >
            Previous
          </button>

          {Array.from({ length: pageCount }, (_, index) => {
            const pageNumber = index + 1;
            const isPageActive = pageNumber === page;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => onPageClick(pageNumber)}
                aria-current={isPageActive ? "page" : undefined}
                className={cn(
                  `
                    px-3 py-2
                    rounded-lg
                    ring-1 ring-border bg-muted
                    text-sm font-medium transition
                    hover:ring-primary hover:text-primary-foreground hover:bg-primary
                  `,
                  isPageActive && "ring-primary bg-primary text-primary-foreground",
                )}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => onPageClick(page + 1)}
            disabled={page === pageCount}
            className="
              relative inline-block
              font-medium transition
              disabled:cursor-not-allowed disabled:opacity-50

              after:absolute after:left-0 after:bottom-0
              after:h-0.5 after:w-0 after:bg-primary
              after:transition-all after:duration-300

              hover:after:w-full hover:text-primary
              disabled:hover:text-current disabled:hover:after:w-0
            "
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
