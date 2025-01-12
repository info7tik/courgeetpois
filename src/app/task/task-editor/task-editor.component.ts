import { Component } from '@angular/core';
import { Editor } from '../../common/editor.abstract';
import { Constants } from '../../constants';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.css'
})
export class TaskEditorComponent extends Editor<Task> {
  NO_SELECTED_TASK_ID = Constants.NO_SELECTED_ID;
  taskName: string = '';
  previousTaskId: number = Constants.NO_SELECTED_ID;
  taskMonth: number = 0;
  taskDay: number = 0;
  sincePreviousMonths: number = 0;
  afterPreviousDays: number = 0;

  constructor(private taskService: TaskService) {
    super(taskService);
    this.taskService.sortTasksWithPreviousTasksBefore();
  }

  addTask(): void {
    try {
      const newTask = new Task(this.taskService.getNewId(), this.taskName);
      this.fillTaskAttributes(newTask);
      this.add(newTask);
      this.taskService.sortTasksWithPreviousTasksBefore();
    } catch (error) {
      this.showExceptionMessage(error);
    }
  }

  updateTask(): void {
    try {
      const toUpdateTask = new Task(this.selectedElementId, this.taskName);
      this.fillTaskAttributes(toUpdateTask);
      this.update(toUpdateTask);
      this.taskService.sortTasksWithPreviousTasksBefore();
    } catch (error) {
      this.showExceptionMessage(error);
    }
  }

  private fillTaskAttributes(newTask: Task) {
    setPreviousTaskId(this.taskService, newTask, this.previousTaskId);
    if (newTask.isBeginningTask()) {
      setTaskDate(newTask, this.taskMonth, this.taskDay);
    } else {
      setAfterPreviousDays(newTask, this.afterPreviousDays);
    }

    function setPreviousTaskId(taskService: TaskService, task: Task, taskId: number) {
      if (previousTaskExists(taskService, taskId)) {
        task.previousTaskId = taskId;
      } else {
        throw Error(`La tâche précédente ${taskId} n'existe pas`);
      }

      function previousTaskExists(taskService: TaskService, taskId: number): boolean {
        return taskId === Constants.NO_SELECTED_ID ? true : taskService.hasElement(taskId);
      }
    }

    function setTaskDate(task: Task, taskMonth: number, taskDay: number) {
      if (hasTaskDate(taskMonth, taskDay)) {
        task.date.month = taskMonth - 1;
        task.date.day = taskDay;
      } else {
        throw Error(`La date pour la tâche ${task.name} est manquante`);
      }

      function hasTaskDate(taskMonth: number, taskDay: number): boolean {
        return taskMonth > 0 && taskDay > 0;
      }
    }

    function setAfterPreviousDays(task: Task, afterPreviousDays: number) {
      task.afterPreviousDays = afterPreviousDays;
    }
  }

  protected override clearForm(): void {
    this.taskName = '';
    this.previousTaskId = Constants.NO_SELECTED_ID;
    this.selectedElementId = Constants.NO_SELECTED_ID;
    this.taskMonth = 0;
    this.taskDay = 0;
    this.sincePreviousMonths = 0;
    this.afterPreviousDays = 0;

  }

  loadTask(element: Task): void {
    const task = element;
    this.taskName = element.name;
    this.previousTaskId = task.previousTaskId;
    this.selectedElementId = element.id;
    this.taskMonth = task.date.month + 1;
    this.taskDay = task.date.day;
    this.afterPreviousDays = task.afterPreviousDays;
  }
}
