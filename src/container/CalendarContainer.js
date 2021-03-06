import React, { useEffect } from "react";
import moment from "moment";
import { useImmer } from "use-immer";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../components/Calnerdar";
import api from "../utils/api";
import * as config from "../utils/config";
import * as CalendarActions from "../store/calendar";

function CalendarContainer() {
  const calendarState = {
    year: moment().format("YYYY"),
    month: moment().format("MM"),
    todayFull: moment().format("YYYYMMDD"),
    moment: moment(),
    title: "",
    scheduleDate: "",
    type: "",
    deleteTargetIndex: "",
    dateList: [],
    restDayList: [],
    isModalShow: false,
  };
  const dispatch = useDispatch();
  const { data = {} } = useSelector((state) => state.calendar);
  const reducerData = {
    scheduleList: data.schedule_item_list || [],
  };
  const [values, setValues] = useImmer(calendarState);

  // 날짜 리스트 취득
  const getDayArray = () => {
    const firstWeek = values.moment.clone().startOf("month").week();
    const lastWeek =
      values.moment.clone().endOf("month").week() === 1
        ? 53
        : values.moment.clone().endOf("month").week();
    let dateList = [];

    for (let week = firstWeek; week <= lastWeek; week++) {
      let oneWeek = Array(7)
        .fill(true)
        .map((_, index) => {
          let day = values.moment
            .clone()
            .startOf("year")
            .week(week)
            .startOf("week")
            .add(index, "day");
          return day;
        });
      dateList.push(oneWeek);
    }
    setValues((draft) => {
      draft.dateList = dateList;
    });
  };

  //공휴일 정보 취득
  const getRestDay = async () => {
    const prams = {
      solYear: values.year,
      solMonth: values.month,
    };
    const restDays = await api.getRestDay(prams);
    if (restDays) {
      setValues((draft) => {
        draft.restDayList = restDays.length > 0 ? restDays : [restDays];
      });
    }
  };

  //달 변경
  const changeMonth = (type) => {
    if (type === config.PREV_MONTH) {
      setValues((draft) => {
        draft.year = moment(`${values.year}${values.month}`)
          .subtract(1, "months")
          .format("YYYY");
        draft.month = moment(`${values.year}${values.month}`)
          .subtract(1, "months")
          .format("MM");
        draft.moment = moment(`${values.year}${values.month}`).subtract(
          1,
          "months"
        );
      });
    } else if (type === config.NEXT_MONTH) {
      setValues((draft) => {
        draft.year = moment(`${values.year}${values.month}`)
          .clone()
          .add(1, "months")
          .format("YYYY");
        draft.month = moment(`${values.year}${values.month}`)
          .clone()
          .add(1, "months")
          .format("MM");
        draft.moment = moment(`${values.year}${values.month}`)
          .clone()
          .add(1, "months");
      });
    }
  };

  // 일정 등록 onChange
  const onChangeInputVal = (e) => {
    const { name, value } = e.target;
    setValues((draft) => {
      draft[name] = value;
    });
  };

  //오늘로 이동
  const clickTodayBtn = () => {
    setValues((draft) => {
      draft.year = moment().format("YYYY");
      draft.month = moment().format("MM");
      draft.moment = moment();
    });
  };

  //일정추가
  const onClickShowModal = ({ e, type }) => {
    const clickedId = e.target.dataset.index;
    setValues((draft) => {
      draft.isModalShow = !values.isModalShow;
      draft.type = type;
    });
    if (type === config.ADD) {
      setValues((draft) => {
        draft.title = "";
        draft.scheduleDate = "";
      });
    } else if (type === config.DELETE) {
      const resulet = reducerData.scheduleList.filter(
        (_, index) => index === Number(clickedId)
      );
      setValues((draft) => {
        draft.title = resulet[0].title;
        draft.scheduleDate = resulet[0].scheduleDate;
        draft.deleteTargetIndex = clickedId;
      });
    }
  };

  //모달 버튼
  const onClickModalBtn = async ({ e, type }) => {
    if (type === "close") {
      setValues((draft) => {
        draft.isModalShow = !values.isModalShow;
      });
    } else if (type === "add") {
      e.preventDefault();
      const formData = {
        title: values.title,
        scheduleDate: values.scheduleDate,
      };
      await dispatch(CalendarActions.updateScheduleData(formData, type));
      setValues((draft) => {
        draft.isModalShow = !values.isModalShow;
        draft.title = "";
        draft.scheduleDate = "";
      });
    } else if (type === "delete") {
      e.preventDefault();
      const formData = {
        deleteTarget: values.deleteTargetIndex,
      };
      await dispatch(CalendarActions.updateScheduleData(formData, type));
      setValues((draft) => {
        draft.isModalShow = !values.isModalShow;
        draft.title = "";
        draft.scheduleDate = "";
      });
    }
  };

  useEffect(() => {
    getDayArray();
    getRestDay();
  }, [values.month, data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Calendar
      {...values}
      changeMonth={changeMonth}
      clickTodayBtn={clickTodayBtn}
      onClickShowModal={onClickShowModal}
      onClickModalBtn={onClickModalBtn}
      onChangeInputVal={onChangeInputVal}
    />
  );
}

export default CalendarContainer;
