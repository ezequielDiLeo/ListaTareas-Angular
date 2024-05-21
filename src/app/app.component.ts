import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TareasService } from './services/tareas.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  listaTareas: string[] = [];
  nuevaTarea = '';

  private _tareaServices = inject(TareasService);

  ngOnInit(): void {
    this.listaTareas = this._tareaServices.getTareas()
  }

  agregarTarea(){
    this._tareaServices.agregarTarea(this.nuevaTarea)
    this.nuevaTarea = '';
    this.listaTareas = this._tareaServices.getTareas(); 
  }

  eliminarTarea(index: number){
    this._tareaServices.eliminarTarea(index);
    this.listaTareas = this._tareaServices.getTareas()
  }


}
