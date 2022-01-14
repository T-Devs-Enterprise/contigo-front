import { ReactComponent as Rec1 } from "../../assets/icons/menuRecurso_5.svg";
import { ReactComponent as Rec2 } from "../../assets/icons/menuRecurso_6.svg";
import { ReactComponent as Rec3 } from "../../assets/icons/menuRecurso_7.svg";
import { ReactComponent as Rec5 } from "../../assets/icons/menuRecurso_9.svg";
import { ReactComponent as Rec10 } from "../../assets/icons/menuRecurso_10.svg";
import { ReactComponent as Rec11 } from "../../assets/icons/menuRecurso_11.svg";
import { ReactComponent as Rec12 } from "../../assets/icons/menuRecurso_12.svg";
import { ReactComponent as Rec13 } from "../../assets/icons/menuRecurso_13.svg";
import { ReactComponent as Rec14 } from "../../assets/icons/menuRecurso_14.svg";
import { ReactComponent as Rec15 } from "../../assets/icons/menuRecurso_15.svg";
import { ReactComponent as Rec16 } from "../../assets/icons/menuRecurso_16.svg";
import { ReactComponent as Rec17 } from "../../assets/icons/menuRecurso_17.svg";
import { ReactComponent as Rec18 } from "../../assets/icons/menuRecurso_18.svg";
import { ReactComponent as Rec19 } from "../../assets/icons/menuRecurso_19.svg";
import { ReactComponent as Rec20 } from "../../assets/icons/menuRecurso_20.svg";
import { ReactComponent as Rec21 } from "../../assets/icons/menuRecurso_21.svg";
import {
  faHome,
  faCalendarAlt,
  faSignal,
  faKey,
  faArchive,
  faListAlt,
  // faShoppingCart,
  faSyringe,
} from "@fortawesome/free-solid-svg-icons";
import { ROUTES_DICT, ROUTES_SLUGS } from "../../routes/routesDict";

export const menuList = () => {
  const validator = localStorage.getItem("reproductiveManagement");
  if (validator !== "DM_&_AI_&_ET") {
    list[2].submenu[2].submenu.splice(2, 1);
    return list;
  } else {
    const newObject = {
      id: "agregar-em",
      title: "Nuevo Registro Tranferencia de Embriones",
      link: ROUTES_DICT.service.createET,
    };
    list[2].submenu[2].submenu.splice(2, 1, newObject);
    return list;
  }
};

