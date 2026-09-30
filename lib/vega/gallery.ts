/** Renders from the supplied VEGA mesh, without changes to product geometry. */
export const galleryData = {
  eyebrow: "ESTUDIO DE PRODUCTO / VEGA",
  title: "Un modelo.",
  subtitle: "Más perspectivas.",
  instruction: "Elige una vista para descubrir el conjunto.",
  detailLink: "EXPLORAR EL MODELO EN 3D",
  views: [
    {id:"front",label:"Vista frontal",detail:"SIMETRÍA / CONJUNTO",image:"/vega/images/vega-frontal.png",alt:"Modelo real de VEGA visto desde el frente"},
    {id:"rear",label:"Tres cuartos posterior",detail:"VOLUMEN / PERSPECTIVA",image:"/vega/images/vega-posterior.png",alt:"Modelo real de VEGA desde un ángulo posterior elevado"},
    {id:"side",label:"Perfil lateral",detail:"PERFIL / ESTRUCTURA",image:"/vega/images/vega-lateral.png",alt:"Modelo real de VEGA de perfil"},
    {id:"below",label:"Vista inferior",detail:"OTRO ÁNGULO / DETALLE",image:"/vega/images/vega-inferior.png",alt:"Modelo real de VEGA visto desde abajo"},
  ],
} as const;
