import { ESPECIALTIES } from "@lib/site";

export type HomeEspecialidadItem = {
  name: string;
  slug: string;
  isActive: boolean;
  iconImage: string;
};

/**
 * Iconos del mosaico del home (84×84): versión en `/temp/categorias/`
 * (no usar aquí las fotos grandes `/temp/especialidades/*.jpg` del listado).
 */
const HOME_MOSAIC_ICONS: Record<string, string> = {
  neurofisiologia: "/temp/categorias/img - especialidad.png",
  neurocirugia: "/temp/categorias/img - especialidad-1.png",
  neuromodulacion: "/temp/categorias/img - especialidad-2.png",
  rehabilitacion: "/temp/categorias/img - especialidad-3.png",
  neurovascular: "/temp/categorias/img - especialidad-4.png",
  consumibles: "/temp/categorias/img - especialidad-5.png",
};

/**
 * Mosaico del home: nombres/slugs desde [`ESPECIALTIES`](./site.ts);
 * iconos pequeños desde `HOME_MOSAIC_ICONS`.
 */
export const HOME_ESPECIALIDADES: HomeEspecialidadItem[] = ESPECIALTIES.map(
  (c) => ({
    name: c.Nombre,
    slug: c.Slug,
    isActive: true,
    iconImage:
      HOME_MOSAIC_ICONS[c.Slug] ?? `/temp/especialidades/${c.Image}`,
  }),
);

export function getHomeEspecialidadesForSlider(): HomeEspecialidadItem[] {
  return HOME_ESPECIALIDADES.filter((m) => m.name !== "Consumibles");
}
