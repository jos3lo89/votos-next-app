export interface PartidosJunta {
  id: string;
  nombre: string;
  imagen_url: string;
  imagen_id: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
  junta: Junum[];
}

export interface Junum {
  id: string;
  nombre: string;
  apellido: string;
  codigo: string;
  dni: any;
  ciclo: number;
  foto_url?: string;
  foto_id?: string;
  cargo: string;
  id_partido: string;
  created_at: string;
  updated_at: string;
}
