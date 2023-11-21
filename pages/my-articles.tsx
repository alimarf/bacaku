import Head from "next/head";
import Navbar from "@/components/Navbar";

import Article from "@/components/Arcticle";
import Category from "@/components/Category";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Link from "next/link";

export default function MyArticlesPage() {
  const router = useRouter();

  const articles = [...Array(5)].map((_, index) => {
    return {
      id: index + 1,
      title: "Learning Redux Easier",
      slug: "how-redux",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas etiam morbi varius sapien. Eu arcu morbi tortor rhoncus. Donec pellentesque diam orci enim, nibh diam. Nulla id ut risus quisque felis tristique metus...",
      thumbnail: "/images/dummy-article-thumbnail.png",
      category: "Technology",
      date: "2023-07-08 16:00:00",
      author: {
        name: "John Doe",
        photo: "/images/dummy-avatar.png",
      },
    };
  });

  return (
    <div>
      <Head>
        <title>My Articles | Bacaku</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Navbar hasSearchInput={false} />
      <div className="w-[720px] mx-auto py-24">
        <div className="mb-16 flex items-center justify-between">
          <p className="font-sans text-slate-900 font-bold text-5xl mb-3">
            My Articles
          </p>
          <Link href="my-articles/create">
            <Button type="button" size="large">
              Write an Article
            </Button>
          </Link>
        </div>

        {articles.map((article) => (
          <Article
            key={article.id}
            url={`/articles/${article.slug}`}
            title={article.title}
            content={article.content}
            thumbnail={article.thumbnail}
            category={article.category}
            date={article.date}
            author={article.author}
            hasOptions
          />
        ))}
      </div>
    </div>
  );
}
