import { useIsmacData } from "@/context/withContext";
import { Button } from "@heroui/react";
import { Img } from "cllk";
import React, { useRef, useState, useMemo } from "react";
import HTMLFlipBook from "react-pageflip";
import { useSearchParams } from "next/navigation"; // si usas App Router (Next.js 13+)

function AgendaPages() {
  const bookRef = useRef<any>(null);
  const [page, setPage] = useState(0);
  const { cupones } = useIsmacData();

  const searchParams = useSearchParams();
  const type = searchParams?.get("type");

  // Filtrado según query
  const filteredCupones = useMemo(() => {
    if (type === "agenda")
      //@ts-ignore
      return cupones.filter((x) => x?.isAgenda);
    if (type === "cupons")
      //@ts-ignore
      return cupones.filter((x) => !x?.isAgenda);
    return cupones; // sin query: todos
  }, [cupones, type]);

  const totalPages = filteredCupones.length;

  const nextPage = () => {
    if (page >= totalPages - 1) {
      bookRef.current.pageFlip().turnToPage(0);
      setPage(0);
    } else {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (page <= 0) {
      bookRef.current.pageFlip().turnToPage(totalPages - 1);
      setPage(totalPages - 1);
    } else {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const onPageFlip = (e: any) => {
    setPage(e.data);
  };

  return (
    <div className="p-5 space-y-3 max-w-[450px] mx-auto">
      <h2 className="text-center text-xl font-bold">
        {type === "agenda"
          ? "Agenda"
          : type === "cupons"
          ? "Cupones"
          : "Todos los Cupones"}
      </h2>

      <div className="flex justify-between mt-4">
        <Button onPress={prevPage}>Anterior</Button>
        <Button onPress={nextPage}>Siguiente</Button>
      </div>
      {/* @ts-ignore */}
      <HTMLFlipBook
        ref={bookRef}
        width={320}
        height={450}
        size="stretch"
        minWidth={300}
        maxWidth={360}
        minHeight={420}
        maxHeight={520}
        showCover={false}
        mobileScrollSupport={true}
        maxShadowOpacity={0.5}
        onFlip={onPageFlip}
        className="mx-auto"
      >
        {filteredCupones.map((src, i) => (
          <div
            key={i}
            className="w-full h-full flex items-center justify-center bg-white"
          >
            <Img
              width="100%"
              src={src.uri}
              alt={`Cupón ${i + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}

export default AgendaPages;
