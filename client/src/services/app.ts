import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const appApi = createApi({
  reducerPath: "app",
  baseQuery: fetchBaseQuery({}),
  endpoints: () => ({}),
});

export default appApi;
