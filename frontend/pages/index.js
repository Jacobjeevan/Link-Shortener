import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Jeevan Link</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="block m-10">
        <h1 className="text-5xl">Welcome to Jeevan Link</h1>

        <p className="text-4xl">A Url Shortening Service</p>

        <div className="container space-x-20 space-y-20">
          <Link href="/register">
            <a className="inline-block">
              <h3>Register &rarr;</h3>
              <p>If you are a new user.</p>
            </a>
          </Link>

          <Link href="/login">
            <a className="inline-block">
              <h3>Login &rarr;</h3>
              <p>If you are an existing user.</p>
            </a>
          </Link>
        </div>
      </main>

      <footer>
        <a
          href="http://Jacobjeevan.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jacob Jeevan
        </a>
      </footer>
    </div>
  );
}
