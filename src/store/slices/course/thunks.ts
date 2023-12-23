import { COURSE_API } from "@/store/APIs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCourseCard = createAsyncThunk(
  "course/create-card",
  async (data) => {
    try {
      const response = await axios.post(`${COURSE_API}/create-card`, data);

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getCourseCards = createAsyncThunk(
  "course/get-cards",
  async ({ name, type }: { name?: string; type?: string }) => {
    try {
      const response = await axios.get(
        `${COURSE_API}/fetch-cards?name=${name ? name : ""}&type=${
          type ? type : ""
        }`
      );

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const createCourseDetails = createAsyncThunk(
  "course/create-details",
  async (data) => {
    try {
      const response = await axios.post(`${COURSE_API}/create-details`, data);

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getCourseDetails = createAsyncThunk(
  "course/get-details",
  async (name: string) => {
    try {
      const response = await axios.get(
        `${COURSE_API}/fetch-details?course_name=${name}`
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const createCourseContents = createAsyncThunk(
  "course/create-contents",
  async (data) => {
    try {
      const response = await axios.post(`${COURSE_API}/create-contents`, data);

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getCoursecContents = createAsyncThunk(
  "course/get-contents",
  async (course_name: string) => {
    try {
      const response = await axios.get(
        `${COURSE_API}/fetch-contents?course_name=${course_name}`
      );

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
