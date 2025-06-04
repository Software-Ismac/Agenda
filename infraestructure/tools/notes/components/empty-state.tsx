import React from "react";
import { Button, Card } from "@heroui/react";
import { Icon } from "@iconify/react";

export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}) => {
  return (
    <Card className="w-full py-10 px-4">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-full bg-primary-100 p-4">
          <Icon icon={icon} className="text-4xl text-primary-500" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-default-800">{title}</h3>
          <p className="text-default-500 max-w-xs mx-auto">{description}</p>
        </div>
        
        {actionLabel && onAction && (
          <Button 
            color="primary" 
            onPress={onAction}
            className="mt-2"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
};