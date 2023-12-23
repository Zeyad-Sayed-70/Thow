import { createSlice } from "@reduxjs/toolkit";
import {
  createCourseCard,
  createCourseContents,
  createCourseDetails,
  getCourseCards,
  getCourseDetails,
  getCoursecContents,
} from "./thunks";

interface InitialState {
  isCourseCardLoading: boolean;
  isCourseCardSuccess: boolean;
  isCourseCardFailed: boolean;
  isCourseDetailsLoading: boolean;
  isCourseDetailsSuccess: boolean;
  isCourseDetailsFailed: boolean;
  isCourseContentsLoading: boolean;
  isCourseContentsSuccess: boolean;
  isCourseContentsFailed: boolean;
  message: string;
  cards: any[];
  details: any;
  contents: any;
}

const initialState: InitialState = {
  isCourseCardLoading: false,
  isCourseCardSuccess: false,
  isCourseCardFailed: false,
  isCourseDetailsLoading: false,
  isCourseDetailsSuccess: false,
  isCourseDetailsFailed: false,
  isCourseContentsLoading: false,
  isCourseContentsSuccess: false,
  isCourseContentsFailed: false,
  message: "",
  cards: [],
  details: null,
  contents: [],
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createCourseCard.pending, (state) => {
        state.isCourseCardLoading = true;
        state.isCourseCardSuccess = false;
        state.isCourseCardFailed = false;
        state.cards = [];
      })
      .addCase(createCourseCard.fulfilled, (state, action) => {
        state.isCourseCardLoading = false;
        state.isCourseCardSuccess = true;
        state.isCourseCardFailed = false;
        state.message = action.payload.data.message;
      })
      .addCase(createCourseCard.rejected, (state, action) => {
        state.isCourseCardLoading = false;
        state.isCourseCardSuccess = false;
        state.isCourseCardFailed = true;
        state.message = (action.payload as any).error.message;
      })
      .addCase(getCourseCards.pending, (state) => {
        state.isCourseCardLoading = true;
        state.isCourseCardSuccess = false;
        state.isCourseCardFailed = false;
      })
      .addCase(getCourseCards.fulfilled, (state, action) => {
        state.isCourseCardLoading = false;
        state.isCourseCardSuccess = true;
        state.isCourseCardFailed = false;
        state.message = action.payload.data.message;
        state.cards = action.payload.data.cards;
      })
      .addCase(getCourseCards.rejected, (state, action) => {
        state.isCourseCardLoading = false;
        state.isCourseCardSuccess = false;
        state.isCourseCardFailed = true;
        state.message = action.error.message as string;
      })
      .addCase(getCourseDetails.pending, (state) => {
        state.isCourseDetailsLoading = true;
        state.isCourseDetailsSuccess = false;
        state.isCourseDetailsFailed = false;
      })
      .addCase(getCourseDetails.fulfilled, (state, action) => {
        state.isCourseDetailsLoading = false;
        state.isCourseDetailsSuccess = true;
        state.isCourseDetailsFailed = false;
        state.message = action.payload.data.message;
        state.details = action.payload.data.courseDetails;
      })
      .addCase(getCourseDetails.rejected, (state, action) => {
        state.isCourseDetailsLoading = false;
        state.isCourseDetailsSuccess = false;
        state.isCourseDetailsFailed = true;
        state.message = action.error.message as string;
      })
      // .addCase(createCourseDetails.pending, (state) => {
      //   state.isCreateCourseCardLoading = true;
      //   state.isCreateCourseCardSuccess = false;
      // })
      // .addCase(createCourseDetails.fulfilled, (state, action) => {
      //   state.isCreateCourseCardLoading = false;
      //   state.isCreateCourseCardSuccess = true;
      // })
      .addCase(getCoursecContents.pending, (state) => {
        state.isCourseContentsLoading = true;
        state.isCourseContentsSuccess = false;
        state.isCourseContentsFailed = false;
      })
      .addCase(getCoursecContents.fulfilled, (state, action) => {
        state.isCourseContentsLoading = false;
        state.isCourseContentsSuccess = true;
        state.isCourseContentsFailed = false;
        state.message = action.payload.data.message;
        state.contents = action.payload.data.contents;
      })
      .addCase(getCoursecContents.rejected, (state, action) => {
        state.isCourseContentsLoading = false;
        state.isCourseContentsSuccess = false;
        state.isCourseContentsFailed = true;
        state.message = action.error.message as string;
      });
    // .addCase(createCourseContents.pending, (state) => {
    //   state.isCreateCourseCardLoading = true;
    //   state.isCreateCourseCardSuccess = false;
    // })
    // .addCase(createCourseContents.fulfilled, (state, action) => {
    //   state.isCreateCourseCardLoading = false;
    //   state.isCreateCourseCardSuccess = true;
    // });
  },
});

export const {} = courseSlice.actions;

export default courseSlice.reducer;
