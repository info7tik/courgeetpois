import { Component, OnInit } from '@angular/core';
import { Constants } from '../constants';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  NO_SELECTED_TASK = Constants.NO_SELECTED_TASK_ID;
  taskName: string = '';
  previousTaskId: number | undefined;
  futureTasks: Task[] = [];
  pastTasks: Task[] = [];
  message: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    const tasks = this.taskService.getTasksOrderByDate();
    this.pastTasks = tasks.filter(task => task.fullDate < buildTodayMidnight() || task.isDone());
    this.futureTasks = tasks.filter(task => !this.pastTasks.includes(task));

    function buildTodayMidnight() {
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
      return today;
    }
  }

  markAsDone(taskId: number) {
    this.taskService.markAsDone(taskId);
  }
}