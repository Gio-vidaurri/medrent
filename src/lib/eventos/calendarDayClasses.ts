/**
 * Estados visuales del calendario de eventos (hoy = borde, eventos = relleno, selección = anillo).
 * Compartido entre SSR (Astro) y cliente para consistencia.
 */
export function calendarDayClasses(params: {
  isCurrentMonth: boolean;
  isToday: boolean;
  fullDate: string;
  day: number;
  diasConEventos: (number | string)[];
  selectedIso: string | null;
}): string {
  const { isCurrentMonth, isToday, fullDate, day, diasConEventos, selectedIso } =
    params;
  const hasDay = (d: number) =>
    diasConEventos.some((x) => Number(x) === Number(d));
  const hasEvent = isCurrentMonth && hasDay(day);
  const isSelected = Boolean(selectedIso && selectedIso === fullDate);

  const base =
    "mx-auto flex h-8 w-8 min-h-[2rem] min-w-[2rem] items-center justify-center rounded-full text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006764] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 ";

  if (!isCurrentMonth) {
    return base + "cursor-default text-gray-300";
  }
  if (isToday && hasEvent) {
    return (
      base +
      "border-2 border-white bg-[#006764] font-semibold text-white shadow-[0_0_0_1px_#006764]" +
      (isSelected ? " ring-2 ring-[#261819] ring-offset-2" : "")
    );
  }
  if (isToday) {
    return (
      base +
      "border-2 border-[#006764] bg-transparent text-[#006764]" +
      (isSelected ? " ring-2 ring-[#261819] ring-offset-2" : "")
    );
  }
  if (hasEvent) {
    return (
      base +
      "bg-[#006764] text-white hover:bg-[#005550]" +
      (isSelected ? " ring-2 ring-[#261819] ring-offset-2" : "")
    );
  }
  if (isSelected) {
    return base + "bg-white text-gray-900 ring-2 ring-[#261819] ring-offset-2";
  }
  return base + "cursor-pointer text-gray-700 hover:bg-gray-100";
}

export function calendarDayAriaLabel(
  fullDate: string,
  hasEvent: boolean,
  dayjsFn: (d: string) => { format: (p: string) => string },
): string {
  const d = dayjsFn(fullDate);
  const formatted = d.format("D [de] MMMM [de] YYYY");
  return hasEvent
    ? `${formatted}, hay eventos programados`
    : `${formatted}, sin eventos`;
}
