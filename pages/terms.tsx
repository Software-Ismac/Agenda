import { NextPage } from "next";
import Head from "next/head";

const TermsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Términos de Servicio y Uso</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Términos de Servicio y Uso</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Aceptación de Términos
          </h2>
          <p className="mb-4">
            Al iniciar sesión en esta aplicación, usted acepta automáticamente y
            de manera irrevocable los presentes Términos de Servicio y Uso en su
            totalidad.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Propiedad Intelectual
          </h2>
          <p className="mb-4">
            Todos los derechos de propiedad intelectual sobre esta aplicación
            pertenecen exclusivamente al desarrollador original. Queda
            estrictamente prohibido:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              La venta o distribución de la aplicación sin autorización expresa
              del instituto y del desarrollador
            </li>
            <li>La modificación del código fuente para fines comerciales</li>
            <li>Cualquier uso que infrinja los derechos del desarrollador</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Política de Modificaciones
          </h2>
          <p className="mb-4">
            Solo se permiten modificaciones en ramas de desarrollo/preproducción
            y únicamente cuando dichos cambios hayan sido aprobados
            explícitamente por el desarrollador original.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Uso Aceptable</h2>
          <p className="mb-4">
            El usuario se compromete a utilizar esta aplicación únicamente para
            los fines previstos y de acuerdo con la legislación aplicable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Limitación de Responsabilidad
          </h2>
          <p className="mb-4">
            El desarrollador no será responsable por daños directos, indirectos,
            incidentales, especiales o consecuentes que resulten del uso o la
            imposibilidad de uso de la aplicación.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Suspensión y Terminación
          </h2>
          <p className="mb-4">
            Nos reservamos el derecho de suspender o cancelar su acceso a la
            aplicación en cualquier momento, sin previo aviso, si se detecta un
            uso indebido o incumplimiento de estos términos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Actualizaciones de los Términos
          </h2>
          <p className="mb-4">
            Estos términos pueden ser modificados ocasionalmente. El uso
            continuo de la aplicación después de cualquier cambio implica la
            aceptación de los nuevos términos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Política de Privacidad
          </h2>
          <p className="mb-4">
            La recopilación y el uso de datos personales están sujetos a nuestra
            Política de Privacidad. Le recomendamos revisarla para entender cómo
            protegemos su información.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contacto</h2>
          <p>
            Para cualquier consulta sobre estos términos, contacte al
            desarrollador a través de los canales oficiales del instituto.
          </p>
        </section>
      </main>
    </>
  );
};

export default TermsPage;
