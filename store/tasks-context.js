import { createContext, useReducer } from "react";

const DUMMY_TASKS = [];

export const TasksContext = createContext({
  tasks: [],
  addTask: ({ description, amount, date }) => {},
  deleteTask: (id) => {},
  updateTask: (id, { description, amount, date }) => {},
});

function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableTaskIndex = state.findIndex(
        (task) => task.id === action.payload.id
      );
      const updatableTask = state[updatableTaskIndex];
      const updatedItem = { ...updatableTask, ...action.payload.data };
      const updatedTasks = [...state];
      updatedTasks[updatableTaskIndex] = updatedItem;
      return updatedTasks;
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

function TasksContextProvider({ children }) {
  const [tasksState, dispatch] = useReducer(tasksReducer, DUMMY_TASKS);

  function addTask(taskData) {
    dispatch({
      type: "ADD",
      payload: taskData,
    });
  }

  function deleteTask(id) {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  }

  function updateTask(id, taskData) {
    dispatch({
      type: "UPDATE",
      payload: { id: id, data: taskData },
    });
  }

  const value = {
    tasks: tasksState,
    addTask: addTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export default TasksContextProvider;
