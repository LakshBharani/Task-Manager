import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import { TasksContext } from "../store/tasks-context";
import TasksOutput from "../components/TasksOutput/TasksOutput";

const AllTasks = () => {
  const tasksCtx = useContext(TasksContext);

  return (
    <TasksOutput
      tasks={tasksCtx.tasks}
      tasksPeriod={"Total Time"}
      fallBackText="No registered tasks found"
    />
  );
};

export default AllTasks;

const styles = StyleSheet.create({});
