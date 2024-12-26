import { TaskDate } from "./task-date";
import { TaskDuration } from "./task-duration";

export interface Task {
  id: number;
  name: string;
  date: TaskDate;
  previousTaskId: number;
  sincePrevious: TaskDuration;
}
