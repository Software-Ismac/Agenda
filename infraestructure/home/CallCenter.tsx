import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Avatar,
  Divider,
  Badge,
  Tooltip,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface Asesor {
  id: string;
  name: string;
  img: string;
  status?: "online" | "busy" | "offline";
}

interface Categoria {
  title: string;
  asesores: Asesor[];
  icon: string;
}

export default function CallCenter() {
  const centralTelefonica = (user: string) => {
    const parametros =
      "width=300, height=520, left=-900, top=-1000, location=no";
    window.open(`https://ismac.3cx.ec:5001/${user}`, "_blank", parametros);
  };

  const asesores: Asesor[] = [
    {
      id: "asesor01",
      name: "Asesor 1",
      img: "https://ismac.edu.ec/img/camaleon1.png",
      status: "online",
    },
    {
      id: "asesor02",
      name: "Asesor 2",
      img: "https://ismac.edu.ec/img/camaleon2.png",
      status: "online",
    },
    {
      id: "asesor03",
      name: "Asesor 3",
      img: "https://ismac.edu.ec/img/camaleon3.png",
      status: "online",
    },
    {
      id: "asesor04",
      name: "Asesor 4",
      img: "https://ismac.edu.ec/img/camaleon4.png",
      status: "online",
    },
    {
      id: "asesor05",
      name: "Asesor 5",
      img: "https://ismac.edu.ec/img/camaleon5.png",
      status: "offline",
    },
    {
      id: "asesor06",
      name: "Asesor 6",
      img: "https://ismac.edu.ec/img/camaleon6.png",
      status: "online",
    },
    {
      id: "asesor07",
      name: "Asesor 7",
      img: "https://ismac.edu.ec/img/camaleon7.png",
      status: "online",
    },
    {
      id: "asesorprincipal",
      name: "Asesor Principal",
      img: "https://ismac.edu.ec/img/camaleonPrincipal.png",
      status: "online",
    },
  ];

  const categorias: Categoria[] = [
    {
      title: "Call Center",
      asesores,
      icon: "lucide:headphones",
    },
    {
      title: "Soporte Plataformas",
      icon: "lucide:help-circle",
      asesores: [
        {
          id: "soporteplataformas",
          name: "Soporte 1",
          img: "https://ismac.edu.ec/img/camaleon1.png",
          status: "online",
        },
      ],
    },
    {
      title: "Información General",
      icon: "lucide:info",
      asesores: [
        {
          id: "informacion01",
          name: "Información 1",
          img: "https://ismac.edu.ec/img/camaleon5.png",
          status: "online",
        },
      ],
    },
    {
      title: "Admisiones",
      icon: "lucide:user-plus",
      asesores: [
        {
          id: "admisiones",
          name: "Admisiones",
          img: "https://ismac.edu.ec/img/camaleon4.png",
          status: "online",
        },
      ],
    },
    {
      title: "Colecturía",
      icon: "lucide:credit-card",
      asesores: [
        {
          id: "colecturia01",
          name: "Colecturía 1",
          img: "https://ismac.edu.ec/img/camaleon7.png",
          status: "online",
        },
        {
          id: "colecturia02",
          name: "Colecturía 2",
          img: "https://ismac.edu.ec/img/camaleon2.png",
          status: "online",
        },
      ],
    },
    {
      title: "Bienestar Estudiantil",
      icon: "lucide:heart",
      asesores: [
        {
          id: "bienestarestudiantil",
          name: "Bienestar",
          img: "https://ismac.edu.ec/img/camaleon6.png",
          status: "online",
        },
      ],
    },
  ];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "online":
        return "success";
      case "busy":
        return "warning";
      case "offline":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "online":
        return "Disponible";
      case "busy":
        return "Ocupado";
      case "offline":
        return "No disponible";
      default:
        return "Estado desconocido";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Icon icon="lucide:phone-call" className="text-primary text-2xl" />
          <h1 className="text-2xl font-semibold">Centro de Contacto ISMAC</h1>
        </div>

        <Card className="mb-6 bg-content1 shadow-sm">
          <CardBody>
            <h2 className="text-lg font-medium mb-2">
              ¿Con quién deseas comunicarte?
            </h2>
            <p className="text-default-500">
              Selecciona un departamento y luego un asesor para iniciar una
              llamada.
            </p>
          </CardBody>
        </Card>

        <div className="space-y-8">
          {categorias.map(({ title, asesores, icon }) => (
            <Card key={title} className="overflow-hidden shadow-sm">
              <CardBody className="p-0">
                <div className="flex items-center gap-3 p-4 bg-content2">
                  <Icon icon={icon} className="text-primary text-xl" />
                  <h3 className="text-lg font-medium">{title}</h3>
                </div>

                <Divider />

                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {asesores.map(({ id, name, img, status }) => (
                      <Card key={id} className="border border-default-200">
                        <CardBody className="p-4 flex flex-col items-center gap-3">
                          <Badge
                            content=""
                            color={getStatusColor(status)}
                            shape="circle"
                            placement="top-right"
                          >
                            <Avatar
                              src={img}
                              className="w-20 h-20"
                              imgProps={{
                                className: "object-cover",
                              }}
                            />
                          </Badge>
                          <div className="text-center">
                            <h4 className="font-medium">{name}</h4>
                            <p className="text-small text-default-500">
                              {getStatusText(status)}
                            </p>
                          </div>
                        </CardBody>
                        <CardFooter className="justify-center pt-0 pb-4">
                          <Tooltip content="Iniciar llamada">
                            <Button
                              color="primary"
                              startContent={<Icon icon="lucide:phone-call" />}
                              onPress={() => centralTelefonica(id)}
                              isDisabled={status === "offline"}
                              className="w-full"
                            >
                              Llamar
                            </Button>
                          </Tooltip>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
