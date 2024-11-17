export interface PartidoPresidente {
  id: string;
  nombre: string;
  imagen_url: string;
  imagen_id: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
  presidente: Presidente;
}

export interface Presidente {
  id: string;
  nombre: string;
  apelllido: string;
  codigo: string;
  ciclo: number;
  foto_url: string;
  foto_id: string;
  id_partido: string;
  created_at: string;
  updated_at: string;
}
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
