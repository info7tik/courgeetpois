import { Component } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
    selector: 'app-task-editor',
    templateUrl: './task-editor.component.html',
    styleUrl: './task-editor.component.css'
})
export class TaskEditorComponent {
    task: Task = {
        id: 0,
        name: '',
        date: new Date(),
        daysUntilNextTask: 0
    };

    constructor(private taskService: TaskService) { }

    onSubmit(): void {
        this.task.id = Date.now();
        this.taskService.addTask(this.task);
        this.task = {
            id: 0,
            name: '',
            date: new Date(),
            daysUntilNextTask: 0
        };
    }
}
