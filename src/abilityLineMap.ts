export enum Ability {
  Flurry,
  ExposedCore,
  Minions,
  Pillars,
  Cannon,
}

export type AbilityLineFragment = {
  ability: Ability;
  fragment: string;
};

/**
 * Ariane: Get out of there!
 * Azzanadra: The exposed core is certain death.
 * Ariane: Nothing can withstand that amount of
 */
export const coreLineFragments = [
  "Azzanadra: You cannot be",
  "Ariane: Get out of there!",
  "Ariane: Nothing can with",
  "Azzanadra: You must avoid",
  "Ariane: Smash your way",
  "Azzanadra: Destroy the arms",
  "Azzanadra: Break through",
  "Azzanadra: Sunder the arms",
];

/**
 *
 */
export const minionLineFragments = [
  "Ariane: It's summoning",
  "Azzanadra: Glacytes",
  "Ariane: It draws power",
  "Azzanadra: Your attacks",
  "Azzanadra: They give their",
  "Ariane: These glacytes",
  "Ariane: It uses energy",
];

/**
 * Azzanadra: Run, World Guardian!
 * Ariane: Run, World Guardian!
 * Azzanadra: Dodge those beams!
 * Azzanadra: The air grows colder yet.
 */
export const pillarLineFragments = [
  "Azzanadra: Run, World",
  "Ariane: Run, World",
  "Azzanadra: Dodge those",
  "Azzanadra: The air grows",
  "Ariane: Move",
  "Azzanadra: Move!",
  "Ariane: Dodge the ice",
];

/**
 * Ariane: It's that giant beam...
 * Ariane: Block! Now!
 * Azzanadra: Ready your defences.
 */
export const cannonLineFragments = [
  "Azzanadra: Fortify yourse",
  "Ariane: Can't dodge that",
  "Ariane: It's that giant",
  "Ariane: Block! Now!",
  "Ariane: Steel",
  "Azzanadra: Ready your",
  "Azzanadra: Steel",
  "Ariane: It's charging!",
  "Azzanadra: Brace yourse",
];

/**
  // Azzanadra: Prepare for a barrage!
  // Azzanadra: A flurry of attacks incoming.
  // Ariane: Faster attacks incoming!
  // Azzanadra: It's changing its attack pattern.
  // Ariane: React to its attacks accordingly.
  // Ariane: It's changing its attack pattern.
  // Ariane: It's switching up its attacks. */
export const flurryLineFragments = [
  "Azzanadra: Prepare for",
  "Azzanadra: A flurry",
  "Azzanadra: Okay, here come",
  "Azzanadra: It's changing",
  "Ariane: Faster",
  "Ariane: React to",
  "Ariane: It's changing",
  "Ariane: It's switching",
];

export const AGDeadLines = ["received:", "charming imp", "Completion Time:"];
