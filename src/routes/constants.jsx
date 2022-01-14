import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { ConfigLayout } from "../layouts/ConfigLayout";
import { ROUTES_DICT } from "./routesDict";

/* routes authentication */
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EmailVerifiedPage from "../pages/EmailVerifiedPage";
import SetupControlPage from "../pages/SetupControlPage";

/* routes with dashboard layout */
import AnimalDetailPage from "../pages/AnimalDetail/AnimalDetailPage";
import ServicePageList from "../pages/Services/ServicePageList";
import IAMNCreatePage from "../pages/Services/IAMNCreatePage";
import IAMNUpdatePage from "../pages/Services/IAMNUpdatePage";
import EmbryoTransferCreatePage from "../pages/Services/EmbryoTransferCreatePage";
import EmbryoTransferUpdatePage from "../pages/Services/EmbryoTransferUpdatePage";
import ServiceDeletePage from "../pages/Services/ServiceDeletePage";
import PregnanciesPage from "../pages/PregnanciesPage";
import PedigreePage from "../pages/PedigreePage";
import GeneticStockList from "../pages/GeneticStock/GeneticStockList";
import HaciendaConfigurationPage from "../pages/HaciendaConfigurationPage";
import MovementCreatePage from "../pages/GeneticStock/MovementCreatePage";
import AnimalListPage from "../pages/AnimalControl/AnimalListPage";
import AnimalCreatePage from "../pages/AnimalControl/AnimalCreatePage";

