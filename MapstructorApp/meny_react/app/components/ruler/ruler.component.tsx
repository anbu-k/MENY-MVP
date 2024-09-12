import moment from "moment";

const RulerComponent = () => {
    var sliderStart: number = moment("01/01/1626").unix();
    var sliderStartDrag: number = sliderStart;
    var sliderEnd: number = moment("01/01/1700").unix();
    var sliderEndDrag: number = sliderEnd;
    var sliderMiddle: number = (sliderStart + sliderEnd) / 2;
    var tooltiPos: number = -100;
  
    var ruler_step: number = (sliderEnd - sliderStart) / 10,
    date_ruler1: number = sliderStart + ruler_step,
    date_ruler2: number = sliderStart + ruler_step * 3,
    date_ruler4: number = sliderStart + ruler_step * 7,
    date_ruler5: number = sliderStart + ruler_step * 9;

    return (
        <div id="slider">
            <div id="mobi-year">...</div>

            <div className="timeline">
            <div className="year">
                <span id="ruler-date1"> ... </span><span className="timeline-ruler"></span>
            </div>
            <div className="year">
                <span id="ruler-date2"> ... </span><span className="timeline-ruler"></span>
            </div>
            <div className="year">
                <span id="ruler-date3"> ... </span><span className="timeline-ruler"></span>
            </div>
            <div className="year">
                <span id="ruler-date4"> ... </span><span className="timeline-ruler"></span>
            </div>
            <div className="year">
                <span id="ruler-date5"> ... </span><span className="timeline-ruler"></span>
            </div>
            </div>
        </div>
    );
}

export default RulerComponent