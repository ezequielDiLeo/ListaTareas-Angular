import { Injectable } from '@angular/core';

export interface Tarea {
  texto: string;
  completada: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private localStorageKey = 'listaTareas'

  getTareas(): Tarea[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];  //en caso de que haya algo en el local storage, va a pasarlo a json y lo pasa a un array sino a un array vacio
  }

  guardarTareas(tareas: Tarea[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
  }

  agregarTarea(texto: string){
    const tareas = this.getTareas(); //traemos las tareas del local storage.
    tareas.push({ texto, completada: false }); //pusheamos la nueva tarea
    this.guardarTareas(tareas);
  }

  eliminarTarea(index: number){
    const tareas = this.getTareas(); //traemos las tareas del local storage.
    tareas.splice(index, 1) // desplazamos la que indica el index.
    this.guardarTareas(tareas);
  }

  toggleCompleta(index: number) {
    const tareas = this.getTareas();
    tareas[index].completada = !tareas[index].completada;
    this.guardarTareas(tareas);
  }

}
