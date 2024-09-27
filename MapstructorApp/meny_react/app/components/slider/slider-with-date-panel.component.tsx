import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import DatePanelComponent from "./date-panel/date-panel.component";
import "../../slider-timelines.css";

type SliderWithDatePanelProps = {
  callback: (date: moment.Moment | null) => void;
};

const SliderWithDatePanel: React.FC<SliderWithDatePanelProps> = (props) => {
  const [currDate, setCurrDate] = useState<moment.Moment | null>(moment("1663", "YYYY")); // Start at 1663
  const [sliderValue, setSliderValue] = useState<number>(1663); // Start at 1663 (middle)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const minYear = 1626;
  const maxYear = 1700;

  // Update the date based on slider position
  const updateDate = (year: number) => {
    const newDate = moment([year, 0, 1]); // January 1st of the selected year
    setCurrDate(newDate);
    props.callback(newDate);
  };

  const calculateYearFromPosition = (positionX: number, sliderWidth: number) => {
    const percentage = positionX / sliderWidth;
    const year = minYear + Math.round(((maxYear - minYear) * percentage));
    return Math.min(Math.max(year, minYear), maxYear); // Clamp the year between min and max
  };

  const moveSlider = (positionX: number, sliderWidth: number) => {
    const year = calculateYearFromPosition(positionX, sliderWidth);
    setSliderValue(year);
    updateDate(year);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const slider = sliderRef.current;
    if (slider) {
      const rect = slider.getBoundingClientRect();
      moveSlider(e.clientX - rect.left, rect.width);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && sliderRef.current) {
      const slider = sliderRef.current;
      const rect = slider.getBoundingClientRect();
      moveSlider(e.clientX - rect.left, rect.width);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  return (
    <div>
      <DatePanelComponent currDate={currDate} />

      <div id="footer">
        <div className="timeline">
          <div className="year">
            <span id="ruler-date1">1633</span>
            <span className="timeline-ruler"></span>
          </div>
          <div className="year">
            <span id="ruler-date2">1648</span>
            <span className="timeline-ruler"></span>
          </div>
          <div className="year">
            <span id="ruler-date3">&nbsp; ⇦ &nbsp; TIME &nbsp; SLIDE &nbsp; ⇨</span>
            <span className="timeline-ruler"></span>
          </div>
          <div className="year">
            <span id="ruler-date4">1677</span>
            <span className="timeline-ruler"></span>
          </div>
          <div className="year">
            <span id="ruler-date5">1692</span>
            <span className="timeline-ruler"></span>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div
          id="horizontal-slider"
          ref={sliderRef}
          onMouseDown={handleMouseDown} // Start drag on mousedown
          className="slider-container-horizontal"
        >
          <div className="slider-track-horizontal"></div>
          <div
            className="slider-handle-horizontal"
            style={{ left: `${((sliderValue - minYear) / (maxYear - minYear)) * 100}%` }} // Adjust slider handle position horizontally
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SliderWithDatePanel;
