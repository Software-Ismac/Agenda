import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useIsmacData } from "@/context/withContext";
import { Badge, Button, Card, Divider, Tooltip } from "@heroui/react";

// Mock Text component since we don't have access to the original
const Text = ({ children, type, className }: any) => (
  <div
    className={`${className} ${
      type === "BodyLg(Medium)" ? "text-lg font-medium" : ""
    }`}
  >
    {children}
  </div>
);

// Mock useIsmacData hook

function CalendarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-content1 to-content2 p-2 md:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <header className="flex items-center justify-center mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3">
            <Icon
              icon="lucide:calendar"
              className="text-primary text-xl md:text-2xl"
            />
            <Text
              className="text-primary text-xl md:text-2xl font-bold"
              type="BodyLg(Medium)"
            >
              Calendario de Eventos
            </Text>
          </div>
        </header>

        <div className="bg-content1 rounded-lg md:rounded-xl shadow-lg overflow-hidden">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;

export const Calendar = () => {
  const { calendario } = useIsmacData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(null);

  // Calculate calendar dates
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));

  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const days: Date[] = [];
  let day = new Date(startDate);
  while (day <= endDate) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  // Map events to dates
  const eventDates = new Map<string, string[]>();
  calendario.forEach(({ date, description }) => {
    const dateStr = new Date(date).toDateString();
    if (!eventDates.has(dateStr)) eventDates.set(dateStr, []);
    eventDates.get(dateStr)!.push(description);
  });

  const handleDayClick = (day: Date) => {
    const dateStr = day.toDateString();
    setSelectedDateObj(day);

    if (eventDates.has(dateStr)) {
      setSelectedDate(dateStr);
      setSelectedEvents(eventDates.get(dateStr)!);
    } else {
      setSelectedDate(dateStr);
      setSelectedEvents([]);
    }
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction)
    );
    setSelectedDate(null);
    setSelectedEvents([]);
  };

  const formatEventDate = (date: Date | null) => {
    if (!date) return "";

    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="bg-primary p-3 md:p-4 text-white">
        <div className="flex justify-between items-center">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            color="default"
            className="bg-white/20 text-white"
            onPress={() => navigateMonth(-1)}
            aria-label="Mes anterior"
          >
            <Icon icon="lucide:chevron-left" width={18} />
          </Button>

          <h2 className="text-base md:text-xl font-bold capitalize">
            {currentDate.toLocaleString("es-ES", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <Button
            isIconOnly
            size="sm"
            variant="flat"
            color="default"
            className="bg-white/20 text-white"
            onPress={() => navigateMonth(1)}
            aria-label="Mes siguiente"
          >
            <Icon icon="lucide:chevron-right" width={18} />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-2 md:p-4">
        <div className="grid grid-cols-7 gap-1 mb-1 md:mb-2">
          {["L", "M", "X", "J", "V", "S", "D"].map((day, index) => (
            <div
              key={index}
              className="text-center py-1 md:py-2 text-default-600 font-semibold text-xs md:text-sm"
            >
              {window.innerWidth > 400
                ? ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][index]
                : day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dateStr = day.toDateString();
            const isToday = dateStr === new Date().toDateString();
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const events = eventDates.get(dateStr) || [];
            const isSelected = dateStr === selectedDate;
            const hasEvents = events.length > 0;
            const isOnlyClases =
              hasEvents &&
              events.length === 1 &&
              events[0].toLowerCase().trim() === "clases";

            return (
              <Tooltip
                key={index}
                content={
                  hasEvents
                    ? `${events.length} evento${events.length > 1 ? "s" : ""}`
                    : "Sin eventos"
                }
                placement="top"
                delay={300}
                closeDelay={0}
                isDisabled={window.innerWidth < 640 || isOnlyClases}
              >
                <Button
                  className={`h-9 md:h-12 w-full flex flex-col items-center justify-center p-0 ${
                    !isCurrentMonth ? "opacity-40" : ""
                  }`}
                  size="sm"
                  color={
                    isSelected
                      ? "primary"
                      : isToday
                      ? "secondary"
                      : hasEvents && !isOnlyClases
                      ? "success"
                      : "default"
                  }
                  variant={
                    isSelected
                      ? "solid"
                      : isToday
                      ? "bordered"
                      : hasEvents && !isOnlyClases
                      ? "flat"
                      : "light"
                  }
                  onPress={() => handleDayClick(day)}
                  disableRipple={!isCurrentMonth}
                  isDisabled={!isCurrentMonth}
                >
                  <span className="text-xs md:text-sm font-medium">
                    {day.getDate()}
                  </span>

                  {/* Si es solo clases, mostrar texto simple debajo */}
                  {isOnlyClases && (
                    <span className="text-[10px] md:text-xs text-default-500">
                      clases
                    </span>
                  )}

                  {/* Si hay eventos y no es "solo clases", mostrar puntos o badge */}
                  {hasEvents && !isOnlyClases && (
                    <div className="flex gap-0.5 mt-0.5 md:mt-1">
                      {events.length > 2 ? (
                        //@ts-ignore
                        <Badge
                          size="sm"
                          content={events.length}
                          color="primary"
                          className="absolute bottom-0 right-0 scale-75 md:scale-100"
                        />
                      ) : (
                        Array(Math.min(events.length, 2))
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="w-1 h-1 rounded-full bg-current"
                            />
                          ))
                      )}
                    </div>
                  )}
                </Button>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* Events Display */}
      {selectedDate && (
        <div className="px-2 md:px-4 pb-3 md:pb-4">
          <Divider className="my-2" />
          <Card className="p-0 overflow-hidden">
            <div
              className={`p-2 md:p-3 ${
                selectedEvents.length > 0
                  ? "bg-success text-white"
                  : "bg-default-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  icon="lucide:calendar-days"
                  width={16}
                  className="md:w-[18px]"
                />
                <h3 className="text-sm md:text-md font-semibold capitalize">
                  {formatEventDate(selectedDateObj)}
                </h3>
              </div>
            </div>

            <div className="p-3 md:p-4">
              {selectedEvents.length > 0 ? (
                <ul className="space-y-2">
                  {selectedEvents.map((event, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm md:text-base"
                    >
                      <Icon
                        icon="lucide:check-circle"
                        className="text-success mt-0.5 text-sm md:text-base"
                      />
                      <span>{event}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-3 md:py-4 text-default-400">
                  <Icon
                    icon="lucide:calendar-off"
                    width={24}
                    className="mb-2 md:w-[32px]"
                  />
                  <p className="text-sm md:text-base">
                    No hay eventos programados para este día
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
