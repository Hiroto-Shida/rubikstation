export const surfaceColorList = (
  status: string
): { [key: number]: string[] | undefined } | undefined => {
  switch (status) {
    case "CROSS":
      return {
        4: ["black", "red", "black", "black", "black", "black"],
        7: ["black", "red", "white", "black", "black", "black"],
        10: ["black", "black", "black", "yellow", "black", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        15: ["black", "black", "white", "black", "black", "green"],
        16: ["black", "black", "white", "black", "black", "black"], // top
        17: ["black", "black", "white", "black", "blue", "black"],
        22: ["orange", "black", "black", "black", "black", "black"],
        25: ["orange", "black", "white", "black", "black", "black"],
      };

    case "CROSS_CENTER_EX1":
      return {
        16: ["black", "black", "white", "black", "black", "black"], // top
        23: ["blue", "black", "black", "black", "white", "black"],
      };

    case "CROSS_CENTER_EX2":
      return {
        16: ["black", "black", "white", "black", "black", "black"], // top
        23: ["white", "black", "black", "black", "red", "black"],
      };

    case "CROSS_BOTTOM_SIDE_EX1":
      return {
        16: ["black", "black", "white", "black", "black", "black"], // top
        17: ["black", "black", "blue", "black", "white", "black"],
      };

    case "CROSS_BOTTOM_SIDE_EX2":
      return {
        16: ["black", "black", "white", "black", "black", "black"], // top
        19: ["white", "black", "black", "red", "black", "black"],
      };

    case "CROSS_BOTTOM_BOTTOM":
      return {
        16: ["black", "black", "white", "black", "black", "black"], // top
        19: ["blue", "black", "black", "white", "black", "black"],
      };

    case "CROSS_PRACTICE_1":
      return {
        16: ["black", "black", "white", "black", "black", "black"], // top
        17: ["black", "black", "white", "black", "green", "black"],
        23: ["blue", "black", "black", "black", "white", "black"],
        25: ["red", "black", "white", "black", "black", "black"],
      };

    case "CROSS_PRACTICE_2":
      return {
        16: ["black", "black", "white", "black", "black", "black"], // top
        17: ["black", "black", "white", "black", "green", "black"],
        19: ["white", "black", "black", "blue", "black", "black"],
        25: ["red", "black", "white", "black", "black", "black"],
      };

    case "CROSS_PRACTICE_3":
      return {
        7: ["black", "blue", "white", "black", "black", "black"],
        16: ["black", "black", "white", "black", "black", "black"], // top
        17: ["black", "black", "orange", "black", "white", "black"],
        25: ["green", "black", "white", "black", "black", "black"],
      };

    case "CROSS_CONFIRM":
      return {
        4: ["black", "red", "black", "black", "black", "black"],
        7: ["black", "green", "white", "black", "black", "black"],
        10: ["black", "black", "black", "yellow", "black", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        15: ["black", "black", "white", "black", "black", "orange"],
        16: ["black", "black", "white", "black", "black", "black"], // top
        17: ["black", "black", "white", "black", "red", "black"],
        22: ["orange", "black", "black", "black", "black", "black"],
        25: ["blue", "black", "white", "black", "black", "black"],
      };

    case "F1L":
      return {
        0: ["black", "orange", "black", "white", "black", "green"],
        1: ["black", "orange", "black", "white", "black", "black"],
        2: ["black", "orange", "black", "white", "blue", "black"],
        4: ["black", "orange", "black", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        18: ["red", "black", "black", "white", "black", "green"],
        19: ["red", "black", "black", "white", "black", "black"],
        20: ["red", "black", "black", "white", "blue", "black"],
        22: ["red", "black", "black", "black", "black", "black"],
      };

    case "F1L_READY":
      return {
        1: ["black", "orange", "black", "white", "black", "black"],
        4: ["black", "orange", "black", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        19: ["red", "black", "black", "white", "black", "black"],
        22: ["red", "black", "black", "black", "black", "black"],
        24: ["white", "black", "blue", "black", "black", "red"],
      };

    case "F1L_SIDE_EX1":
      return {
        1: ["black", "orange", "black", "white", "black", "black"],
        4: ["black", "orange", "black", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        19: ["red", "black", "black", "white", "black", "black"],
        22: ["red", "black", "black", "black", "black", "black"],
        26: ["white", "black", "red", "black", "blue", "black"],
      };

    case "F1L_SIDE_EX2":
      return {
        1: ["black", "orange", "black", "white", "black", "black"],
        4: ["black", "orange", "black", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        19: ["red", "black", "black", "white", "black", "black"],
        22: ["red", "black", "black", "black", "black", "black"],
        26: ["red", "black", "blue", "black", "white", "black"],
      };

    case "F1L_SIDE_EX3":
      return {
        1: ["black", "orange", "black", "white", "black", "black"],
        4: ["black", "orange", "black", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        19: ["red", "black", "black", "white", "black", "black"],
        22: ["red", "black", "black", "black", "black", "black"],
        26: ["blue", "black", "white", "black", "red", "black"],
      };

    case "F1L_WHITE_IN_BOTTOM":
      return {
        1: ["black", "orange", "black", "white", "black", "black"],
        4: ["black", "orange", "black", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        19: ["red", "black", "black", "white", "black", "black"],
        20: ["blue", "black", "black", "red", "white", "black"],
        22: ["red", "black", "black", "black", "black", "black"],
      };

    case "F2L":
      return {
        0: ["red", "orange", "yellow", "white", "blue", "green"],
        1: ["red", "orange", "yellow", "white", "blue", "green"],
        2: ["red", "orange", "yellow", "white", "blue", "green"],
        3: ["red", "orange", "yellow", "white", "blue", "green"],
        4: ["red", "orange", "yellow", "white", "blue", "green"],
        5: ["red", "orange", "yellow", "white", "blue", "green"],
        9: ["red", "orange", "yellow", "white", "blue", "green"],
        10: ["red", "orange", "yellow", "white", "blue", "green"],
        11: ["red", "orange", "yellow", "white", "blue", "green"],
        12: ["red", "orange", "yellow", "white", "blue", "green"],
        13: ["red", "orange", "yellow", "white", "blue", "green"],
        14: ["red", "orange", "yellow", "white", "blue", "green"],
        18: ["red", "orange", "yellow", "white", "blue", "green"],
        19: ["red", "orange", "yellow", "white", "blue", "green"],
        20: ["red", "orange", "yellow", "white", "blue", "green"],
        21: ["red", "orange", "yellow", "white", "blue", "green"],
        22: ["red", "orange", "yellow", "white", "blue", "green"],
        23: ["red", "orange", "yellow", "white", "blue", "green"],
      };

    case "F2L_LEFT":
      return {
        0: ["red", "orange", "yellow", "white", "blue", "green"],
        1: ["red", "orange", "yellow", "white", "blue", "green"],
        2: ["red", "orange", "yellow", "white", "blue", "green"],
        4: ["red", "orange", "yellow", "white", "blue", "green"],
        9: ["red", "orange", "yellow", "white", "blue", "green"],
        10: ["red", "orange", "yellow", "white", "blue", "green"],
        11: ["red", "orange", "yellow", "white", "blue", "green"],
        12: ["red", "orange", "yellow", "white", "blue", "green"],
        13: ["red", "orange", "yellow", "white", "blue", "green"],
        14: ["red", "orange", "yellow", "white", "blue", "green"],
        17: ["black", "black", "orange", "black", "blue", "black"], // top
        18: ["red", "orange", "yellow", "white", "blue", "green"],
        19: ["red", "orange", "yellow", "white", "blue", "green"],
        20: ["red", "orange", "yellow", "white", "blue", "green"],
        22: ["red", "orange", "yellow", "white", "blue", "green"],
      };

    case "F2L_RIGHT":
      return {
        0: ["red", "orange", "yellow", "white", "blue", "green"],
        1: ["red", "orange", "yellow", "white", "blue", "green"],
        2: ["red", "orange", "yellow", "white", "blue", "green"],
        4: ["red", "orange", "yellow", "white", "blue", "green"],
        9: ["red", "orange", "yellow", "white", "blue", "green"],
        10: ["red", "orange", "yellow", "white", "blue", "green"],
        11: ["red", "orange", "yellow", "white", "blue", "green"],
        12: ["red", "orange", "yellow", "white", "blue", "green"],
        13: ["red", "orange", "yellow", "white", "blue", "green"],
        14: ["red", "orange", "yellow", "white", "blue", "green"],
        17: ["black", "black", "red", "black", "blue", "black"], // top
        18: ["red", "orange", "yellow", "white", "blue", "green"],
        19: ["red", "orange", "yellow", "white", "blue", "green"],
        20: ["red", "orange", "yellow", "white", "blue", "green"],
        22: ["red", "orange", "yellow", "white", "blue", "green"],
      };
  }
};

export const DEFAULT = ["red", "orange", "yellow", "white", "blue", "green"];

export const BLACK = ["black", "black", "black", "black", "black", "black"];
