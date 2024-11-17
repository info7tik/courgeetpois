import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: Map<number, Task> = new Map();
    private storageKey = 'tasks';

    constructor() {
        this.loadTasksFromLocalStorage();
    }


    getTasks(): Task[] {
        return Array.from(this.tasks.values());
    }

    addTask(task: Task): void {
        this.tasks.set(task.id, task);
        this.saveTasksToLocalStorage();
    }

    updateTask(task: Task): void {
        if (this.tasks.has(task.id)) {
            this.tasks.set(task.id, task);
            this.saveTasksToLocalStorage();
        }
    }

    deleteTask(id: number): void {
        if (this.tasks.has(id)) {
            this.tasks.delete(id)
        }
        this.saveTasksToLocalStorage();
    }

    getNextId(): number {
        const ids = Array.from(this.tasks.keys());
        return ids.length > 0 ? Math.max(...ids) + 1 : 1;
    }

    getSortedTasks(): Task[] {
        const tasksWithoutPrevious = Array.from(this.tasks.values()).filter(task => task.previousTaskId === undefined);
        const tasksWithPrevious = Array.from(this.tasks.values()).filter(task => task.previousTaskId !== undefined);

        return [...tasksWithoutPrevious, ...this.topologicalSort(tasksWithPrevious)];
    }

    private topologicalSort(tasks: Task[]): Task[] {
        return tasks;
    }

    private loadTasksFromLocalStorage(): void {
        const storedTasks = localStorage.getItem(this.storageKey);
        if (storedTasks) {
            const tasksArray = JSON.parse(storedTasks) as Task[];
            tasksArray.forEach(task => this.tasks.set(task.id, task));
        }
    }

    private saveTasksToLocalStorage(): void {
        const tasksArray = Array.from(this.tasks.values());
        localStorage.setItem(this.storageKey, JSON.stringify(tasksArray));
    }
}