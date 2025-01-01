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
  tasks: Task[] = [];
  message: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasksOrderByDate();
  }
  //TODO: add a button to mark the task as done
}