import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Tarea, TareasService } from './services/tareas.service';
import { FooterComponent } from "./components/footer/footer.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  listaTareas: Tarea[] = [];
  nuevaTarea = '';
  tabActiva: 'pendientes' | 'completadas' = 'pendientes';


  private _tareaServices = inject(TareasService);

  ngOnInit(): void {
    this.listaTareas = this._tareaServices.getTareas()
  }

   get tareasPendientes(): Tarea[] {
    return this.listaTareas.filter(tarea => !tarea.completada);
   }

   get tareasCompletadas(): Tarea[] {
    return this.listaTareas.filter(t => t.completada);
  }

  agregarTarea(){
    const tareaLimpia = this.nuevaTarea.trim();
    if(!tareaLimpia) return;

    this._tareaServices.agregarTarea(this.nuevaTarea)
    this.nuevaTarea = '';
    this.listaTareas = this._tareaServices.getTareas();
  }

  eliminarTarea(index: number){
    this._tareaServices.eliminarTarea(index);
    this.listaTareas = this._tareaServices.getTareas()
  }

  toggleTarea(index: number) {
    this._tareaServices.toggleCompleta(index);
    this.listaTareas = this._tareaServices.getTareas();
  }

  obtenerIndexOriginal(tarea: Tarea): number {
    return this.listaTareas.findIndex(t => t === tarea);
  }


}
