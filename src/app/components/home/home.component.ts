import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task/task.service';
import { ITask } from 'src/app/models/task/task.model';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TaskService]
})
export class HomeComponent implements OnInit {
  public token: string;
  public status: string | null;
  public tasks: ITask[] | null;
  public subscription: Subscription | null;
  public createTaskForm: FormGroup;
  public selectedTask: ITask | null;
  constructor(public dialog: MatDialog, private taskService: TaskService) {
    this.status = null;
    this.tasks = null;
    this.subscription = null;
    this.selectedTask = null;
    this.token = localStorage.getItem('token') || '';
    this.createTaskForm = new FormGroup({
      name: new FormControl(''),
      done: new FormControl(0),
    });
  }


  ngOnInit(): void {
    if(this.token){
      this.getTasks();
      this.subscription = this.taskService.refresh$.subscribe(() => {
        this.getTasks();
      });
    }
  }

  get createTaskFormControl() {
    return this.createTaskForm.controls;
  }

  setModify(task: ITask){
    this.createTaskForm.setValue({
      name: task.name,
      done: task.done,
   });
    this.selectedTask = task;
  }

  setCreate(){
    this.createTaskForm.setValue({
      name: '',
      done: 0,
   });
    this.selectedTask = null;
  }

  onSubmit(): void {
    const task: ITask = this.createTaskForm.value;
    this.taskService.create(task, this.token).subscribe(
      (response) => {
        if (response) {
          this.status = `Tarea ${response.task.name} creada!`;
        } else{
          this.status = 'Error al crear la tarea!';
        }
        this.createTaskForm.reset();
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onUpdate(taskId: number): void {
    const task: ITask = this.createTaskForm.value
    this.taskService.update(task, taskId).subscribe(
      (response) => {
        if (response) {
          this.status = `Tarea renombrada a ${response.task.name}!`;
        } else{
          this.status = 'Error al editar la tarea!';
        }
        this.createTaskForm.reset();
        this.selectedTask = null;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onDelete(taskId: number): void {
    this.taskService.delete(taskId).subscribe(
      (response) => {
        if (response) {
          this.status = `Tarea borrada.`;
        } else{
          this.status = 'Error al borrar la tarea!';
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }

  getTasks(): void {
    this.taskService.get(this.token).subscribe(
      (response) => {
        if (response) {
          this.tasks = response.tasks;
        }else{
          this.status = 'Aún no tienes creadas tareas';
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
