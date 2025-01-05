import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { provideRouter, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CropEditorComponent } from './crop-editor/crop-editor.component';
import { CropListComponent } from './crop-list/crop-list.component';
import { MenuComponent } from './menu/menu.component';
import { TaskEditorComponent } from './task-editor/task-editor.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  { path: 'task-editor', component: TaskEditorComponent },
  { path: 'crop-list', component: CropListComponent },
  { path: 'crop-editor', component: CropEditorComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    TaskEditorComponent,
    TaskListComponent,
    MenuComponent,
    CropListComponent,
    CropEditorComponent
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
