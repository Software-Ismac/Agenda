import HomePages from "@/infraestructure/home/HomePages";
import withPWA from "@/services/withPWA";
import { useMessage } from "cllk";
import { useIsLogin, useMagicLink } from "openbaas-sdk-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { client } from "@/client";
import withIsmacContext from "@/context/withContext";
import Signin from "@/components/signin/App";

function Home() {
  const { isLogin } = useIsLogin();
  const { handleConfirmatinCode, handleGenereteCode } = useMagicLink();
  const { messagePromise } = useMessage();

  return (
    <>
      {isLogin ? (
        <HomePages />
      ) : (
        <>
          <GoogleOAuthProvider clientId={client.google ?? ""}>
            <Signin />
          </GoogleOAuthProvider>

          {/* <div className="flex justify-center items-center h-screen w-full">
            <div className="w-full max-w-[600px]">
              <GoogleOAuthProvider clientId={client.google ?? ""}>
                <Signin
                  social
                  text="Ismac Agenda Digital"
                  magicLinkConfirm={async (email, code) => {
                    messagePromise(
                      async () => {
                        await handleConfirmatinCode(email, code);
                      },
                      {
                        error: "Error de codigo",
                        pending: "Verificando codigo",
                        success: "Bienvenido a Ismac Agenda",
                      }
                    );
                  }}
                  magicLinkGenerate={async (email) => {
                    await handleGenereteCode(email);
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          </div> */}
        </>
      )}
    </>
  );
}
export default withIsmacContext(Home);
export const getStaticProps = async () => {
  withPWA(
    "Ismac",
    "https://imagedelivery.net/Z6uUFT3xWbycdRxHWf6QLQ/257dbc1f-208d-492d-b5ad-b6f794727c00/crop"
  );
  const res = await (
    await fetch(`https://agendaapi.llampukaq.workers.dev/v1/data`)
  ).json();

  return {
    props: {
      cupons: JSON.parse(res?.cupons ?? `{}`),
      calendar: JSON.parse(res?.calendar ?? `{}`),
    },
  };
};
