import { createAsyncThunk } from "@reduxjs/toolkit";
import * as taskApi from "../../api/taskApi";

export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await taskApi.getTasks(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const createTaskThunk = createAsyncThunk(
  "tasks/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await taskApi.createTask(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  "tasks/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await taskApi.updateTask(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await taskApi.deleteTask(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const toggleTaskThunk = createAsyncThunk(
  "tasks/toggle",
  async (id, { rejectWithValue }) => {
    try {
      const res = await taskApi.toggleTaskComplete(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);