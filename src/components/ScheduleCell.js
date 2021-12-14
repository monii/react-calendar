import React from "react";
import styled from "styled-components";

function ScheduleCell(props) {
  const {
    scheduleList = [],
    year = "",
    month = "",
    day = "",
    onClickShowModal = () => {},
  } = props;

  return scheduleList.map((item, index) => {
    const title = item.title;
    const date = item.scheduleDate;
    return `${year}-${month}-${day}` === date ? (
      <Styled.Schedule>
        <span
          key={String(index)}
          className="calendar-schedule"
          onClick={(e) => onClickShowModal({ e: e, type: "delete" })}
          data-index={index}
        >
          {title}
        </span>
      </Styled.Schedule>
    ) : null;
  });
}

const Styled = {
  Schedule: styled.div`
    .calendar-schedule {
      display: block;
      margin-bottom: 1.5px;
      margin-botton: 2px;
      text-align: left;
      background-color: #81d4fa;
      border-radius: 5px;
      cursor: pointer;
    }
  `,
};

export default ScheduleCell;
