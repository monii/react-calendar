import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import RestDayCell from "./RestDayCell";
import ScheduleCell from "./ScheduleCell";
import Modal from "./Modal";

function CalnerdarPresenter(props) {
  const DAY = ["일", "월", "화", "수", "목", "금", "토"];
  const {
    year = "",
    month = "",
    todayFull = "",
    isModalShow = false,
    type = "",
    dateList = [],
    restDayList = [],
    title = "",
    scheduleDate = "",
    changeMonth = () => {},
    clickTodayBtn = () => {},
    onClickShowModal = () => {},
    onClickModalBtn = () => {},
    handleSchedule = () => {},
    onChangeInputVal = () => {},
  } = props;

  const { data = {} } = useSelector((state) => state.calendar);
  const reducerData = {
    scheduleList: data.schedule_item_list || [],
  };

  return (
    <Styled.Calender>
      <section className="calendar-header">
        <div className="header-right">
          <p>
            {year}년 {month}월
          </p>
        </div>
        <div className="header-left">
          <button
            className="header-btn"
            onClick={(e) => onClickShowModal({ e: e, type: "add" })}
          >
            일정 추가
          </button>
          <button className="header-btn" onClick={() => changeMonth("prev")}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="header-btn" onClick={clickTodayBtn}>
            오늘
          </button>
          <button className="header-btn" onClick={() => changeMonth("next")}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>
      <section className="calendar-body">
        <div className="calendar-body-header">
          <ul className="calendar-days">
            {DAY.map((item, index) => (
              <li key={String(index)} className="calendar-day">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="calendar-body-main">
          <table className="calendar-table">
            <tbody>
              {dateList.map((days, index) => (
                <tr key={index}>
                  {days.map((day) => {
                    let formatYear = day.format("YYYY");
                    let formatMonth = day.format("MM");
                    let formatDay = day.format("DD");
                    return (
                      <td key={String(day)} className="calendar-table-td">
                        <span
                          className={cx(
                            "table-day",
                            todayFull ===
                              `${formatYear}${formatMonth}${formatDay}`
                              ? "active"
                              : "",
                            formatMonth !== month ? "day-to-gray" : ""
                          )}
                        >
                          {formatDay}
                        </span>
                        {restDayList.length && restDayList.length > 0 && (
                          <RestDayCell
                            restDayList={restDayList}
                            year={formatYear}
                            month={formatMonth}
                            day={formatDay}
                          />
                        )}
                        {reducerData.scheduleList &&
                          reducerData.scheduleList.length > 0 && (
                            <ScheduleCell
                              scheduleList={reducerData.scheduleList}
                              year={formatYear}
                              month={formatMonth}
                              day={formatDay}
                              onClickShowModal={onClickShowModal}
                            />
                          )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        {isModalShow && (
          <Modal
            type={type}
            title={title}
            scheduleDate={scheduleDate}
            isModalShow={isModalShow}
            onClickModalBtn={onClickModalBtn}
            handleSchedule={handleSchedule}
            onChangeInputVal={onChangeInputVal}
          />
        )}
      </section>
    </Styled.Calender>
  );
}

const Styled = {
  Calender: styled.div`
    margin: 15px;
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header-right {
      font-size: 24px;
      font-weight: bold;
    }
    .header-btn:not(:last-child) {
      margin-right: 10px;
    }
    .calendar-days {
      display: flex;
      padding: 0px;
      list-style: none;
    }
    .calendar-day {
      width: calc(100% / 7);
      text-align: center;
      border: 1px solid;
    }
    .calendar-table {
      width: 100%;
    }
    .calendar-table-td {
      width: calc(100% / 7);
      height: 110px;
      text-align: right;
      vertical-align: top;
      padding: 5px;
      border: 1px solid;
    }
    .active {
      display: inline-block;
      background-color: #f72525;
      border-radius: 100%;
      width: 25px;
      height: 25px;
      color: #fff;
      font-weight: bolder;
      text-align: center;
    }
    .table-day {
      font-weight: 700;
    }
    .day-to-gray {
      color: #bdbdbd;
    }
  `,
};

export default CalnerdarPresenter;
