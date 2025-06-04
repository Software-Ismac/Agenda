import { Card, CardBody } from "@heroui/react";
import React from "react";
import Text from "../text/Text";
import { ICONS, Icons } from "cllk";

function ButtonCard({ icon, title, ...props }: { title: string; icon: ICONS }) {
  return (
    <Card {...props} isPressable className="w-11/12 mx-auto">
      <CardBody className="flex-row justify-between items-center">
        <Text type="BodyMd(Medium)">{title} </Text>
        <Icons size={40} icon={icon} />
      </CardBody>
    </Card>
  );
}

export default ButtonCard;
