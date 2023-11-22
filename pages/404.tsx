import Head from "next/head";
import Navbar from "@/components/Navbar";

import Article from "@/components/Arcticle";
import Category from "@/components/Category";
import Link from "next/link";
import Button from "@/components/Button";

export default function NotFoundPage() {
  return (
    <div>
      <Head>
        <title>404 | Bacaku</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Navbar hasSearchInput={false}/>
      <div className="w-[720px] mx-auto py-24">
        <div
        style={{ height: "calc(100vh - 4rem)"}}
         className="flex flex-col justify-center items-center">
          <h1 className="font-sans text-slate-900 text-8xl font-bold mb-6">404</h1>
          <p className="font-sans text-slate-900 text-base mb-16">
            There’s no content here
          </p>
          <Link href="/">
            <Button type="button" size="large">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
