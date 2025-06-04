import { Icons, ICONS, NavLink, Text } from "cllk";
import { useRouter } from "next/router";
import { useIsLogin } from "openbaas-sdk-react";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const data: {
    icon: ICONS;
    title: string;
    link: string;
  }[] = [
    {
      icon: "IconHome",
      title: "Home",
      link: "/",
    },
    {
      icon: "IconNote",
      title: "Notas",
      link: "/tools/notes",
    },

    {
      icon: "Icon3dRotate",
      title: "AI",
      link: "/ia",
    },
    {
      icon: "IconUser",
      title: "Cuenta",
      link: "/account",
    },
  ];
  const { asPath } = useRouter();
  const { isLogin } = useIsLogin();

  useEffect(() => {
    document.body.classList.remove("dark");
  }, []);

  return (
    <>
      {isLogin && (
        <div className="w-full mx-auto fixed left-0 bottom-0 md:left-auto right-auto z-50">
          <div className="max-w-[500px] mx-auto backdrop-blur-sm border-t-2 py-2 bg-white">
            <motion.div className="flex flex-row justify-around">
              {data?.map((data) => (
                <React.Fragment key={data.link}>
                  {data.link == "/" ? (
                    <>
                      <NavLink href={data.link}>
                        <div
                          className={`flex flex-col justify-center items-center ${
                            asPath === data.link && "active"
                          } hover:scale-105 active:scale-95 duration-200`}
                        >
                          <div className="absolute w-10 h-10">
                            <span className="nav" />
                          </div>
                          <Icons
                            size={20}
                            className={`${
                              asPath === data.link
                                ? "stroke-[#0095a9]"
                                : "stroke-[#28303a]"
                            }`}
                            icon={data.icon}
                          />
                          <motion.div
                            initial={{ opacity: 1, y: 20, display: "none" }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              display: "block",
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <Text
                              type="BodySm(Medium)"
                              className={`${
                                asPath === data.link
                                  ? "text-[#0095a9]"
                                  : "text-[#28303a]"
                              }`}
                            >
                              {data.title}
                            </Text>
                          </motion.div>
                        </div>
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink href={data.link}>
                        <div
                          className={`flex flex-col justify-center items-center ${
                            asPath.includes(data.link) && "active"
                          } hover:scale-105 active:scale-95 duration-200`}
                        >
                          <div className="absolute w-10 h-10">
                            <span className="nav" />
                          </div>
                          <Icons
                            size={20}
                            className={`${
                              asPath.includes(data.link)
                                ? "stroke-[#0095a9]"
                                : "stroke-[#28303a]"
                            }`}
                            icon={data.icon}
                          />
                          <motion.div
                            initial={{ opacity: 1, y: 20, display: "none" }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              display: "block",
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <Text
                              type="BodySm(Medium)"
                              className={`${
                                asPath.includes(data.link)
                                  ? "text-[#0095a9]"
                                  : "text-[#28303a]"
                              }`}
                            >
                              {data.title}
                            </Text>
                          </motion.div>
                        </div>
                      </NavLink>
                    </>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
