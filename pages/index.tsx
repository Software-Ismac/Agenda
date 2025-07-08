import HomePages from "@/infraestructure/home/HomePages";
import withPWA from "@/services/withPWA";
import { useIsLogin, useMagicLink } from "openbaas-sdk-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { client } from "@/client";
import withIsmacContext from "@/context/withContext";
import Signin from "@/components/signin/App";

function Home() {
  const { isLogin } = useIsLogin();

  return (
    <>
      {isLogin ? (
        <HomePages />
      ) : (
        <GoogleOAuthProvider clientId={client.google ?? ""}>
          <Signin />
        </GoogleOAuthProvider>
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
