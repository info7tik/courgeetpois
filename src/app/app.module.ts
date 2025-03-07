import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { provideRouter, Routes } from '@angular/router';
import { AnnualDateComponent } from './annual-date/annual-date.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CropEditorComponent } from './crop/crop-editor/crop-editor.component';
import { CropListComponent } from './crop/crop-list/crop-list.component';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { MenuComponent } from './menu/menu.component';
import { TaskEditorComponent } from './task/task-editor/task-editor.component';
import { TaskListComponent } from './task/task-list/task-list.component';

const routes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  { path: 'task-editor', component: TaskEditorComponent },
  { path: 'crop-list', component: CropListComponent },
  { path: 'crop-editor', component: CropEditorComponent },
  { path: 'data-manager', component: DataManagerComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    TaskEditorComponent,
    TaskListComponent,
    MenuComponent,
    CropListComponent,
    CropEditorComponent,
    AnnualDateComponent,
    DataManagerComponent
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
