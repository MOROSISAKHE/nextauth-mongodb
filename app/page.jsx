// pages/index.js
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Ticketing App</title>
        <meta name="description" content="A simple ticketing app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Welcome to Ticketing App</h1>
        <p className="text-base sm:text-lg text-gray-700 mb-8">Manage and view your tickets with ease.</p>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <Link href="/view-tickets">
            <div className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">
              View Tickets
            </div>
          </Link>
          <Link href="/log-ticket">
            <div className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 cursor-pointer">
              Log a Ticket
            </div>
          </Link>
          <Link href="/login">
            <div className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 cursor-pointer">
              Login/Register
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
