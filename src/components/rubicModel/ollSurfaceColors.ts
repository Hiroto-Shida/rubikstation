export type RubiksColor =
  | "red"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "yellow_A"
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
    case "WHITE_CROSS":
      return {
        top: ["black", "green", "black"],
        right: ["black", "orange", "black"],
        bottom: ["black", "blue", "black"],
        left: ["black", "red", "black"],
        centerLeft: ["black", "white", "black"],
        centerCenter: ["white", "white", "white"],
        centerRight: ["black", "white", "black"],
      };

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

    case "CROSS_1_EX1":
      return {
        top: ["black", "black", "yellow"],
        right: ["yellow", "black", "black"],
        bottom: ["black", "black", "black"],
        left: ["black", "black", "yellow"],
        centerLeft: ["yellow", "yellow", "black"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["black", "yellow", "black"],
      };

    case "CROSS_1_EX2":
      return {
        top: ["yellow", "black", "black"],
        right: ["black", "black", "yellow"],
        bottom: ["black", "black", "yellow"],
        left: ["black", "black", "black"],
        centerLeft: ["yellow", "yellow", "black"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["black", "yellow", "black"],
      };

    case "CROSS_0_EX1":
      return {
        top: ["black", "black", "black"],
        right: ["black", "black", "yellow"],
        bottom: ["yellow", "black", "yellow"],
        left: ["black", "black", "yellow"],
        centerLeft: ["black", "yellow", "black"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["black", "yellow", "black"],
      };

    case "CROSS_2_EX1":
      return {
        top: ["black", "black", "black"],
        right: ["black", "black", "yellow"],
        bottom: ["yellow", "black", "black"],
        left: ["black", "black", "black"],
        centerLeft: ["black", "yellow", "yellow"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["yellow", "yellow", "black"],
      };

    case "CROSS_1_EX1_A":
      return {
        top: ["black", "black", "yellow"],
        right: ["yellow", "black", "black"],
        bottom: ["black", "black", "black"],
        left: ["black", "black", "yellow"],
        centerLeft: ["yellow_A", "yellow", "black"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["black", "yellow", "black"],
      };

    case "CROSS_1_EX2_A":
      return {
        top: ["yellow", "black", "black"],
        right: ["black", "black", "yellow"],
        bottom: ["black", "black", "yellow"],
        left: ["black", "black", "black"],
        centerLeft: ["yellow_A", "yellow", "black"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["black", "yellow", "black"],
      };

    case "CROSS_0_EX1_A":
      return {
        top: ["black", "black", "black"],
        right: ["black", "black", "yellow"],
        bottom: ["yellow_A", "black", "yellow"],
        left: ["black", "black", "yellow"],
        centerLeft: ["black", "yellow", "black"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["black", "yellow", "black"],
      };

    case "CROSS_0_EX2_A":
      return {
        top: ["yellow", "black", "yellow"],
        right: ["black", "black", "black"],
        bottom: ["yellow_A", "black", "yellow"],
        left: ["black", "black", "black"],
        centerLeft: ["black", "yellow", "black"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["black", "yellow", "black"],
      };

    case "CROSS_2_EX1_A":
      return {
        top: ["black", "black", "black"],
        right: ["black", "black", "yellow"],
        bottom: ["yellow_A", "black", "black"],
        left: ["black", "black", "black"],
        centerLeft: ["black", "yellow", "yellow"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["yellow", "yellow", "black"],
      };

    case "CROSS_2_EX2_A":
      return {
        top: ["yellow", "black", "black"],
        right: ["black", "black", "black"],
        bottom: ["yellow_A", "black", "black"],
        left: ["black", "black", "black"],
        centerLeft: ["black", "yellow", "black"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["yellow", "yellow", "yellow"],
      };

    case "CROSS_2_EX3_A":
      return {
        top: ["black", "black", "black"],
        right: ["black", "black", "black"],
        bottom: ["yellow_A", "black", "yellow"],
        left: ["black", "black", "black"],
        centerLeft: ["black", "yellow", "yellow"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["black", "yellow", "yellow"],
      };

    case "PLL_CORNER":
      return {
        top: ["green", "black", "green"],
        right: ["red", "black", "red"],
        bottom: ["blue", "black", "blue"],
        left: ["orange", "black", "orange"],
        centerLeft: ["yellow", "yellow", "yellow"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["yellow", "yellow", "yellow"],
      };

    case "PLL_CORNER_0_PAIRS":
      return {
        top: ["red", "black", "orange"],
        right: ["blue", "black", "green"],
        bottom: ["red", "black", "orange"],
        left: ["blue", "black", "green"],
        centerLeft: ["yellow", "yellow", "yellow"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["yellow", "yellow", "yellow"],
      };

    case "PLL_CORNER_1_PAIRS":
      return {
        top: ["green", "black", "red"],
        right: ["green", "black", "blue"],
        bottom: ["blue", "black", "red"],
        left: ["orange", "black", "orange"],
        centerLeft: ["yellow", "yellow", "yellow"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["yellow", "yellow", "yellow"],
      };

    case "PLL_EDGE_0_FULL":
      return {
        top: ["green", "orange", "green"],
        right: ["red", "blue", "red"],
        bottom: ["blue", "red", "blue"],
        left: ["orange", "green", "orange"],
        centerLeft: ["yellow", "yellow", "yellow"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["yellow", "yellow", "yellow"],
      };

    case "PLL_EDGE_1_FULL":
      return {
        top: ["green", "green", "green"],
        right: ["red", "blue", "red"],
        bottom: ["blue", "orange", "blue"],
        left: ["orange", "red", "orange"],
        centerLeft: ["yellow", "yellow", "yellow"],
        centerCenter: ["yellow", "yellow", "yellow"],
        centerRight: ["yellow", "yellow", "yellow"],
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
