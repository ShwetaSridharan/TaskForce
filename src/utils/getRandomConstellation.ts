// src/utils/getRandomConstellation.ts

// Define the 3D point type
export type StarPoint = {
  x: number;
  y: number;
  z: number;
};

/**
 * Generates a "seeded" random number between min and max.
 * This ensures the same pattern for the same day.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Generates a random constellation of stars based on the task count.
 * @param taskCount - Number of tasks (number of stars)
 * @returns Array of 3D points representing star positions
 */
export function getRandomConstellation(taskCount: number): StarPoint[] {
  const stars: StarPoint[] = [];

  // Use today's date as a seed (e.g., 2025-05-31 => 20250531)
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  // Generate each star point
  for (let i = 0; i < taskCount; i++) {
    const starSeed = seed + i; // Vary seed by task index

    // Random positions within a cube (-5 to +5 for x, y, z)
    const x = (seededRandom(starSeed * 1.1) - 0.5) * 10;
    const y = (seededRandom(starSeed * 1.2) - 0.5) * 10;
    const z = (seededRandom(starSeed * 1.3) - 0.5) * 10;

    stars.push({ x, y, z });
  }

  return stars;
}
