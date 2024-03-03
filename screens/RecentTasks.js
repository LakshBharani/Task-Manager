import React, { useContext } from "react";
import TasksOutput from "../components/TasksOutput/TasksOutput";
import { TasksContext } from "../store/tasks-context";
import { getDateMinusDays } from "../utility/date";

const RecentTasks = () => {
  const tasksCtx = useContext(TasksContext);

  const recentTasks = tasksCtx.tasks.filter((task) => {
    const today = new Date();
    const currentUTCTime = today.getTime();
    const ISTOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const currentISTTime = new Date(currentUTCTime + ISTOffset);
    const date7daysAgo = getDateMinusDays(currentISTTime, 7);

    return task.date > date7daysAgo && task.date <= currentISTTime;
  });

  return (
    <TasksOutput
      tasks={recentTasks}
      tasksPeriod={"Last 7 Days"}
      fallBackText="No tasks registered for last 7 days"
    />
  );
};

export default RecentTasks;
