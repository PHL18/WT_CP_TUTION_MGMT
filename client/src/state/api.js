import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Students",
    "Teachers",
    "Transactions",
    "Geography",
    "Sales",
    "Daily",
    "Breakdown",
    "Admin",
    "Performance",
    "Dashboard",
    "Auth",
    "Add",
    "Delete"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getStudents: build.query({
      query: () => "client/students",
      providesTags: ["Students"],
    }),
    getTeachers: build.query({
      query: () => "client/teachers",
      providesTags: ["Teachers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getDaily: build.query({
      query: () => "sales/daily",
      providesTags: ["Daily"],
    }),
    getNewTransaction: build.query({
      query: () => "client/transactions",
      providesTags: ["Breakdown"],
    }),
    getAdmins: build.query({
      query: () => "management/admin",
      providesTags: ["Admin"],
    }),
    getPerformance: build.query({
      query: () => "client/performance",
      providesTags: ["Performance"],
    }),
    getDashboardStats: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getLogin: build.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    getSignup: build.mutation({
      query: (userData) => ({
        url: "auth/signup",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    addStudent: build.mutation({
      query: (newStudent) => ({
        url: "client/students",
        method: "POST",
        body: newStudent,
     
      }),
      invalidatesTags:["Add"]
    }),
    deleteStudent:build.mutation({
        query:()=>({
            url:"client/students",
            method:"DELETE"
        }),
        invalidatesTags:["Delete"]
    })
  }),
});
export const {
  useGetUserQuery,
  useGetStudentsQuery,
  useGetTeachersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetDailyQuery,
  useGetNewTransactionQuery,
  useGetAdminsQuery,
  useGetPerformanceQuery,
  useGetDashboardStatsQuery,
  useGetLoginMutation,
  useGetSignupMutation,
  useAddStudentMutation,
  useDeleteStudentMutation
} = api;
