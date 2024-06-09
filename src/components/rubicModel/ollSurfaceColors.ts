export type RubiksColor =
  | "red"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "white"
  | "black"
  | "gray";
export type TopRightBottomLeftCenter =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "centerLeft"
  | "centerCenter"
  | "centerRight";

export type OllSurfaceType = {
  [key in TopRightBottomLeftCenter]: RubiksColor[];
};

export const ollSurfaceColors = (status: string): OllSurfaceType => {
  switch (status) {
    case "YELLOW_CROSS":
      return {
        top: ["gray", "gray", "gray"],
        right: ["gray", "gray", "gray"],
        bottom: ["gray", "gray", "gray"],
        left: ["gray", "gray", "gray"],
        centerLeft: ["black", "yellow", "black"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["black", "yellow", "black"],
      };
    default:
      return {
        top: ["green", "green", "green"],
        right: ["red", "red", "red"],
        bottom: ["blue", "blue", "blue"],
        left: ["orange", "orange", "orange"],
        centerLeft: ["yellow", "yellow", "yellow"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["yellow", "yellow", "yellow"],
      };
  }
};

// export const DEFAULT = ["red", "orange", "green", "blue", "yellow", "white"];

// export const BLACK = ["black", "black", "black", "black", "black", "black"];