export const list = [
  {
    id: "control-ganadero",
    title: "Control de Ganado",
    tour: "sidebar__control__animal",
    img: faHome,
    submenu: [
      {
        id: "inico",
        title: "Inicio",
        link: ROUTES_DICT.animal.list,
      },
      {
        id: "registro-animal",
        title: "Registro Animal",
        link: ROUTES_DICT.animal.create,
      },
      {
        id: "Analisis",
        title: "Analisis",
        link: ROUTES_DICT.animal.createBulk,
      },
    ],
  },
  {
    id: "control-produccion",
    title: "Control de Producción",
    tour: "sidebar__control__milk",
    img: Rec1,
    submenu: [
      {
        id: "produccion-lechera",
        title: "Producción Lechera",
        img: Rec15,
        submenu: [
          {
            id: "inicio",
            title: "Inicio",
            link: ROUTES_DICT.milk.list,
          },
          {
            id: "registro-diario",
            title: "Registro Diario",
            link: ROUTES_DICT.milk.create,
          },
          {
            id: "inicio",
            title: "Analisis",
            link: ROUTES_DICT.milk.list,
          },
        ],
      },
      {
        id: "produccion-engorde",
        title: "Producción Engorde",
        img: Rec16,
        submenu: [
          {
            id: "inicio",
            title: "Inicio",
            link: ROUTES_DICT.weight.list,
          },
          {
            id: "agregar-peso",
            title: "Registro Peso",
            link: ROUTES_DICT.weight.create,
          },
          {
            id: "inicio",
            title: "Analisis",
            link: ROUTES_DICT.weight.list,
          },
        ],
      },
    ],
  },
  {
    id: "control-reproduccion",
    title: "Control de Reproducción",
    img: faSyringe,
    submenu: [
      {
        id: "secado-desteste",
        title: "Secado / Desteste",
        img: faArchive,
        submenu: [
          {
            id: "inicio",
            title: "Inicio",
            link: ROUTES_DICT.collective.drying.list,
          },
          {
            id: "agregar-secado",
            title: "Nuevo Registro",
            link: ROUTES_DICT.collective.drying.create,
          },
          {
            id: "inicio",
            title: "Analisis",
            link: ROUTES_DICT.collective.drying.list,
          },
        ],
      },
      {
        id: "celo",
        title: "Celo",
        img: faSignal,
        submenu: [
          {
            id: "inicio",
            title: "Inicio",
            link: ROUTES_DICT.collective.zeal.list,
          },
          {
            id: "agregar-collective",
            title: "Nuevo Registro",
            link: ROUTES_DICT.collective.zeal.create,
          },
          {
            id: "inicio",
            title: "Analisis",
            link: ROUTES_DICT.collective.zeal.list,
          },
        ],
      },
      {
        id: "servicios-reproductivos",
        title: "Servicios Reproductivos",
        img: Rec11,
        submenu: [
          {
            id: "inicio",
            title: "Inicio",
            link: ROUTES_DICT.service.list,
          },
          {
            id: "agregar-iamn",
            title: "Nuevo Registro IA / MN",
            link: ROUTES_DICT.service.createIAMN,
          },
          {
            id: "agregar-em",
            title: "Nuevo Registro Tranferencia de Embriones",
            link: ROUTES_DICT.service.createET,
          },
          {
            id: "inicio",
            title: "Analisis",
            link: ROUTES_DICT.palpation.list,
          },
        ],
      },
      {
        id: "palpaciones",
        title: "Palpaciones",
        img: Rec3,
        submenu: [
          {
            id: "inicio",
            title: "Inicio",
            link: ROUTES_DICT.palpation.list,
          },
          {
            id: "agregar-palpacion",
            title: "Nuevo Registro",
            link: ROUTES_DICT.palpation.create,
          },
          {
            id: "inicio",
            title: "Analisis",
            link: ROUTES_DICT.palpation.list,
          },
        ],
      },
      {
        id: "nacimientos",
        title: "Nacimientos",
        img: faCalendarAlt,
        submenu: [
          {
            id: "inicio",
            title: "Inicio",
            link: ROUTES_DICT.birth.list,
          },
          {
            id: "agregar-nacimiento",
            title: "Nuevo Registro",
            link: ROUTES_DICT.birth.create,
          },
          {
            id: "inicio",
            title: "Analisis",
            link: ROUTES_DICT.birth.list,
          },
        ],
      },
      {
        id: "estadisticas-preñeces",
        title: "Estadisticas Preñeces",
        img: Rec2,
      },
      {
        id: "existencias-geneticas",
        title: "Existencias Geneticas",
        img: faKey,
        submenu: [
          {
            id: "semen",
            title: "Semen",
            link: ROUTES_DICT.geneticStock.geneticType.list.replace(
              ":geneticType",
              ROUTES_SLUGS.semen
            ),
          },
          {
            id: "embriones",
            title: "Embriones",
            link: ROUTES_DICT.geneticStock.geneticType.list.replace(
              ":geneticType",
              ROUTES_SLUGS.embryo
            ),
          },
        ],
      },
      {
        id: "prod-embriones",
        title: "Prod. Embriones (PRO)",
        img: Rec5,
        submenu: [
          {
            id: "agregar",
            title: "Nuevo Registro",
            // link: ROUTES_DICT.palpation.create,
          },
          {
            id: "inicio",
            title: "Modificacion",
            // link: ROUTES_DICT.palpation.list,
          },
          {
            id: "inicio",
            title: "Analisis",
            // link: ROUTES_DICT.palpation.list,
          },
        ],
      },
      {
        id: "andrologia",
        title: "Andrologia (PRO)",
        img: Rec10,
        submenu: [
          {
            id: "inicio",
            title: "Inicio",
            // link: ROUTES_DICT.palpation.list,
          },
          {
            id: "agregar",
            title: "Nuevo Registro",
            // link: ROUTES_DICT.palpation.create,
          },
          {
            id: "inicio",
            title: "Analisis",
            // link: ROUTES_DICT.palpation.list,
          },
        ],
      },
    ],
  },
  {
    id: "control-ventas",
    title: "Control de Ventas",
    img: Rec12,
    submenu: [
      {
        id: "inicio",
        title: "Inicio",
        link: ROUTES_DICT.sale.list,
      },
      {
        id: "agregar-venta",
        title: "Nuevo Registro",
        link: ROUTES_DICT.sale.create,
      },
      {
        id: "analisis",
        title: "Analisis",
        link: ROUTES_DICT.sale.list,
      },
    ],
  },
  {
    id: "control-subministros",
    title: "Control de Subministros",
    img: Rec13,
    submenu: [
      {
        id: "inicio",
        title: "Nuevo Registro",
      },
      {
        id: "inicio",
        title: "Modificación",
      },
      {
        id: "inicio",
        title: "Analisis",
      },
    ],
  },
  {
    id: "control-sanidad-veterinaria",
    title: "Control de Sanidad Veterinaria",
    img: Rec14,
    submenu: [
      {
        id: "inicio",
        title: "Nuevo Registro",
      },
      {
        id: "inicio",
        title: "Modificación",
      },
      {
        id: "inicio",
        title: "Analisis",
      },
    ],
  },
  {
    id: "tablero-control-gestión",
    title: "Tablero de Control de Gestión (PRO)",
    img: Rec17,
    tour: "mejora",
    bottom: true,
  },
  {
    id: "gestion-asociación",
    title: "Gestión de Asociación (PRO)",
    img: Rec18,
    bottom: true,
  },
  {
    id: "capacitacion-noticias",
    title: "Capacitación y Noticias (PRO)",
    img: Rec19,
    bottom: true,
  },
  {
    id: "gestion-integracion-tecnológia",
    title: "Gestión de Integración de Tecnológia (PRO)",
    img: Rec21,
    bottom: true,
  },
  {
    id: "gestion-activos-fijos",
    title: "Gestión de Activos Fijos (PRO)",
    img: Rec20,
    bottom: true,
  },
];
