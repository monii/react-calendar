import React from "react";
import styled from "styled-components";

function RestDayCell(props) {
  const { restDayList = [], year = "", month = "", day = "" } = props;
  return restDayList.map((info, index) => {
    let targetDay = day.length < 2 ? `0${day}` : day;
    return `${year}${month}${targetDay}` === String(info.locdate) ? (
      <Styled.RestDay>
        <span key={String(index)} className="calendar-restday">
          {info.dateName}
        </span>
      </Styled.RestDay>
    ) : null;
  });
}

const Styled = {
  RestDay: styled.div`
    .calendar-restday {
      display: block;
      margin-bottom: 1.5px;
      text-align: left;
      background-color: #ffcdd2;
      border-radius: 5px;
    }
  `,
};

export default RestDayCell;
