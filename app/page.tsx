import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { getAuthor } from "utils/author";
import { Header } from "components/Header";

function PostCard(post: Post) {
  const Content = getMDXComponent(post.body.code);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-serif">
        <Link
          href={post.url}
          className="text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
          legacyBehavior
        >
          {post.title}
        </Link>
      </h3>
      <time
        dateTime={post.date}
        className="block mb-2 text-xs text-gray-600 dark:text-gray-300 font-serif"
      >
        {format(parseISO(post.date), "LLLL d, yyyy")} | {getAuthor(post).nickName}
      </time>
      <div className="text-sm">
        <div className="line-clamp-5 mb-2">
          <Content />
        </div>
        <Link
          href={post.url}
          className="text-blue-700 dark:text-blue-400 italic hover:text-blue-900 dark:hover:text-blue-300 text-sm"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div>
      <Header />
      <div className="max-w-xl py-2 mx-auto">
        <div>
          <div className="blockquote border-l-4 border-gray-300 dark:border-gray-700 pl-4 py-0 mb-8 italic text-xs text-gray-700 dark:text-gray-300">
            <p>
              The origin of the word "blog" is "web log" in the 1990s. I thought it would be fitting
              to call these <b>Emlogs</b> because they are a email log of our thoughts.
            </p>

            <p>
              I had this idea because I always though the idea of consistent writing would be a good
              way to become more expressive but also the practice itself would be healthy. I don't
              really know the exact mechanics of what I want. I did like the low friction of e-mail
              to a friend because it has to clear a certain quality bar but it is not too crazy.
            </p>
          </div>
          <p className="mb-8 text-sm">
            This is how we started the tradition of Emlogs - a low friction way to share musings and
            practice writing. Here are some of our favorites.
          </p>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <div>
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
