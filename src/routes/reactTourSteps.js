const steps = [
  {
    content: <h2>Bienvenido a Contigo Pecuario !!</h2>,
    placement: "center",
    target: "body",
  },
  {
    content: <h2>Aqui podras modificar tus agronegocios o hacienda.</h2>,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 20,
    placement: "right",
    target: ".hacienda",
  },
  // {
  //   content: <h2>Sticky elements</h2>,
  //   floaterProps: {
  //     disableAnimation: true,
  //   },
  //   spotlightPadding: 20,
  //   target: ".report",
  // },
  {
    content: (
      <h2>
        Aqui podras hacer el registro de usuarios y cambios de contraseña.
      </h2>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    placement: "right",
    spotlightClicks: true,
    // styles: {
    //   options: {
    //     zIndex: 10000,
    //   },
    // },
    target: ".botones",
  },
  {
    content: (
      <h2>Queremos Mejorar Continuamente, ayudanos con tus sugerencias</h2>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    placement: "right",
    spotlightClicks: true,
    // styles: {
    //   options: {
    //     zIndex: 10000,
    //   },
    // },
    target: ".reporte",
  },
  {
    content: (
      <h2>
        Aqui puede registrar sus datos, Podemos mejorar solo lo que Podemos
        medir, y empezamos a medir cuando registramos los datos.
      </h2>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    placement: "right",
    spotlightClicks: true,
    // styles: {
    //   options: {
    //     zIndex: 10000,
    //   },
    // },
    target: ".sidebar_primario",
  },
  {
    content: (
      <h2>
        Revisa tus indicadores de manera frecuente, a mayor precision en tiempo
        y datos, mayor oportunidad de mejora
      </h2>
    ),
    placement: "right",
    locale: {
      last: (
        <strong
          aria-label="last"
          onClick={() => {
            console.log("asd");
          }}
        >
          Final
        </strong>
      ),
    },
    spotlightPadding: 0,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
    target: ".mejora",
  },
];

export default steps;
