import React, { useMemo, useState } from "react";
import { useIsmacData } from "@/context/withContext";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Navigation, Keyboard } from "swiper";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/navigation";

function AgendaPages() {
  const { cupones } = useIsmacData();
  const searchParams = useSearchParams();
  const type = searchParams?.get("type");

  const filteredCupones = useMemo(() => {
    if (type === "agenda") return cupones.filter((x) => x?.isAgenda);
    if (type === "cupons") return cupones.filter((x) => !x?.isAgenda);
    return cupones;
  }, [cupones, type]);

  // Estado para modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Función para abrir modal con imagen
  const openModal = (imgSrc) => {
    setModalImage(imgSrc);
    setModalOpen(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className="p-5 max-w-[450px] mx-auto relative">
      <h2 className="text-center text-xl font-bold mb-4">
        {type === "agenda"
          ? "Agenda"
          : type === "cupons"
          ? "Cupones"
          : "Todos los Cupones"}
      </h2>

      <Swiper
        modules={[EffectFlip, Navigation, Keyboard]}
        effect="flip"
        grabCursor={true}
        navigation={true}
        keyboard={{ enabled: true }}
        className="w-full h-[520px]"
        style={{ maxWidth: 360, maxHeight: 520 }}
        flipEffect={{
          slideShadows: true,
          limitRotation: true,
        }}
      >
        {filteredCupones.map((src, i) => (
          <SwiperSlide
            key={i}
            className="flex items-center justify-center bg-white cursor-pointer"
            onClick={() => openModal(src.uri)}
          >
            <img
              src={`${src.uri}?w=2000`}
              alt={`Cupón ${i + 1}`}
              className="object-contain w-full h-full"
              style={{ maxHeight: 520 }}
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed image modal"
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] bg-black"
            onClick={(e) => e.stopPropagation()} // evitar cerrar al click dentro del modal
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-3xl font-bold z-50"
              aria-label="Cerrar modal"
              type="button"
            >
              &times;
            </button>

            <TransformWrapper
              doubleClick={{ disabled: false }}
              pinch={{ disabled: false }}
              wheel={{ disabled: false }}
              pan={{ disabled: false }}
              minScale={1}
              maxScale={5}
              initialScale={1}
              centerOnInit={true}
              limitToBounds={true}
            >
              <TransformComponent>
                <img
                  src={`${modalImage}?w=2000`}
                  alt="Imagen ampliada"
                  className="max-w-full max-h-[90vh] object-contain"
                  draggable={false}
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      )}
    </div>
  );
}

export default AgendaPages;
