import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTasksThunk,
  createTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
  toggleTaskThunk,
} from "./taskThunks";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  modal: { open: false, mode: "add", task: null }, // mode: add | edit
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.modal = { open: true, mode: "add", task: null };
    },
    openEditModal: (state, action) => {
      state.modal = { open: true, mode: "edit", task: action.payload };
    },
    closeModal: (state) => {
      state.modal = { open: false, mode: "add", task: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.tasks;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload.task);
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          (t) => t._id === action.payload.task._id
        );
        if (idx !== -1) state.items[idx] = action.payload.task;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      })
      .addCase(toggleTaskThunk.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          (t) => t._id === action.payload.task._id
        );
        if (idx !== -1) state.items[idx] = action.payload.task;
      });
  },
});

export const { openAddModal, openEditModal, closeModal } = taskSlice.actions;
export default taskSlice.reducer;