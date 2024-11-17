import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { provideRouter, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { SeedEditorComponent } from './seed-editor/seed-editor.component';
import { SeedListComponent } from './seed-list/seed-list.component';
import { TaskEditorComponent } from './task-editor/task-editor.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
    { path: 'task-list', component: TaskListComponent },
    { path: 'task-editor', component: TaskEditorComponent },
    { path: 'seed-list', component: SeedListComponent },
    { path: 'seed-editor', component: SeedEditorComponent },
  ];


@NgModule({
  declarations: [
    AppComponent,
    TaskEditorComponent,
    TaskListComponent,
    MenuComponent,
    SeedListComponent,
    SeedEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }
