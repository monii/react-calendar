import axios from "axios";

const END_POINT =
  "https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService";

const instance = axios.create({
  baseURL: `${END_POINT}`,
  params: {
    ServiceKey:
      "SctdocqFvY7Uflm+c7p3q7XjSzDLgxzIjoD6a9Vx34cY+UVOGROQjZk0HRcAPYcclf2J1iJWLKdDclCiYmzMGQ==",
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
    } = await instance.get(`/getRestDeInfo`, { params: data });

    return item;
  },
};

export default api;