/* routes with config layout */
import ProfilesControlPage from "../pages/ProfilesControlPage";
import UserListPage from "../pages/UserControl/UserListPage";
import PlanPage from "../pages/PlanPage";
import AccountUpdatePage from "../pages/AccountPage/AccountUpdatePage";
import GeneticStockCreatePage from "../pages/GeneticStock/GeneticStockCreatePage";
import GeneticStockUpdatePage from "../pages/GeneticStock/GeneticStockUpdatePage";
import GeneticStockDeletePage from "../pages/GeneticStock/GeneticStockDeletePage";
import DefaultPage from "../components/DefaultPage";
import MovementPageList from "../pages/GeneticStock/MovementPageList";
import { serviceRouteOptions } from "../pages/Services/constants";
import AnimalUpdatePage from "../pages/AnimalControl/AnimalUpdatePage";
import BirthListPage from "../pages/Birth/BirthListPage";
import { birthChipOptions } from "../pages/Birth/constants";
import BirthCreatePage from "../pages/Birth/BirthCreatePage";
import AnimalDeletePage from "../pages/AnimalControl/AnimalDeletePage";
import ZealListPage from "../pages/Collective/Zeal/ZealListPage";
import ZealCreatePage from "../pages/Collective/Zeal/ZealCreatePage";
import ZealUpdatePage from "../pages/Collective/Zeal/ZealUpdatePage";
import ZealDeletePage from "../pages/Collective/Zeal/ZealDeletePage";
import WeightListPage from "../pages/Collective/Weight/WeightListPage";
import WeightCreatePage from "../pages/Collective/Weight/WeightCreatePage";
import WeightUpdatePage from "../pages/Collective/Weight/WeightUpdatePage";
import WeightDeletePage from "../pages/Collective/Weight/WeightDeletePage";
import SaleListPage from "../pages/Collective/Sale/SaleListPage";
import SaleCreatePage from "../pages/Collective/Sale/SaleCreatePage";
import SaleUpdatePage from "../pages/Collective/Sale/SaleUpdatePage";
import SaleDeletePage from "../pages/Collective/Sale/SaleDeletePage";
import AssociationListPage from "../pages/Collective/Association/AssociationListPage";
import AssociationDeletePage from "../pages/Collective/Association/AssociationDeletePage";
import AssociationUpdatePage from "../pages/Collective/Association/AssociationUpdatePage";
import AssociationCreatePage from "../pages/Collective/Association/AssociationCreatePage";
import DryingListPage from "../pages/Collective/Drying/DryingListPage";
import DryingCreatePage from "../pages/Collective/Drying/DryingCreatePage";
import DryingUpdatePage from "../pages/Collective/Drying/DryingUpdatePage";
import DryingDeletePage from "../pages/Collective/Drying/DryingDeletePage";
import MilkListPage from "../pages/MilkControl/MilkListPage";
import MilkCreatePage from "../pages/MilkControl/MilkCreatePage";
import MilkUpdatePage from "../pages/MilkControl/MilkUpdatePage";
import MilkDeletePage from "../pages/MilkControl/MilkDeletePage";
import PalpationListPage from "../pages/Palpation/PalpationListPage";
import PalpationCreatePage from "../pages/Palpation/PalpationCreatePage";
import PalpationUpdatePage from "../pages/Palpation/PalpationUpdatePage";
import PalpationDeletePage from "../pages/Palpation/PalpationDeletePage";
import FarmUpdatePage from "../pages/HaciendaConfigurationPage/FarmUpdatePage";
import AgribusinessUpdatePage from "../pages/HaciendaConfigurationPage/AgribusinessUpdatePage";
import AgribusinessCreatePage from "../pages/HaciendaConfigurationPage/AgribusinessCreatePage";
import GeneralUpdatePage from "../pages/AnimalDetail/GeneralUpdatePage";
import RaceUpdatePage from "../pages/AnimalDetail/RaceUpdatePage";
import BirthControlCreatePage from "../pages/AnimalDetail/BirthControlCreatePage";
import CalendarUpdatePage from "../pages/AnimalDetail/CalendarUpdatePage";
import IAServiceCreatePage from "../pages/AnimalDetail/IAServiceCreatePage";
import OtherUpdatePage from "../pages/AnimalDetail/OtherUpdatePage";
import MilkControlCreatePage from "../pages/AnimalDetail/MilkControlCreatePage";
import AnimalDetailDeletePage from "../pages/AnimalDetail/AnimalDetailDeletePage";
import CollaboratorCreatePage from "../pages/HaciendaConfigurationPage/CollaboratorCreatePage";
import CollaboratorUpdatePage from "../pages/HaciendaConfigurationPage/CollaboratorUpdatePage";
import CollaboratorDeletePage from "../pages/HaciendaConfigurationPage/CollaboratorDeletePage";
import ImageUploadPage from "../pages/AnimalDetail/ImageUploadPage";
import FarmImageUploadPage from "../pages/HaciendaConfigurationPage/FarmImageUploadPage";
import AgribusinessImageUploadPage from "../pages/HaciendaConfigurationPage/AgribusinessImageUploadPage";
import AnimalCreateBulkPage from "../pages/AnimalControl/AnimalCreateBulkPage";
import UserCreatePage from "../pages/UserControl/UserCreatePage";
import UserUpdatePage from "../pages/UserControl/UserUpdatePage";
import UserDeletePage from "../pages/UserControl/UserDeletePage";
import QrViewPage from "../pages/AnimalDetail/QrViewPage";
import TransferServiceCreatePage from "../pages/AnimalDetail/TransferServiceCreatePage";
import PalapationControlCreatePage from "../pages/AnimalDetail/PalapationControlCreatePage";
import { palpationRouteOptions } from "../pages/Palpation/constants";
import { milkRouteOptions } from "../pages/MilkControl/constants";
import WeightControlCreatePage from "../pages/AnimalDetail/WeightControlCreatePage";
import RecoverPasswordPage from "../pages/RecoverPasswordPage";
import { weightRouteOptions } from "../pages/Collective/Weight/constants";
import { saleRouteOptions } from "../pages/Collective/Sale/constants";

export const ROUTE_TYPES = {
  public: "public",
  private: "private",
};

