/** Global scale applied to every particle’s longest edge (size in project data). */
export const PARTICLE_SIZE_SCALE = 1.5;

/** Fit particle inside a max edge while preserving width / height ratio. */
export function getParticleDimensions(
  maxSize: number,
  aspectRatio: number,
): { width: number; height: number } {
  const scaledMax = Math.round(maxSize * PARTICLE_SIZE_SCALE);
  const safeRatio = aspectRatio > 0 ? aspectRatio : 1;

  if (safeRatio >= 1) {
    return {
      width: scaledMax,
      height: Math.round(scaledMax / safeRatio),
    };
  }

  return {
    width: Math.round(scaledMax * safeRatio),
    height: scaledMax,
  };
}
