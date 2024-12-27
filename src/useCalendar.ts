import { DateTime } from "luxon";
import { useMemo, useState } from "react";

export type useCalendarParams = {
  initialFocusDate: DateTime;
};

export const useCalendar = ({ initialFocusDate }: useCalendarParams) => {
  const [focusWeekDate, setFocusWeekDate] = useState<DateTime>(
    initialFocusDate.startOf("week")
  );

  const nextWeek = () => {
    setFocusWeekDate((prev) => prev.plus({ weeks: 1 }));
  };

  const prevWeek = () => {
    setFocusWeekDate((prev) => prev.minus({ weeks: 1 }));
  };

  const endOfWeek = useMemo(() => focusWeekDate.endOf("week"), [focusWeekDate]);
  const weekdayArray = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => focusWeekDate.plus({ days: i }));
  }, [focusWeekDate]);

  const addMeeting = (date: DateTime) => {
    console.log("Add meeting", date.toFormat("yyyy-MM-dd HH:mm"));
  };

  return {
    focusWeek: {
      start: focusWeekDate,
      end: endOfWeek,
      dateArray: weekdayArray,
    },
    nextWeek,
    prevWeek,
    addMeeting,
  };
};
