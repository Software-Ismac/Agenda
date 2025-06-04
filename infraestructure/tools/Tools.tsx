import React from "react";
import { Tooltip, Spacer } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AppGrid } from "./components/app-grid";
import { SearchBar } from "./components/search-bar";
import { useUser } from "@/backend";
import { useRouter } from "next/router";

export default function App() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { user } = useUser();

  const { push } = useRouter();
  return (
    <div className="min-h-screen bg-background flex flex-col p-6 md:p-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Aplicaciones</h1>
        <div className="flex items-center gap-3">
          {user?.email == "luisgarrido0987@gmail.com" && (
            <Tooltip content="Settings">
              <button
                onClick={() => {
                  push("/admin");
                }}
                className="p-2 rounded-full hover:bg-content2 transition-colors"
              >
                <Icon
                  icon="lucide:settings"
                  className="w-5 h-5 text-foreground-500"
                />
              </button>
            </Tooltip>
          )}

          <Tooltip content="User Profile">
            <button
              onClick={() => {
                push("/account");
              }}
              className="p-2 rounded-full hover:bg-content2 transition-colors"
            >
              <Icon
                icon="lucide:user"
                className="w-5 h-5 text-foreground-500"
              />
            </button>
          </Tooltip>
        </div>
      </header>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <Spacer y={6} />

      <div className="flex-1">
        <div>
          <h2 className="text-lg font-medium text-foreground-700 mb-4">
            Todas las Aplicaciones
          </h2>
          <AppGrid
            //@ts-ignore
            apps={apps.filter(
              (app) =>
                searchQuery === "" ||
                app?.name.toLowerCase().includes(searchQuery.toLowerCase())
            )}
          />
        </div>
      </div>
    </div>
  );
}

const apps = [
  {
    id: "1",
    name: "Agenda",
    icon: "lucide:book",
    color: "success",
    link: "/tools/agenda?type=agenda",
  },
  {
    id: "2",
    name: "Cupones",
    icon: "lucide:badge-percent",
    color: "secondary",
    link: "/tools/agenda?type=cupons",
  },
  {
    id: "3",
    name: "Calendario",
    icon: "lucide:calendar",
    color: "warning",
    link: "/tools/calendar",
  },
  {
    id: "4",
    name: "Notas",
    icon: "lucide:file-text",
    color: "secondary",
    link: "/tools/notes",
  },
  {
    id: "5",
    name: "Galeria",
    icon: "lucide:image",
    color: "success",
    link: "/tools/galery",
  },
  {
    id: "6",
    name: "Canvas",
    icon: "lucide:pencil",
    color: "danger",
    link: "/tools/draw",
  },
  {
    id: "7",
    name: "Call Center",
    icon: "lucide:search",
    color: "success",
    link: "/tools/call",
  },
  {
    id: "8",
    name: "Juegos",
    icon: "lucide:gamepad-2",
    color: "warning",
    link: "/tools/games",
  },
  {
    id: "9",
    name: "Clima",
    icon: "lucide:cloud-sun",
    color: "warning",
    link: "/tools/weather",
  },
  // {
  //   id: "10",
  //   name: "Descargar App",
  //   icon: "lucide:app-window",
  //   color: "success",
  //   link: "/tools/download",
  // },
  // {
  //   id: "10",
  //   name: "Navegador",
  //   icon: "lucide:globe",
  //   color: "success",
  //   link: "/tools/browser",
  // },
];

// const apps = [

//   {
//     id: "2",
//     name: "Messages",
//     icon: "lucide:message-circle",
//     color: "success",
//   },
//   {
//     id: "3",
//     name: "Photos",
//     icon: "lucide:image",
//     color: "secondary",
//   },
//   {
//     id: "5",
//     name: "Maps",
//     icon: "lucide:map",
//     color: "danger",
//     frequent: false,
//   },
//   {
//     id: "6",
//     name: "Notes",
//     icon: "lucide:file-text",
//     color: "primary",
//     frequent: false,
//   },
//   {
//     id: "7",
//     name: "Music",
//     icon: "lucide:music",
//     color: "secondary",
//     frequent: false,
//   },
//   {
//     id: "8",
//     name: "Settings",
//     icon: "lucide:settings",
//     color: "default",
//     frequent: false,
//   },
//   {
//     id: "9",
//     name: "Camera",
//     icon: "lucide:camera",
//     color: "success",
//     frequent: false,
//   },
//   {
//     id: "10",
//     name: "Clock",
//     icon: "lucide:clock",
//     color: "warning",
//     frequent: false,
//   },
//   {
//     id: "11",
//     name: "Calculator",
//     icon: "lucide:calculator",
//     color: "danger",
//     frequent: false,
//   },
//   {
//     id: "12",
//     name: "Files",
//     icon: "lucide:folder",
//     color: "primary",
//     frequent: false,
//   },
//   {
//     id: "13",
//     name: "Mail",
//     icon: "lucide:mail",
//     color: "secondary",
//     frequent: false,
//   },
//   {
//     id: "14",
//     name: "Browser",
//     icon: "lucide:globe",
//     color: "success",
//     frequent: false,
//   },
//   {
//     id: "15",
//     name: "Store",
//     icon: "lucide:shopping-bag",
//     color: "warning",
//     frequent: false,
//   },
//   {
//     id: "16",
//     name: "Health",
//     icon: "lucide:heart",
//     color: "danger",
//     frequent: false,
//   },
// ];
