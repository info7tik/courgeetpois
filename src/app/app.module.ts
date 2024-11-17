import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { provideRouter, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { SeedListComponent } from './seed-list/seed-list.component';
import { TaskEditorComponent } from './task-editor/task-editor.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
    { path: 'task-list', component: TaskListComponent },
    { path: 'seed-list', component: SeedListComponent },
  ];


@NgModule({
  declarations: [
    AppComponent,
    TaskEditorComponent,
    TaskListComponent,
    MenuComponent,
    SeedListComponent,
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
