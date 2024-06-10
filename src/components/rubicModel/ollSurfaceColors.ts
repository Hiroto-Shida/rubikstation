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
    case "TOP_CROSS":
      return {
        top: ["gray", "gray", "gray"],
        right: ["gray", "gray", "gray"],
        bottom: ["gray", "gray", "gray"],
        left: ["gray", "gray", "gray"],
        centerLeft: ["black", "yellow", "black"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["black", "yellow", "black"],
      };
    case "DOT":
      return {
        top: ["gray", "gray", "gray"],
        right: ["gray", "gray", "gray"],
        bottom: ["gray", "gray", "gray"],
        left: ["gray", "gray", "gray"],
        centerLeft: ["black", "black", "black"],
        centerCenter: ["black", "yellow", "black"],
        centerRight: ["black", "black", "black"],
      };
    case "LINE":
      return {
        top: ["gray", "gray", "gray"],
        right: ["gray", "gray", "gray"],
        bottom: ["gray", "gray", "gray"],
        left: ["gray", "gray", "gray"],
        centerLeft: ["black", "yellow", "black"],
        centerCenter: ["black", "yellow", "black"],
        centerRight: ["black", "yellow", "black"],
      };
    case "L":
      return {
        top: ["gray", "gray", "gray"],
        right: ["gray", "gray", "gray"],
        bottom: ["gray", "gray", "gray"],
        left: ["gray", "gray", "gray"],
        centerLeft: ["black", "yellow", "black"],
        centerCenter: ["black", "yellow", "yellow"],
        centerRight: ["black", "black", "black"],
      };
    case "DOT_EX":
      return {
        top: ["gray", "gray", "gray"],
        right: ["gray", "gray", "gray"],
        bottom: ["gray", "gray", "gray"],
        left: ["gray", "gray", "gray"],
        centerLeft: ["yellow", "black", "yellow"],
        centerCenter: ["black", "yellow", "black"],
        centerRight: ["yellow", "black", "yellow"],
      };
    case "LINE_EX":
      return {
        top: ["gray", "gray", "gray"],
        right: ["gray", "gray", "gray"],
        bottom: ["gray", "gray", "gray"],
        left: ["gray", "gray", "gray"],
        centerLeft: ["black", "yellow", "yellow"],
        centerCenter: ["black", "yellow", "black"],
        centerRight: ["black", "yellow", "yellow"],
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
