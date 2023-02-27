import { Seuil } from "../utils/seuil"
/**
 * Hook to access the global Seuil instance
 *
 * @returns {Seuil}
 */
export const useSeuil = (): Seuil => {
  return Seuil.getInstance()
}
