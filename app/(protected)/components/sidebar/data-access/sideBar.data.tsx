import { BookOpen, Bus, LayoutDashboard, Users, ChartArea } from "lucide-react";

export const sideBarData = {
  empresa: {
    name: "Sistema de votos",
    logo: Bus,
    plan: "EPIS",
  },

  goDashboard: {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },

  navMain: [
    {
      title: "Estudiantes",
      url: "#",
      icon: Users,
      isActive: false,

      items: [
        {
          title: "Lista general",
          url: "/alumnos",
        },
        {
          title: "Agregar estudiantes",
          url: "/agregar-estudiantes",
        },
      ],
    },
    {
      title: "Partidos",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Lista general",
          url: "/partidos",
        },
        {
          title: "Registrar partido",
          url: "/registrar-partido",
        },
        {
          title: "Registrar junta directiva",
          url: "/registrar-junta-directiva",
        },
      ],
    },

    {
      title: "Reportes",
      url: "#",
      icon: ChartArea,
      items: [
        {
          title: "Votos",
          url: "/reportes",
        },

      ],
    },
  ],
};
