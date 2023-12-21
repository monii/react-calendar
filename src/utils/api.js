import axios from "axios";

// const END_POINT =
//   "https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService";

// 로컬용 END_PONT
 const END_POINT = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService";

const calendarAxios = axios.create({
  baseURL: `${END_POINT}`,
  params: {
    ServiceKey: process.env.REACT_APP_API_SERVICE_KEY
  },
});

const api = {
  getRestDay: async (data) => {
    console.log("call api");
    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = await calendarAxios.get(`/getRestDeInfo`, { params: data });

    return item;
  },
};

export default api;
