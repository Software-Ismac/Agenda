import React from "react";
import { Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

interface App {
  id: string;
  name: string;
  icon: string;
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  frequent?: boolean;
  link?: string;
}

interface AppGridProps {
  apps: App[];
}

export const AppGrid: React.FC<AppGridProps> = ({ apps }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-foreground-400 mx-auto">
        <Icon icon="lucide:search-x" className="w-12 h-12 mb-4" />
        <p>No applications found</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 "
      variants={container}
      initial="hidden"
      animate="show"
    >
      {apps.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </motion.div>
  );
};

const AppCard: React.FC<{ app: App }> = ({ app }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const getIconColorClass = (color: App["color"]) => {
    const colorMap = {
      default: "text-default-600",
      primary: "text-primary-500",
      secondary: "text-secondary-500",
      success: "text-success-500",
      warning: "text-warning-500",
      danger: "text-danger-500",
    };
    return colorMap[color];
  };

  const getBgColorClass = (color: App["color"]) => {
    const colorMap = {
      default: "bg-default-100",
      primary: "bg-primary-50",
      secondary: "bg-secondary-50",
      success: "bg-success-50",
      warning: "bg-warning-50",
      danger: "bg-danger-50",
    };
    return colorMap[color];
  };

  return (
    <motion.div variants={item}>
      <Card
        as={Link}
        href={app.link}
        isPressable
        isHoverable
        className="flex flex-col items-center justify-center p-4 h-[120px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <div
          className={`aspect-square rounded-full p-3 mb-3 ${getBgColorClass(
            app.color
          )} flex justify-center items-center`}
        >
          <Icon
            icon={app.icon}
            className={`w-8 h-8 ${getIconColorClass(app.color)}`}
          />
        </div>
        <span className="text-sm font-medium text-center">{app.name}</span>
      </Card>
    </motion.div>
  );
};
