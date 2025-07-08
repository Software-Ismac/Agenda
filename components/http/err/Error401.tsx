import { NavLink, useColors } from "cllk";

function Error401() {
  const { color } = useColors();
  return (
    <section className="flex items-center h-screen p-16 ">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
            <span className="sr-only">Error</span>401
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-gray-600">
            Lo sentimos, no estas autorizado en esta página
          </p>
          <p className="mt-4 mb-8 text-gray-400">
            Pero no te preocupes, puedes encontrar muchas otras cosas en nuestra
            página de inicio.
          </p>
          <NavLink href="/">
            <div className={`px-8 py-3 font-semibold rounded bg-zinc-200`}>
              Volver a la página de inicio
            </div>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
export default Error401;
