import { ESPECIALTIES } from "@lib/site";

export type HomeEspecialidadItem = {
  name: string;
  slug: string;
  isActive: boolean;
  iconImage: string;
};

/**
 * Mosaico del home: misma fuente que el listado `/especialidades`
 * ([`ESPECIALTIES`](./site.ts)), evitando duplicar nombres/slugs en otro array.
 * Imágenes: mismas rutas que [`especialidades/index.astro`](../pages/especialidades/index.astro).
 */
export const HOME_ESPECIALIDADES: HomeEspecialidadItem[] = ESPECIALTIES.map(
  (c) => ({
    name: c.Nombre,
    slug: c.Slug,
    isActive: true,
    iconImage: `/temp/especialidades/${c.Image}`,
  }),
);

export function getHomeEspecialidadesForSlider(): HomeEspecialidadItem[] {
  return HOME_ESPECIALIDADES.filter((m) => m.name !== "Consumibles");
}
