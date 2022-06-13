import type { NextApiRequest, NextApiResponse } from "next";
import {
  StudentInfo,
  ListStudentOrders,
  ResponseList,
  ResponseInfo,
} from "../libs/types";

const fetcher = {
  list: async (): Promise<ResponseList> => {
    try {
      const url =
        "http://ec2-3-239-221-74.compute-1.amazonaws.com:8000/api/v1/students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/orders/";
      const options = {
        method: "GET",
        headers: {
          hash: "OcJn4jYChW",
          "Content-Type": "application/json",
        },
        ReferrerPolicy: "strict-origin-when-cross-origin",
        Cache: "no-cache",
      };
      const res = await fetch(url, { ...options });
      if (res.ok) {
        return res.json().then((data) => {
          return { action: 1, data: data };
        });
      }
      throw new Error("Something went wrong.");
    } catch (error) {
      console.log("Request failed", error);
      return { action: 2, data: null };
    }
  },
  info: async (): Promise<ResponseInfo> => {
    try {
      const url =
        "http://ec2-3-239-221-74.compute-1.amazonaws.com:8000/api/v1/students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/";
      const options = {
        method: "GET",
        headers: {
          hash: "OcJn4jYChW",
          "Content-Type": "application/json",
        },
        ReferrerPolicy: "strict-origin-when-cross-origin",
        Cache: "no-cache",
      };

      const res = await fetch(url, { ...options });
      if (res.ok)
        return res.json().then((data) => {
          return { action: 1, data: data };
        });
      throw new Error("Something went wrong.");
    } catch (error) {
      console.log("Request failed", error);
      return { action: 2, data: null };
    }
  },
};
export default fetcher;
