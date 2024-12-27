import * as d3 from "d3";
import { DateTime } from "luxon";
import { useEffect, useRef } from "react";

const width = 600;
const height = 1000;

const headerHeight = 100;

const data = [
  "02-01-2021",
  "03-01-2021",
  "04-01-2021",
  "05-01-2021",
  "06-01-2021",
  "07-01-2021",
  "08-01-2021",
];

const eventsMock = [
  {
    startTime: "2021-01-02T10:00:00",
    endTime: "2021-01-02T11:00:00",
  },
  {
    startTime: "2021-01-02T12:00:00",
    endTime: "2021-01-02T13:00:00",
  },
  {
    startTime: "2021-01-02T14:00:00",
    endTime: "2021-01-02T15:00:00",
  },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function App() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    const weekBandScale = d3
      .scaleBand()
      .domain(weekDays)
      .range([0, width])
      .paddingInner(0)
      .paddingOuter(0)
      .align(0)
      .padding(0);

    const hourScale = d3
      .scaleLinear()
      .domain([0, 24])
      .range([0, height - headerHeight - 1]);
    const halfHourScale = d3
      .scaleLinear()
      .domain([0, 48])
      .range([0, height - headerHeight - 1]);

    const headerGroup = svg
      .append("g")
      .classed("header", true)
      .attr("width", width)
      .attr("height", headerHeight)
      .attr("fill", "black");

    const bodyGroup = svg
      .append("g")
      .attr("width", width)
      .attr("height", height - headerHeight)
      .attr("fill", "black")
      .attr("transform", `translate(0, ${headerHeight})`);

    const headerCell = headerGroup.selectAll().data(data).enter().append("g");

    const bodyCell = bodyGroup.selectAll("g").data(data).enter();

    headerCell
      .append("text")
      .text((d) => DateTime.fromFormat(d, "dd-MM-yyyy").toFormat("d"))
      .attr("x", (_, i) => weekBandScale(weekDays[i])!)
      .attr("y", 50)
      .attr("width", 50)
      .attr("height", headerHeight)
      .attr("fill", "black")
      .style("font-size", "40px");

    headerCell
      .append("text")
      .text((d) => DateTime.fromFormat(d, "dd-MM-yyyy").toFormat("ccc"))
      .attr("x", (_, i) => weekBandScale(weekDays[i])!)
      .attr("y", 70)
      .attr("width", 50)
      .attr("height", headerHeight)
      .attr("fill", "black")
      .style("font-size", "16px");

    bodyCell
      .append("line")
      .attr("x1", (_, i) => weekBandScale(weekDays[i])!)
      .attr("y2", -10)
      .attr("x2", (_, i) => weekBandScale(weekDays[i])!)
      .attr("y1", height)
      .attr("stroke", "black");

    bodyGroup
      .append("g")
      .call(
        d3.axisLeft(hourScale).ticks(24).tickSize(width).tickSizeInner(-width)
      );

    bodyGroup
      .append("g")
      .style("stroke-dasharray", "5 5")
      .call(
        d3
          .axisLeft(halfHourScale)
          .ticks(48)
          .tickSize(width)
          .tickSizeInner(-width)
      );

    bodyGroup
      .selectAll("rect")
      .data(eventsMock)
      .enter()
      .append("rect")
      .attr("x", (d) => {
        const startTime = DateTime.fromISO(d.startTime);
        return weekBandScale(weekDays[startTime.weekday - 1])!;
      })
      .attr("y", (d) => {
        const startTime = DateTime.fromISO(d.startTime);
        return hourScale(startTime.hour);
      })
      .attr("width", 50)
      .attr("height", (d) => {
        const startTime = DateTime.fromISO(d.startTime);
        const endTime = DateTime.fromISO(d.endTime);
        return hourScale(endTime.hour - startTime.hour);
      })
      .attr("fill", "red");

    return () => {
      svg.selectAll("*").remove();
    };
  }, [ref]);

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      style={{
        position: "absolute",
        top: 0,
        left: 50,
      }}
    />
  );
}

export default App;
