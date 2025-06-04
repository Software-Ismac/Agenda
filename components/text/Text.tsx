import React, { ReactNode } from "react";
export type Props<T = any> = {
  children: ReactNode;
} & Partial<T>;
type TYPE =
  | "H1"
  | "H2"
  | "H3"
  | "H4"
  | "BodyLG"
  | "BodyLg(Medium)"
  | "BodyMd"
  | "BodyMd(Medium)"
  | "BodySm"
  | "BodySm(Medium)";

function Text({
  type = "BodySm(Medium)",
  children,
  className = "text-black",
  size = false,
}: {
  type?: TYPE;
  children: ReactNode;
  className?: string;
  size?: boolean;
}) {
  return (
    <>
      {type == "H1" && (
        <H1 size={size} className={className}>
          {children}
        </H1>
      )}
      {type == "H2" && (
        <H2 size={size} className={className}>
          {children}
        </H2>
      )}
      {type == "H3" && (
        <H3 size={size} className={className}>
          {children}
        </H3>
      )}
      {type == "H4" && (
        <H4 size={size} className={className}>
          {children}
        </H4>
      )}
      {type == "BodyLG" && (
        <BodyLG size={size} className={className}>
          {children}
        </BodyLG>
      )}
      {type == "BodyLg(Medium)" && (
        <BodyLgMedium size={size} className={className}>
          {children}
        </BodyLgMedium>
      )}
      {type == "BodyMd" && (
        <BodyMd size={size} className={className}>
          {children}
        </BodyMd>
      )}
      {type == "BodyMd(Medium)" && (
        <BodyMdMedium size={size} className={className}>
          {children}
        </BodyMdMedium>
      )}
      {type == "BodySm" && (
        <BodySm size={size} className={className}>
          {children}
        </BodySm>
      )}
      {type == "BodySm(Medium)" && (
        <BodySmMedium size={size} className={className}>
          {children}
        </BodySmMedium>
      )}
    </>
  );
}
type Text = Props<{ className?: string; size?: boolean | undefined }>;
export default Text;
const H1 = ({ children, className, size }: Text) => {
  return (
    <h1
      className={`${
        !size && "text-7xl"
      } font-sans font-bold -tracking-wider ${className}`}
    >
      {children}
    </h1>
  );
};
const H2 = ({ children, className, size }: Text) => {
  return (
    <h2
      className={`${
        !size && "text-6xl"
      } font-sans font-semibold -tracking-wider ${className}`}
    >
      {children}
    </h2>
  );
};
const H3 = ({ children, className, size }: Text) => {
  return (
    <h3
      className={`${
        !size && "text-3xl"
      } font-sans font-semibold -tracking-wider ${className}`}
    >
      {children}
    </h3>
  );
};
const H4 = ({ children, className, size }: Text) => {
  return (
    <h4
      className={`${
        !size && "text-2xl"
      } font-sans font-semibold -tracking-wider ${className}`}
    >
      {children}
    </h4>
  );
};
const BodyLG = ({ children, className, size }: Text) => {
  return (
    <p
      className={`${
        !size && "text-xl"
      } font-sans font-normal -tracking-wider ${className}`}
    >
      {children}
    </p>
  );
};
const BodyLgMedium = ({ children, className, size }: Text) => {
  return (
    <p
      className={`${
        !size && "text-xl"
      } font-sans font-bold -tracking-wider ${className}`}
    >
      {children}
    </p>
  );
};
const BodyMd = ({ children, className, size }: Text) => {
  return (
    <p
      className={`${
        !size && "text-base"
      } font-sans font-normal -tracking-wider ${className}`}
    >
      {children}
    </p>
  );
};
const BodyMdMedium = ({ children, className, size }: Text) => {
  return (
    <p
      className={`${
        !size && "text-base"
      } font-sans font-bold -tracking-wider ${className}`}
    >
      {children}
    </p>
  );
};
const BodySm = ({ children, className, size }: Text) => {
  return (
    <p
      className={`${
        !size && "text-sm"
      } font-sans font-normal -tracking-wider ${className}`}
    >
      {children}
    </p>
  );
};
const BodySmMedium = ({ children, className, size }: Text) => {
  return (
    <p
      className={`${
        !size && "text-sm"
      } font-sans font-bold -tracking-wider ${className}`}
    >
      {children}
    </p>
  );
};
