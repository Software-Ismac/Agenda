import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Icons, ICONS } from "@llampukaq/icons";
import { useRouter } from "next/router";
import { H1, Text, useIsDesktop, useTailwdincss } from "cllk";

import { useOpenBaas } from "openbaas-sdk-react";
const settingsContext = createContext({});
const useSettingsContext = () => {
  return useContext(settingsContext) as {
    main: "main" | "second";
    setMain: React.Dispatch<React.SetStateAction<"main" | "second">>;
    setC: React.Dispatch<React.SetStateAction<ReactNode>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
  };
};
function Settings({
  children,
  img,
  name,
  description = "Welcom to Llampukaq Tech",
}: {
  children: ReactNode;
  name: string;
  img: ReactNode;
  description?: string;
}) {
  const [main, setMain] = useState<"main" | "second">("main");
  const div = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState();
  const [c, setC] = useState();
  const { isDesktop } = useIsDesktop();
  const scrollToRef = () => {
    if (div.current && !isDesktop) {
      div.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const {} = useOpenBaas();
  return (
    <settingsContext.Provider
      value={{ setMain, title, c, setTitle, setC, scrollToRef }}
    >
      <div
        ref={div}
        className="w-full max-w-[440px] md:max-w-full mx-auto space-y-5 overflow-x-hidden duration-300 min-h-screen"
      >
        <div
          style={{
            transition: "500ms",
            position: "relative",
            left: !isDesktop
              ? main == "main"
                ? "0px"
                : `-${div.current?.clientWidth}px`
              : "",
          }}
          className="flex"
        >
          <div className=" flex-shrink-0 w-full space-y-5 md:max-w-[380px]">
            <div>
              <div className="flex flex-row justify-between w-11/12 mx-auto items-center  px-2 py-4 rounded-xl">
                <div>
                  <Text className="text-[#28303a]" type="BodyMd(Medium)">
                    {name}
                  </Text>
                  <Text className="text-[#28303a]/50" type="BodySm">
                    {description}
                  </Text>
                </div>

                <div className="flex justify-start items-center w-10 h-10 overflow-hidden aspect-square flex-shrink-0">
                  {img}
                </div>
              </div>
            </div>

            {children}
          </div>
          <div className="flex-shrink-0 md:flex-shrink w-full relative">
            <PrintSecond />
          </div>
        </div>
      </div>
    </settingsContext.Provider>
  );
}

const SettingsContainer = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div>
      <div className="w-11/12 mx-auto">
        <Text type="BodyMd(Medium)">{title}</Text>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
};
const SettingsItem = ({
  children,
  icon = "Icon123",
  title,
  description,
}: {
  children: any;
  icon: ICONS;
  title: string;
  description?: string;
}) => {
  const { setMain, setC, setTitle, scrollToRef } = useSettingsContext() as any;
  const router = useRouter();
  const { rounded } = useTailwdincss();
  const { isDesktop } = useIsDesktop();
  const formatText = (text?: string) => {
    const res = text?.replace(/ /g, "").toLowerCase();
    return res?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const { asPath } = useRouter();
  useEffect(() => {
    if (asPath.includes(`#${formatText(title)}`)) {
      if (!isDesktop) {
        scrollToRef();
      }
      setTitle(title);
      setC(children);
      setMain("second");
    }
  }, []);
  return (
    <div
      onClick={() => {
        if (!isDesktop) {
          scrollToRef();
        }
        router.push(`#${formatText(title)}`);
        setTitle(title);
        setC(children);
        setMain("second");
      }}
      className={` w-11/12 mx-auto border-2 border-[#28303a]/20 hover:border-[#28303a]/70 duration-300 p-5 flex justify-between ${rounded} `}
    >
      <div className="flex items-center space-x-5">
        <Icons className="stroke-[#28303a]" size={30} icon={icon} />
        <div>
          <Text type="BodyMd(Medium)">{title}</Text>
          <Text
            className="text-black/50 dark:text-white/50"
            type="BodySm(Medium)"
          >
            {description}
          </Text>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Icons
          className="stroke-[#28303a]"
          size={30}
          icon="IconArrowBadgeRightFilled"
        />
      </div>
    </div>
  );
};
export { Settings, SettingsContainer, SettingsItem };
const PrintSecond = () => {
  const { setMain, title, c } = useSettingsContext() as any;
  const router = useRouter();

  const { isDesktop } = useIsDesktop();
  return (
    <div className="w-11/12 mx-auto">
      <div
        className="flex items-center space-x-5"
        onClick={() => {
          if (!isDesktop) {
            setMain("main");
          }
          router.push("#main");
        }}
      >
        <div className="md:hidden">
          <Icons size={30} icon="IconArrowBadgeLeftFilled"></Icons>
        </div>
        <H1>{title ?? isDesktop ? "Welcome" : "Atras"}</H1>
      </div>
      <div className="relative p-5">{c}</div>
    </div>
  );
};
