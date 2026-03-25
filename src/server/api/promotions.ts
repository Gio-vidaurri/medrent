import { strapiFetch } from "../strapiClient";

/** Única función para datos de `promo-sliders` (populate alineado con PR #64). */
export async function getPromotionSlides() {
  const res = await strapiFetch(
    "/promo-sliders?populate[desktopImage]=true&populate[mobileImage]=true&sort=displayOrder:asc",
  );

  return Array.isArray(res?.data) ? res.data : [];
}
