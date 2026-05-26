export const BUYER_LANDING_PATHS = {
  primary: "/nominee-buyers",
  secondary: "/nominee-buyers-2",
} as const;

export type BuyerLandingFormType = "nominee-buyers" | "nominee-buyers-2";

export function isBuyerLandingPath(pathname: string) {
  return (
    pathname === BUYER_LANDING_PATHS.primary || pathname === BUYER_LANDING_PATHS.secondary
  );
}
