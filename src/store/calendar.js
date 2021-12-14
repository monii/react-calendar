import { handleActions } from "redux-actions";
import produce from "immer";
import * as config from "../utils/config";

const UPDATE_SCHEDULE = "calendar/UPDATE_SCHEDULE";

const initialState = {
  data: {
    schedule_item_list: [],
  },
};

// NOTE: 스케쥴 업데이트
export const updateScheduleData = (formData, type) => (dispatch) => {
  const reducerData = {
    type: type,
    formData: formData,
  };
  dispatch({ type: UPDATE_SCHEDULE, payload: reducerData });
};

export default handleActions(
  {
    [UPDATE_SCHEDULE]: (state, { payload }) => {
      return produce(state, (draft) => {
        try {
          if (payload.type === config.ADD) {
            draft.data.schedule_item_list.push(payload.formData);
          } else if (payload.type === config.DELETE) {
            draft.data.schedule_item_list =
              state.data.schedule_item_list.filter(
                (_, index) => index !== Number(payload.formData.deleteTarget)
              );
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
  },
  initialState
);
