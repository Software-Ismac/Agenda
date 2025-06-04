interface DataStyle
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
}
function PrintData({ children, title, ...props }: DataStyle) {
  return (
    <>
      <IsUndefined {...props} value={children} className="flex justify-between">
        <Text type="BodySm(Medium)">{title}:</Text>
        <Text className="text-black/80 dark:text-white/80" type="BodySm">
          {children}
        </Text>
      </IsUndefined>
    </>
  );
}

export default PrintData;
import React, { ReactNode } from "react";
import Text from "./Text";
interface IsU
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  value: any;
}
function IsUndefined({ value, children, ...props }: IsU) {
  return <div {...props}>{value != undefined ? children : null}</div>;
}