export const RENDER_ROUTES = [
  /**
   * Rutas relacionadas al Módulo de nacimientos
   */
  {
    path: ROUTES_DICT.birth.root,
    key: "Nacimientos",
    exact: false,
    //component: BirthPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    component: ({ children }) => (
      <DefaultPage title="Nacimientos" chipList={birthChipOptions()}>
        {(props) => children(props)}
      </DefaultPage>
    ),
    routes: [
      {
        path: ROUTES_DICT.birth.list,
        key: "Lista de nacimientos",
        exact: false,
        component: (props) => <BirthListPage {...props} />,
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.birth.create,
            key: "Nuevo nacimiento",
            exact: true,
            component: (props) => <BirthCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.birth.update,
            key: "Actualizar nacimiento",
            exact: true,
            component: (props) => <BirthCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.birth.delete,
            key: "Actualizar nacimiento",
            exact: true,
            component: (props) => <BirthCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
        ],
      },
    ],
  },
  /**
   * Rutas relacionadas al Módulo de servicios
   */
  {
    path: ROUTES_DICT.service.root,
    key: "Servicios",
    exact: false,
    //component: ({ children }) => <>{children()}</>,
    component: ({ children }) => (
      <DefaultPage title="Servicios" chipList={serviceRouteOptions()}>
        {(props) => children(props)}
      </DefaultPage>
    ),
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.service.list,
        key: "Lista de Servicios",
        exact: false,
        component: (props) => <ServicePageList {...props} />,
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.service.createIAMN,
            key: "Nuevo IA/MN",
            exact: true,
            component: (props) => <IAMNCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.service.createET,
            key: "Nuevo IA/MN",
            exact: true,
            component: (props) => <EmbryoTransferCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.service.updateIAMN,
            key: "Editar IA/MN",
            exact: true,
            component: (props) => <IAMNUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.service.updateET,
            key: "Editar Transferencia de embriones",
            exact: true,
            component: (props) => <EmbryoTransferUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.service.delete,
            key: "Eliminar servicio",
            exact: true,
            component: (props) => <ServiceDeletePage {...props} />,
            type: ROUTE_TYPES.private,
          },
        ],
      },
    ],
  },
  /**
   * Rutas relacionadas al Módulo de stock genético
   */
  {
    path: ROUTES_DICT.geneticStock.root,
    key: "Stock genético",
    exact: false,
    component: ({ children }) => <>{children()}</>,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.geneticStock.geneticType.root,
        key: "Lista de Stock",
        exact: false,
        component: ({ children }) => (
          <DefaultPage>{(props) => children(props)}</DefaultPage>
        ),
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.geneticStock.geneticType.list,
            key: "Nuevo stock",
            exact: false,
            component: (props) => <GeneticStockList {...props} />,
            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.geneticStock.geneticType.create,
                key: "Nuevo stock",
                exact: true,
                component: (props) => <GeneticStockCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.geneticStock.geneticType.update,
                key: "Editar stock",
                exact: true,
                component: (props) => <GeneticStockUpdatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.geneticStock.geneticType.delete,
                key: "Eliminar stock",
                exact: true,
                component: (props) => <GeneticStockDeletePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },
          {
            path: ROUTES_DICT.geneticStock.movements.list,
            key: "Movimientos",
            exact: false,
            component: (props) => <MovementPageList {...props} />,
            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.geneticStock.movements.create,
                key: "Movimientos",
                exact: true,
                component: (props) => <MovementCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },
        ],
      },
    ],
  },
  /**
   * Rutas relacionadas al Módulo de control de animales
   */
  {
    path: ROUTES_DICT.animal.root,
    key: "Control Animal",
    exact: false,
    component: ({ children }) => (
      <DefaultPage>{(props) => children(props)}</DefaultPage>
    ),
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.animal.list,
        key: "Lista de animales",
        exact: false,
        component: (props) => <AnimalListPage {...props} />,
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.animal.create,
            key: "Nuevo animal",
            exact: true,
            component: (props) => <AnimalCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animal.createBulk,
            key: "Nuevo animal",
            exact: true,
            component: (props) => <AnimalCreateBulkPage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animal.update,
            key: "Editar animal",
            exact: true,
            component: (props) => <AnimalUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animal.delete,
            key: "Eliminar animal",
            exact: true,
            component: (props) => <AnimalDeletePage {...props} />,
            type: ROUTE_TYPES.private,
          },
        ],
      },
    ],
  },
  /**
   * Rutas relacionadas al Módulo de control de lechero
   */
  {
    path: ROUTES_DICT.milk.root,
    key: "Control Lechero",
    exact: false,
    component: ({ children }) => (
      <DefaultPage title="Control Lechero" chipList={milkRouteOptions()}>
        {(props) => children(props)}
      </DefaultPage>
    ),
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.milk.list,
        key: "Lista de control lechero",
        exact: false,
        component: (props) => <MilkListPage {...props} />,
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.milk.create,
            key: "Nuevo control lechero",
            exact: true,
            component: (props) => <MilkCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.milk.update,
            key: "Editar control lechero",
            exact: true,
            component: (props) => <MilkUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.milk.delete,
            key: "Eliminar control lechero",
            exact: true,
            component: (props) => <MilkDeletePage {...props} />,
            type: ROUTE_TYPES.private,
          },
        ],
      },
    ],
  },
  /**
   * Rutas relacionadas al Módulo de palpaciones
   */
  {
    path: ROUTES_DICT.palpation.root,
    key: "Palpaciones",
    exact: false,
    component: ({ children }) => (
      <DefaultPage title="Palpaciones" chipList={palpationRouteOptions()}>
        {(props) => children(props)}
      </DefaultPage>
    ),
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.palpation.list,
        key: "Lista de control lechero",
        exact: false,
        component: (props) => <PalpationListPage {...props} />,
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.palpation.create,
            key: "Nuevo control lechero",
            exact: true,
            component: (props) => <PalpationCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.palpation.update,
            key: "Editar control lechero",
            exact: true,
            component: (props) => <PalpationUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.palpation.delete,
            key: "Eliminar control lechero",
            exact: true,
            component: (props) => <PalpationDeletePage {...props} />,
            type: ROUTE_TYPES.private,
          },
        ],
      },
    ],
  },
  /**
   * Rutas relacionadas al Módulo de Pesaje
   */
  {
    path: ROUTES_DICT.weight.root,
    key: "Pesaje",
    exact: false,
    component: ({ children }) => (
      <DefaultPage title="Pesaje" chipList={weightRouteOptions()}>
        {(props) => children(props)}
      </DefaultPage>
    ),
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.weight.list,
        key: "Lista de pesaje",
        exact: false,
        component: (props) => <WeightListPage {...props} />,
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.weight.create,
            key: "Nuevo pesaje",
            exact: true,
            component: (props) => <WeightCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.weight.update,
            key: "Editar pesaje",
            exact: true,
            component: (props) => <WeightUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.weight.delete,
            key: "Eliminar pesaje",
            exact: true,
            component: (props) => <WeightDeletePage {...props} />,
            type: ROUTE_TYPES.private,
          },
        ],
      },
    ],
  },
  /**
   * Rutas relacionadas al Módulo de Ventas
   */
  {
    path: ROUTES_DICT.sale.root,
    key: "Ventas",
    exact: false,
    component: ({ children }) => (
      <DefaultPage title="Ventas" chipList={saleRouteOptions()}>
        {(props) => children(props)}
      </DefaultPage>
    ),
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.sale.list,
        key: "Lista de Ventas",
        exact: false,
        component: (props) => <SaleListPage {...props} />,
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.sale.create,
            key: "Nuevo Venta",
            exact: true,
            component: (props) => <SaleCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.sale.update,
            key: "Editar Venta",
            exact: true,
            component: (props) => <SaleUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.sale.delete,
            key: "Eliminar Venta",
            exact: true,
            component: (props) => <SaleDeletePage {...props} />,
            type: ROUTE_TYPES.private,
          },
        ],
      },
    ],
  },
  /**
   * Rutas relacionadas al Módulo de colectivas
   */
  {
    path: ROUTES_DICT.collective.root,
    key: "Colectiva",
    exact: false,
    component: ({ children }) => <>{children()}</>,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.collective.root,
        key: "Celos",
        exact: false,
        component: ({ children }) => (
          <DefaultPage>{(props) => children(props)}</DefaultPage>
        ),
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.collective.zeal.list,
            key: "Lista de Celos",
            exact: false,
            component: (props) => <ZealListPage {...props} />,
            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.collective.zeal.create,
                key: "Nuevo celo",
                exact: true,
                component: (props) => <ZealCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.zeal.update,
                key: "Editar celo",
                exact: true,
                component: (props) => <ZealUpdatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.zeal.delete,
                key: "Eliminar celo",
                exact: true,
                component: (props) => <ZealDeletePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },
          {
            path: ROUTES_DICT.collective.association.list,
            key: "Lista de asociacion",
            exact: false,
            component: (props) => <AssociationListPage {...props} />,
            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.collective.association.create,
                key: "Nuevo registro de asociacion",
                exact: true,
                component: (props) => <AssociationCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.association.update,
                key: "Editar registro de asociacion",
                exact: true,
                component: (props) => <AssociationUpdatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.association.delete,
                key: "Eliminar registro de asociacion",
                exact: true,
                component: (props) => <AssociationDeletePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },
          {
            path: ROUTES_DICT.collective.drying.list,
            key: "Lista de secado/desteste",
            exact: false,
            component: (props) => <DryingListPage {...props} />,
            type: ROUTE_TYPES.private,
            routes: [
              {
                path: ROUTES_DICT.collective.drying.create,
                key: "Nuevo secado/desteste",
                exact: true,
                component: (props) => <DryingCreatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.drying.update,
                key: "Editar secado/desteste",
                exact: true,
                component: (props) => <DryingUpdatePage {...props} />,
                type: ROUTE_TYPES.private,
              },
              {
                path: ROUTES_DICT.collective.drying.delete,
                key: "Eliminar secado/desteste",
                exact: true,
                component: (props) => <DryingDeletePage {...props} />,
                type: ROUTE_TYPES.private,
              },
            ],
          },
        ],
      },
    ],
  },

  // {
  //   path: ROUTES_DICT.animalDetail + "/:animalId",
  //   key: "Detalles de animal",
  //   exact: true,
  //   component: AnimalDetailPage,
  //   layout: DashboardLayout,
  //   type: ROUTE_TYPES.private,
  // },
  {
    path: ROUTES_DICT.animalDetail.root,
    key: "Detalles de animal",
    exact: false,
    component: ({ children }) => (
      <DefaultPage title="Control Ganadero">
        {(props) => children(props)}
      </DefaultPage>
    ),
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.animalDetail.pedigree,
        key: "Control Animal",
        exact: true,
        component: PedigreePage,
        type: ROUTE_TYPES.private,
      },
      {
        path: ROUTES_DICT.animalDetail.detail,
        key: "Detalle de animal",
        exact: false,
        component: (props) => <AnimalDetailPage {...props} />,
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.animalDetail.general.update,
            key: "Editar Datos Generales",
            exact: true,
            component: (props) => <GeneralUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animalDetail.race.update,
            key: "Editar Datos Razas",
            exact: true,
            component: (props) => <RaceUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animalDetail.birth.create,
            key: "Crear Datos Partos",
            exact: true,
            component: (props) => <BirthControlCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animalDetail.calendar.update,
            key: "Editar Datos Calendario",
            exact: true,
            component: (props) => <CalendarUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animalDetail.service.ia.create,
            key: "Crear Datos Servicios IA",
            exact: true,
            component: (props) => <IAServiceCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animalDetail.service.transfer.create,
            key: "Crear Datos Servicios TE",
            exact: true,
            component: (props) => <TransferServiceCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animalDetail.palpation.create,
            key: "Crear Datos Palpacion",
            exact: true,
            component: (props) => <PalapationControlCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animalDetail.other.update,
            key: "Editar Datos Extra",
            exact: true,
            component: (props) => <OtherUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animalDetail.milk.create,
            key: "Crear Datos Control Lechero",
            exact: true,
            component: (props) => <MilkControlCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animalDetail.weight.create,
            key: "Crear Datos Pesos",
            exact: true,
            component: (props) => <WeightControlCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animalDetail.delete,
            key: "Eliminar animal",
            exact: true,
            component: (props) => <AnimalDetailDeletePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animalDetail.image.upload,
            key: "Subir imagen",
            exact: true,
            component: (props) => <ImageUploadPage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.animalDetail.qr.view,
            key: "Ver código Qr",
            exact: true,
            component: (props) => <QrViewPage {...props} />,
            type: ROUTE_TYPES.private,
          },
        ],
      },
      {
        path: ROUTES_DICT.animalDetail.birth.list,
        key: "Listar Datos Partos",
        exact: true,
        component: (props) => <BirthListPage {...props} />,
        type: ROUTE_TYPES.private,
      },
      {
        path: ROUTES_DICT.animalDetail.service.list,
        key: "List Datos Servicios",
        exact: true,
        component: (props) => <ServicePageList {...props} />,
        type: ROUTE_TYPES.private,
      },
      {
        path: ROUTES_DICT.animalDetail.palpation.list,
        key: "Listar Datos Palpacion",
        exact: true,
        component: (props) => <PalpationListPage {...props} />,
        type: ROUTE_TYPES.private,
      },
      {
        path: ROUTES_DICT.animalDetail.milk.list,
        key: "Listar Datos Control Lechero",
        exact: true,
        component: (props) => <MilkListPage {...props} />,
        type: ROUTE_TYPES.private,
      },
      {
        path: ROUTES_DICT.animalDetail.weight.list,
        key: "Listar Datos Pesos",
        exact: true,
        component: (props) => <WeightListPage {...props} />,
        type: ROUTE_TYPES.private,
      },
    ],
  },
  /**
   * Rutas relacionadas al Módulo de usuarios y planes
   */
  {
    path: ROUTES_DICT.plan,
    key: "Planes",
    exact: true,
    component: PlanPage,
    layout: ConfigLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.users.root,
    key: "Usuarios",
    exact: false,
    layout: ConfigLayout,
    type: ROUTE_TYPES.private,
    component: ({ children }) => (
      <DefaultPage>{(props) => children(props)}</DefaultPage>
    ),
    routes: [
      {
        path: ROUTES_DICT.users.list,
        key: "Lista de usuarios",
        exact: false,
        component: (props) => <UserListPage {...props} />,
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.users.create,
            key: "Nuevo usuario",
            exact: true,
            component: (props) => <UserCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.users.update,
            key: "Actualizar usuario",
            exact: true,
            component: (props) => <UserUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.users.delete,
            key: "Eliminar usuario",
            exact: true,
            component: (props) => <UserDeletePage {...props} />,
            type: ROUTE_TYPES.private,
          },
        ],
      },
    ],
  },
  {
    path: ROUTES_DICT.profile,
    key: "Perfiles",
    exact: true,
    component: ProfilesControlPage,
    layout: ConfigLayout,
    type: ROUTE_TYPES.private,
  },
  {
    path: ROUTES_DICT.account,
    key: "Cuenta",
    exact: true,
    component: AccountUpdatePage,
    layout: ConfigLayout,
    type: ROUTE_TYPES.private,
  },
  /**
   * Rutas relacionadas al Módulo de autentificacion
   */
  {
    path: ROUTES_DICT.emailVerified + "/:userId",
    key: "Verificacion",
    exact: true,
    component: EmailVerifiedPage,
    layout: AuthLayout,
    type: ROUTE_TYPES.public,
  },

  {
    path: ROUTES_DICT.login,
    key: "Login",
    exact: true,
    component: (props) => <LoginPage />,
    layout: AuthLayout,
    type: ROUTE_TYPES.public,
  },
  {
    path: ROUTES_DICT.register,
    key: "Registro",
    exact: true,
    component: RegisterPage,
    layout: AuthLayout,
    type: ROUTE_TYPES.public,
  },
  {
    path: ROUTES_DICT.recoverPassword,
    key: "Recover password",
    exact: true,
    component: RecoverPasswordPage,
    layout: AuthLayout,
    type: ROUTE_TYPES.public,
  },
  /**
   * Rutas relacionadas al Módulo de gestion de haciendas y agronegocios
   */
  {
    path: ROUTES_DICT.hacienda.root,
    key: "Hacienda",
    exact: false,
    component: ({ children }) => (
      <DefaultPage>{(props) => children(props)}</DefaultPage>
    ),
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
    routes: [
      {
        path: ROUTES_DICT.hacienda.root,
        key: "Configuracion de Hacienda",
        exact: false,
        component: (props) => <HaciendaConfigurationPage {...props} />,
        type: ROUTE_TYPES.private,
        routes: [
          {
            path: ROUTES_DICT.hacienda.farm.update,
            key: "Editar hacienda",
            exact: true,
            component: (props) => <FarmUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.hacienda.agribusiness.create,
            key: "Nuevo agronegocio",
            exact: true,
            component: (props) => <AgribusinessCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.hacienda.agribusiness.update,
            key: "Editar agronegocio",
            exact: true,
            component: (props) => <AgribusinessUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.milk.delete,
            key: "Eliminar control lechero",
            exact: true,
            component: (props) => <MilkDeletePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.hacienda.collaborator.create,
            key: "Nuevo colaborador",
            exact: true,
            component: (props) => <CollaboratorCreatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.hacienda.collaborator.update,
            key: "Editar colaborador",
            exact: true,
            component: (props) => <CollaboratorUpdatePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.hacienda.collaborator.delete,
            key: "Eliminar colaborador",
            exact: true,
            component: (props) => <CollaboratorDeletePage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.hacienda.farm.image.upload,
            key: "Subir imagen granja",
            exact: true,
            component: (props) => <FarmImageUploadPage {...props} />,
            type: ROUTE_TYPES.private,
          },
          {
            path: ROUTES_DICT.hacienda.agribusiness.image.upload,
            key: "Subir imagen agronegocio",
            exact: true,
            component: (props) => <AgribusinessImageUploadPage {...props} />,
            type: ROUTE_TYPES.private,
          },
        ],
      },
    ],
  },
  /**
   * Rutas relacionadas al Módulo de preñeces
   */
  {
    path: ROUTES_DICT.pregnancies,
    key: "Celos",
    exact: true,
    component: PregnanciesPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },

  {
    path: ROUTES_DICT.setup,
    key: "Celos",
    exact: true,
    component: SetupControlPage,
    layout: DashboardLayout,
    type: ROUTE_TYPES.private,
  },
];
