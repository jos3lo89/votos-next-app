export interface Votos {
  id: string;
  id_estudiante: string;
  id_partido?: string;
  created_at: string;
  updated_at: string;
  voto_nulo: boolean;
  partido?: Partido;
  estudiante: Estudiante;
}

export interface Partido {
  id: string;
  nombre: string;
  imagen_url: string;
  imagen_id: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
}

export interface Estudiante {
  id: string;
  num_orden: number;
  apellido_nombre: string;
  escuela_profesional: string;
  ciclo: number;
  voto_emitido: boolean;
  created_at: string;
  updated_at: string;
  codigo: string;
}
