import { NoteProvider } from "@/backend/useNote/useNote";
import { UserProvider } from "@/backend/useUser/useUser";
import { client } from "@/client";
import { Navbar } from "@/components";
import { NetworkProvider, Video } from "@/context/NetwoorkProvider";
import "@/styles/globals.css";
import { IconsProvider } from "@llampukaq/icons";
import type { AppProps } from "next/app";
import { OpenBaasProvider } from "openbaas-sdk-react";
import "tldraw/tldraw.css";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { ChatProvider } from "@/backend/useIA/useIA";
import Error401 from "@/components/http/err/Error401";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "cllk";
import { AlbumProvider } from "@/context/Album";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import "swiper/css/effect-flip";

import { IsmacDataProvider } from "@/context/withContext";
import "react-medium-image-zoom/dist/styles.css";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Video>
      <IsmacDataProvider>
        <HeroUIProvider locale="es-ES">
          <Provider mode="light">
            <QueryClientProvider client={queryClient}>
              <OpenBaasProvider
                uri={client.openBaas ?? ""}
                Error401={<Error401 />}
              >
                <NetworkProvider>
                  <IconsProvider
                    value={{ className: "dark:stroke-white stroke-black" }}
                  >
                    <Navbar />
                    <UserProvider>
                      <NoteProvider>
                        <ChatProvider>
                          <AlbumProvider>
                            <GoogleOAuthProvider clientId={client.google ?? ""}>
                              <Component {...pageProps} />
                            </GoogleOAuthProvider>
                          </AlbumProvider>
                        </ChatProvider>
                      </NoteProvider>
                    </UserProvider>
                  </IconsProvider>
                </NetworkProvider>
              </OpenBaasProvider>
            </QueryClientProvider>
          </Provider>
        </HeroUIProvider>
      </IsmacDataProvider>
    </Video>
  );
}
