import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private localStorageKey = 'listaTareas'

  getTareas(): string[] {
    return JSON.parse(localStorage. getItem(this.localStorageKey) as string) || [];  //en caso de que haya algo en el local storage, va a pasarlo a json y lo pasa a un array sino a un array vacio
  }

  agregarTarea(tarea: string){
    const tareas = this.getTareas(); //traemos las tareas del local storage.
    tareas.push(tarea); //pusheamos la nueva tarea
    localStorage.setItem(this.localStorageKey, JSON.stringify(tareas)) //seteamos la tarea nueva en el localStorage. 
  }

  eliminarTarea(index: number){
    const tareas = this.getTareas(); //traemos las tareas del local storage.
    tareas.splice(index, 1) // desplazamos la que indica el index.
    localStorage.setItem(this.localStorageKey, JSON.stringify(tareas)) // seteamos las tareas que quedan.
  }

}
