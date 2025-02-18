import { Component, ViewChild } from '@angular/core';
import { AnnualDateComponent } from '../../annual-date/annual-date.component';
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
  @ViewChild(AnnualDateComponent) date!: AnnualDateComponent;

  NO_SELECTED_TASK_ID = Constants.NO_SELECTED_ID;
  taskName: string = '';
  previousTaskId: number = Constants.NO_SELECTED_ID;
  sincePreviousMonths: number = 0;
  afterPreviousDays: number = 0;

  constructor(private taskService: TaskService) {
    super(taskService);
  }

  addTask(): void {
    try {
      const newTask = new Task(this.taskService.getNewId());
      newTask.name = this.taskName;
      this.fillTaskAttributes(newTask);
      this.add(newTask);
    } catch (error) {
      this.showExceptionMessage(error);
    }
  }

  updateTask(): void {
    try {
      const toUpdateTask = new Task(this.selectedElementId);
      toUpdateTask.name = this.taskName;
      this.fillTaskAttributes(toUpdateTask);
      this.update(toUpdateTask);
    } catch (error) {
      this.showExceptionMessage(error);
    }
  }

  private fillTaskAttributes(newTask: Task) {
    setPreviousTaskId(this.taskService, newTask, this.previousTaskId);
    if (newTask.isBeginningTask()) {
      setTaskDate(this, newTask);
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

    function setTaskDate(myComponent: TaskEditorComponent, task: Task) {
      try {
        task.date = myComponent.date.getDate();
      } catch (error) {
        myComponent.showExceptionMessage(error);
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
    if (this.date) {
      this.date.reset();
    }
    this.sincePreviousMonths = 0;
    this.afterPreviousDays = 0;
  }

  loadTask(element: Task): void {
    const task = element;
    this.taskName = element.name;
    this.previousTaskId = task.previousTaskId;
    this.selectedElementId = element.id;
    this.date.load(task.date.month, task.date.day);
    this.afterPreviousDays = task.afterPreviousDays;
  }
}
