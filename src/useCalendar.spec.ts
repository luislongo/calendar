import { describe, expect, it } from "vitest";
import { useCalendar } from "./useCalendar";
import { DateTime } from "luxon";
import { renderHook } from "@testing-library/react";

describe("useCalendar", () => {
  it("should be a function", () => {
    expect(typeof useCalendar).toBe("function");
  });

  it("should return a focusWeek that is the start of the week", () => {
    const initialFocusDate = DateTime.now();
    const { result } = renderHook(() => useCalendar({ initialFocusDate }));

    expect(result.current.focusWeek.weekday).toBe(1);
    expect(
      result.current.focusWeek.diff(initialFocusDate.startOf("week")).days
    ).toBe(0);
  });
});
