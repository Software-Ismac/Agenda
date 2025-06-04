"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./components/ui/button";
import {
  ComputerIcon as Windows,
  LaptopIcon as Linux,
  Download,
  ArrowRight,
  Menu,
  BookOpen,
} from "lucide-react";
import { CalendarIcon, MessageSquareIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const downloadSectionRef = useRef<HTMLElement>(null);
  const [lenis, setLenis] = useState<any>(null);

  // Configuración de Lenis para scroll suave
  useEffect(() => {
    const initSmoothScroll = async () => {
      const Lenis = (await import("lenis")).default;
      const lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //@ts-ignore
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      setLenis(lenisInstance);
    };

    initSmoothScroll();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  // Configuración de GSAP para animaciones de scroll
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Asegurarse de que los refs estén disponibles
      if (imageRef.current && downloadSectionRef.current) {
        // Animación para que la imagen se deslice con el scroll y se quede fija
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: downloadSectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            markers: false,
          },
        });

        tl.to(imageRef.current, {
          y: -50,
          scale: 0.9,
          position: "sticky",
          top: "20px",
          duration: 1,
        });
      }

      // Efectos parallax para elementos de fondo
      gsap.utils.toArray(".parallax-bg").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Parallax para elementos flotantes
      gsap.utils.toArray(".parallax-float").forEach((element: any) => {
        gsap.to(element, {
          y: -100,
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    }

    return () => {
      // Limpiar ScrollTriggers al desmontar
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Scroll a secciones
  const scrollToSection = (sectionId: string) => {
    if (lenis) {
      const element = document.getElementById(sectionId);
      if (element) {
        lenis.scrollTo(element);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]" ref={containerRef}>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-green-50 to-white overflow-hidden relative">
          {/* Círculos y formas geométricas flotantes en el hero */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div
              className="absolute top-0 left-0 w-24 h-24 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 parallax-float"
              style={{ transform: "translate(-50%, -50%)" }}
            ></div>
            <div
              className="absolute top-1/4 right-0 w-32 h-32 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 parallax-float"
              style={{ transform: "translate(50%, -50%)" }}
            ></div>
            <div
              className="absolute bottom-0 left-1/3 w-20 h-20 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 parallax-float"
              style={{ transform: "translate(-50%, 50%)" }}
            ></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 parallax-float"
              style={{ transform: "translate(50%, 50%)" }}
            ></div>
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="space-y-2">
                  <motion.div
                    className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Desarrollado por estudiantes para estudiantes
                  </motion.div>
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    Agenda ISMAC
                  </motion.h1>
                  <motion.p
                    className="text-xl text-green-800 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Tu compañero de estudio digital
                  </motion.p>
                  <motion.p
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    Organiza tus apuntes, tareas y horarios con la aplicación de
                    notas desarrollada por el Instituto Tecnológico ISMAC.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <Button
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    onClick={() => scrollToSection("descargar")}
                  >
                    <Download className="h-4 w-4" />
                    Descargar ahora
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
              <div
                className="mx-auto flex items-center justify-center"
                ref={imageRef}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative"
                >
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Captura de pantalla de Agenda ISMAC"
                    className="rounded-lg object-cover shadow-xl"
                  />
                  <motion.div
                    className="absolute -z-10 bg-green-200 rounded-lg w-full h-full"
                    style={{ top: "15px", left: "15px" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="caracteristicas"
          className="w-full py-12 md:py-24 lg:py-32 bg-white relative overflow-hidden"
        >
          {/* Fondo con movimiento sutil */}
          <div className="absolute inset-0 w-full h-full bg-green-50 bg-opacity-30 parallax-bg"></div>
          <div className="container mx-auto mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Diseñada para estudiantes
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Agenda ISMAC ha sido creada pensando en las necesidades
                  específicas de los estudiantes del Instituto Tecnológico
                  ISMAC.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <motion.div
                className="grid gap-2 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 mx-auto">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Organización de apuntes</h3>
                <p className="text-muted-foreground">
                  Clasifica tus notas por materias, temas y fechas para
                  encontrar rápidamente lo que necesitas.
                </p>
              </motion.div>
              <motion.div
                className="grid gap-2 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 mx-auto">
                  <CalendarIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Calendario académico</h3>
                <p className="text-muted-foreground">
                  Visualiza y organiza tu horario de clases, fechas de exámenes
                  y entregas de trabajos en un calendario integrado.
                </p>
              </motion.div>
              <motion.div
                className="grid gap-2 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 mx-auto">
                  <MessageSquareIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Chat con IA</h3>
                <p className="text-muted-foreground">
                  Resuelve dudas y obtén ayuda instantánea con nuestro asistente
                  de inteligencia artificial integrado.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="instituto"
          className="w-full py-12 md:py-24 lg:py-32 bg-green-50 relative overflow-hidden"
        >
          {/* Elementos gráficos en la sección de branding */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-40 h-40 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 parallax-float"
              style={{ transform: "translate(-50%, -50%)" }}
            ></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 parallax-float"
              style={{ transform: "translate(50%, 50%)" }}
            ></div>
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">
                  Innovación educativa
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Desarrollado por el Instituto Tecnológico ISMAC
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Agenda ISMAC es el resultado de nuestro compromiso con la
                  investigación y desarrollo (I+D) en el campo de la tecnología
                  educativa. Creada por estudiantes y docentes, esta aplicación
                  demuestra las capacidades técnicas que desarrollan nuestros
                  alumnos durante su formación.
                </p>
                <Link
                  href="https://www.ismac.edu.ec"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Conoce más sobre ISMAC
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  width={500}
                  height={300}
                  alt="Campus del Instituto Tecnológico ISMAC"
                  className="rounded-lg object-cover shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="descargar"
          className="w-full py-12 md:py-24 lg:py-32"
          ref={downloadSectionRef}
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Descarga Agenda ISMAC
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Disponible para Windows y Linux. Instalación rápida y
                  sencilla.
                </p>
              </div>
              <div className="grid w-full max-w-sm items-center gap-6 sm:max-w-md md:gap-8">
                <motion.div
                  className="grid gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link href="/download/windows">
                    <Button
                      className="w-full h-16 text-lg bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <Windows className="mr-2 h-5 w-5" />
                      Descargar para Windows
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    Windows 10/11 (64-bit) - 18MB
                  </p>
                </motion.div>
                <motion.div
                  className="grid gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link href="/download/linux">
                    <Button
                      className="w-full h-16 text-lg border-green-600 text-green-600 hover:bg-green-50"
                      variant="outline"
                      size="lg"
                    >
                      <Linux className="mr-2 h-5 w-5" />
                      Descargar para Linux
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    Ubuntu, Debian, Fedora - 16MB
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-50 to-green-100">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="space-y-3 max-w-3xl">
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  Dedicados a la{" "}
                  <span className="text-green-600">innovación</span> y la{" "}
                  <span className="text-green-600">excelencia</span>
                </motion.h2>
                <motion.p
                  className="text-xl text-muted-foreground md:text-2xl/relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  En el Instituto Tecnológico ISMAC, transformamos el futuro a
                  través de la tecnología
                </motion.p>
              </div>

              <div className="mx-auto grid max-w-5xl gap-8 py-8 lg:grid-cols-3">
                <motion.div
                  className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-lg border-t-4 border-green-600"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path>
                      <path d="m7 16.5-4.74-2.85"></path>
                      <path d="m7 16.5 5-3"></path>
                      <path d="M7 16.5v5.17"></path>
                      <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path>
                      <path d="m17 16.5-5-3"></path>
                      <path d="m17 16.5 4.74-2.85"></path>
                      <path d="M17 16.5v5.17"></path>
                      <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"></path>
                      <path d="M12 8 7.26 5.15"></path>
                      <path d="m12 8 4.74-2.85"></path>
                      <path d="M12 13.5V8"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Innovación Constante</h3>
                  <p className="text-muted-foreground">
                    Impulsamos el desarrollo tecnológico a través de proyectos
                    como Agenda ISMAC, creando soluciones que transforman la
                    experiencia educativa.
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-lg border-t-4 border-green-600"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.95 1 4.8a.2.2 0 0 1-.2.2h-.5a.2.2 0 0 1-.2-.2s0-4.85.1-4.85M19.8 17.3a7.5 7.5 0 0 0-3.9-11.4"></path>
                      <path d="M22 8.2a10 10 0 0 0-4.9-3.2"></path>
                      <path d="m20 11.8-.7 1.6"></path>
                      <path d="m18 9.5-.5 1.5"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">
                    Compromiso con la Excelencia
                  </h3>
                  <p className="text-muted-foreground">
                    Nos esforzamos por ser los mejores en todo lo que hacemos,
                    formando profesionales de alto nivel y desarrollando
                    tecnología de vanguardia.
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-lg border-t-4 border-green-600"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Formación Integral</h3>
                  <p className="text-muted-foreground">
                    Preparamos a nuestros estudiantes no solo con conocimientos
                    técnicos, sino también con habilidades prácticas para crear
                    soluciones reales como Agenda ISMAC.
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05 }}
              >
                <Button className="bg-green-600 hover:bg-green-700">
                  Conoce nuestra filosofía
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
