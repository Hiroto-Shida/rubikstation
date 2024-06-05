export type Axis = "x" | "y" | "z";
export type Limit = -0.5 | 0.5;
export type Multiplier = -1 | 1;

export const ROTATE_DIRECTION: { [key: string]: [Axis, Limit | undefined, Multiplier] } = {
  F: ["z", 0.5, -1],
  "F'": ["z", 0.5, 1],

  B: ["z", -0.5, 1],
  "B'": ["z", -0.5, -1],

  R: ["x", 0.5, -1],
  "R'": ["x", 0.5, 1],

  L: ["x", -0.5, 1],
  "L'": ["x", -0.5, -1],

  U: ["y", 0.5, -1],
  "U'": ["y", 0.5, 1],

  D: ["y", -0.5, 1],
  "D'": ["y", -0.5, -1],

  y: ["y", undefined, -1],
  "y'": ["y", undefined, 1],
};
