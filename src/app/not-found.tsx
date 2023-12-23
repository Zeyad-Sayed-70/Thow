import Link from "next/link";

export default function notFound() {
  return (
    <>
      <main
        style={{
          height: "calc(100vh - 56px)",
          backgroundImage: 'url("/assets/owl_background.jpg")',
          backgroundSize: "cover",
        }}
        className="not-found grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 relative"
      >
        <div className="text-center relative z-0">
          <p className="text-base font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white-v sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-200">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-primary hover:bg-primary-dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link href="support" className="text-sm font-semibold text-white-v">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
