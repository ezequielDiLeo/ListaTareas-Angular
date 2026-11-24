import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

export interface Tarea {
  id: string;
  texto: string;
  completada: boolean;
  creadaEn: number;
  completadaEn?: number;
}

@Injectable({ providedIn: 'root' })
export class TareasService {
  private readonly localStorageKey = 'listaTareas.v2';
  private readonly legacyKey = 'listaTareas';
  private readonly platformId = inject(PLATFORM_ID);

  getTareas(): Tarea[] {
    if (!isPlatformBrowser(this.platformId)) return [];

    try {
      const stored = localStorage.getItem(this.localStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return this.normalizar(parsed);
      }

      const legacy = localStorage.getItem(this.legacyKey);
      if (legacy) {
        const parsed = JSON.parse(legacy);
        if (Array.isArray(parsed)) {
          const migradas = parsed
            .filter((item): item is { texto: string; completada: boolean } =>
              typeof item?.texto === 'string')
            .map((item) => this.crearModelo(item.texto, item.completada));
          this.guardarTareas(migradas);
          localStorage.removeItem(this.legacyKey);
          return migradas;
        }
      }
    } catch {
      localStorage.removeItem(this.localStorageKey);
    }

    return [];
  }

  agregarTarea(texto: string): Tarea | null {
    const limpio = texto.trim();
    if (!limpio) return null;

    const tareas = this.getTareas();
    const tarea = this.crearModelo(limpio, false);
    this.guardarTareas([tarea, ...tareas]);
    return tarea;
  }

  editarTarea(id: string, texto: string): boolean {
    const limpio = texto.trim();
    if (!limpio) return false;

    const tareas = this.getTareas();
    const tarea = tareas.find((item) => item.id === id);
    if (!tarea) return false;

    tarea.texto = limpio;
    this.guardarTareas(tareas);
    return true;
  }

  eliminarTarea(id: string): void {
    this.guardarTareas(this.getTareas().filter((tarea) => tarea.id !== id));
  }

  toggleCompleta(id: string): void {
    const tareas = this.getTareas();
    const tarea = tareas.find((item) => item.id === id);
    if (!tarea) return;

    tarea.completada = !tarea.completada;
    tarea.completadaEn = tarea.completada ? Date.now() : undefined;
    this.guardarTareas(tareas);
  }

  eliminarCompletadas(): number {
    const tareas = this.getTareas();
    const completadas = tareas.filter((tarea) => tarea.completada).length;
    this.guardarTareas(tareas.filter((tarea) => !tarea.completada));
    return completadas;
  }

  private guardarTareas(tareas: Tarea[]): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
    } catch {
      // The app remains usable when storage is unavailable or full.
    }
  }

  private crearModelo(texto: string, completada: boolean): Tarea {
    const ahora = Date.now();
    return {
      id: crypto?.randomUUID?.() ?? `${ahora}-${Math.random().toString(36).slice(2)}`,
      texto: texto.trim(),
      completada,
      creadaEn: ahora,
      completadaEn: completada ? ahora : undefined
    };
  }

  private normalizar(items: Tarea[]): Tarea[] {
    return items
      .filter((item) => typeof item?.texto === 'string' && item.texto.trim())
      .map((item) => ({
        id: item.id || `${item.creadaEn || Date.now()}-${Math.random().toString(36).slice(2)}`,
        texto: item.texto.trim(),
        completada: Boolean(item.completada),
        creadaEn: typeof item.creadaEn === 'number' ? item.creadaEn : Date.now(),
        completadaEn: typeof item.completadaEn === 'number' ? item.completadaEn : undefined
      }));
  }
}
