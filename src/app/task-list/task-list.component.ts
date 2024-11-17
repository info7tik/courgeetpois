import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];

    constructor(private taskService: TaskService) { }

    ngOnInit(): void {
      this.tasks = this.taskService.getTasks();
    }

    deleteTask(id: number): void {
      this.taskService.deleteTask(id);
      this.tasks = this.taskService.getTasks();
    }
  }