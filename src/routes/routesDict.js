export const ROUTES_SLUGS = {
  register: "register",
  login: "login",
  dashboard: "dashboard",
  geneticStock: "genetic-stock",
  semen: "semen",
  movements: "movements",
  embryo: "embryo",
  colective: "colective",
  sale: "sale",
  /* common routes slugs */
  create: "create",
};

export const ROUTES_DICT = {
  root: "/",
  register: `/${ROUTES_SLUGS.register}`,
  login: `/${ROUTES_SLUGS.login}`,
  dashboard: `/${ROUTES_SLUGS.dashboard}`,
  semen: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/${ROUTES_SLUGS.semen}`,
  semenCreate: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/${ROUTES_SLUGS.semen}/${ROUTES_SLUGS.create}`,
  movements: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/${ROUTES_SLUGS.movements}`,
  movementsCreate: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/${ROUTES_SLUGS.movements}/${ROUTES_SLUGS.create}`,
  embryo: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/${ROUTES_SLUGS.embryo}`,
  embryoCreate: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/${ROUTES_SLUGS.embryo}/${ROUTES_SLUGS.create}`,
  account: "/cuenta",
  profile: "/perfil",
  users: "/usuario",
  plan: "/plan",
  hacienda: "/hacienda",
  sale: "/dashboard/colectiva-ventas",
  weight: "/dashboard/colectiva-pesaje",
  zeal: "/dashboard/colectiva-celos",
  service: "/dashboard/servicios",
  birth: "/dashboard/nacimientos",
  palpations: "/dashboard/palpaciones",
  emailVerified: "/email-verified",
  pregnancies: "/dashboard/preñeces",
  animalDetail: "/dashboard/detalles-animal",
  pedigree: "/dashboard/detalles-animal/:animalId/pedigree",
  animalControl: "/dashboard/control-animal",
  recoverPassword: "/recover-password",
  setup: "/setup",
};
