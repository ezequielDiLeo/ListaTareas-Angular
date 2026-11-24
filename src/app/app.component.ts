import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarea, TareasService } from './services/tareas.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  tareas: Tarea[] = [];
  nuevaTarea = '';
  busqueda = '';
  filtro: 'todas' | 'pendientes' | 'completadas' = 'todas';
  editandoId: string | null = null;
  textoEdicion = '';
  mensaje = '';

  private readonly tareasService = inject(TareasService);

  ngOnInit(): void {
    this.tareas = this.tareasService.getTareas();
  }

  get pendientes(): Tarea[] {
    return this.tareas.filter((tarea) => !tarea.completada);
  }

  get completadas(): Tarea[] {
    return this.tareas.filter((tarea) => tarea.completada);
  }

  get progreso(): number {
    return this.tareas.length ? Math.round((this.completadas.length / this.tareas.length) * 100) : 0;
  }

  get tareasVisibles(): Tarea[] {
    const texto = this.busqueda.trim().toLocaleLowerCase();
    return this.tareas.filter((tarea) => {
      const coincideFiltro = this.filtro === 'todas'
        || (this.filtro === 'pendientes' && !tarea.completada)
        || (this.filtro === 'completadas' && tarea.completada);
      const coincideTexto = !texto || tarea.texto.toLocaleLowerCase().includes(texto);
      return coincideFiltro && coincideTexto;
    });
  }

  agregarTarea(): void {
    const tarea = this.tareasService.agregarTarea(this.nuevaTarea);
    if (!tarea) return;

    this.nuevaTarea = '';
    this.recargar('Tarea agregada');
  }

  toggleTarea(tarea: Tarea): void {
    this.tareasService.toggleCompleta(tarea.id);
    this.recargar(tarea.completada ? 'Tarea restaurada' : 'Tarea completada');
  }

  eliminarTarea(tarea: Tarea): void {
    this.tareasService.eliminarTarea(tarea.id);
    if (this.editandoId === tarea.id) this.cancelarEdicion();
    this.recargar('Tarea eliminada');
  }

  comenzarEdicion(tarea: Tarea): void {
    this.editandoId = tarea.id;
    this.textoEdicion = tarea.texto;
  }

  guardarEdicion(tarea: Tarea): void {
    if (!this.textoEdicion.trim()) return;
    this.tareasService.editarTarea(tarea.id, this.textoEdicion);
    this.cancelarEdicion();
    this.recargar('Cambios guardados');
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.textoEdicion = '';
  }

  eliminarCompletadas(): void {
    const cantidad = this.tareasService.eliminarCompletadas();
    if (cantidad) this.recargar(`${cantidad} tarea${cantidad === 1 ? '' : 's'} eliminada${cantidad === 1 ? '' : 's'}`);
  }

  private recargar(mensaje: string): void {
    this.tareas = this.tareasService.getTareas();
    this.mensaje = mensaje;
    window.setTimeout(() => {
      if (this.mensaje === mensaje) this.mensaje = '';
    }, 2400);
  }
}
