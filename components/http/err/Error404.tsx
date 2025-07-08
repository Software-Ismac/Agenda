import Link from "next/link";
import React from "react";

function Error404() {
  return (
    <section className="flex items-center h-screen p-16 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Lo sentimos, no pudimos encontrar esta página.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            Pero no te preocupes, puedes encontrar muchas otras cosas en nuestra
            página de inicio.
          </p>
          <Link href="/">
            <div className={`px-8 py-3 font-semibold rounded bg-zinc-200`}>
              Volver a la página de inicio
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Error404;
