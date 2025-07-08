import { NextPage } from 'next'
import Head from 'next/head'

const PrivacyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Política de Privacidad</title>
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Recopilación de Datos</h2>
          <p className="mb-4">
            Esta aplicación NO recopila ni almacena datos personales de los usuarios.
            Solo se procesan los datos estrictamente necesarios para el funcionamiento básico,
            los cuales se mantienen únicamente durante la sesión activa.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Uso de la Información</h2>
          <p className="mb-4">
            Los datos temporales se usan exclusivamente para:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Proveer la funcionalidad básica</li>
            <li>Garantizar seguridad y estabilidad</li>
            <li>Mejorar la experiencia de usuario</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Seguridad</h2>
          <p>
            Implementamos medidas técnicas para proteger cualquier información procesada.
          </p>
        </section>
      </main>
    </>
  )
}

export default PrivacyPage
