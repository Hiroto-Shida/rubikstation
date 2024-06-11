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
        5: ["black", "red", "black", "black", "white", "black"],
      };

    case "CROSS_BOTTOM_SIDE_EX1":
      return {
        16: ["black", "black", "white", "black", "black", "black"], // top
        17: ["black", "black", "blue", "black", "white", "black"],
      };

    case "CROSS_BOTTOM_SIDE_EX2":
      return {
        16: ["black", "black", "white", "black", "black", "black"], // top
        11: ["black", "black", "black", "red", "white", "black"],
      };

    case "CROSS_BOTTOM_BOTTOM":
      return {
        16: ["black", "black", "white", "black", "black", "black"], // top
        11: ["black", "black", "black", "white", "blue", "black"],
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
        8: ["black", "orange", "blue", "black", "white", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        19: ["red", "black", "black", "white", "black", "black"],
        22: ["red", "black", "black", "black", "black", "black"],
        // 26: ["white", "black", "red", "black", "blue", "black"],
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
        0: ["black", "orange", "black", "white", "black", "green"],
        1: ["black", "orange", "black", "white", "black", "black"],
        2: ["black", "orange", "black", "white", "blue", "black"],
        3: ["black", "orange", "black", "black", "black", "green"],
        4: ["black", "orange", "black", "black", "black", "black"],
        5: ["black", "orange", "black", "black", "blue", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        18: ["red", "black", "black", "white", "black", "green"],
        19: ["red", "black", "black", "white", "black", "black"],
        20: ["red", "black", "black", "white", "blue", "black"],
        21: ["red", "black", "black", "black", "black", "green"],
        22: ["red", "black", "black", "black", "black", "black"],
        23: ["red", "black", "black", "black", "blue", "black"],
      };

    case "F2L_READY_EX1":
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
        25: ["blue", "black", "red", "black", "black", "black"],
      };

    case "F2L_READY_EX2":
      return {
        0: ["black", "green", "black", "white", "black", "red"],
        1: ["black", "green", "black", "white", "black", "black"],
        2: ["black", "green", "black", "white", "orange", "black"],
        4: ["black", "green", "black", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "red"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "orange", "black"],
        12: ["black", "black", "black", "black", "black", "red"],
        14: ["black", "black", "black", "black", "orange", "black"],
        15: ["black", "black", "green", "black", "black", "orange"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        18: ["blue", "black", "black", "white", "black", "red"],
        19: ["blue", "black", "black", "white", "black", "black"],
        20: ["blue", "black", "black", "white", "orange", "black"],
        22: ["blue", "black", "black", "black", "black", "black"],
      };

    case "F2L_LEFT":
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
        17: ["black", "black", "red", "black", "blue", "black"], // top
        18: ["red", "black", "black", "white", "black", "green"],
        19: ["red", "black", "black", "white", "black", "black"],
        20: ["red", "black", "black", "white", "blue", "black"],
        22: ["red", "black", "black", "black", "black", "black"],
      };

    case "F2L_RIGHT":
      return {
        0: ["black", "green", "black", "white", "black", "red"],
        1: ["black", "green", "black", "white", "black", "black"],
        2: ["black", "green", "black", "white", "orange", "black"],
        4: ["black", "green", "black", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "red"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "orange", "black"],
        12: ["black", "black", "black", "black", "black", "red"],
        14: ["black", "black", "black", "black", "orange", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        17: ["black", "black", "green", "black", "orange", "black"],
        18: ["blue", "black", "black", "white", "black", "red"],
        19: ["blue", "black", "black", "white", "black", "black"],
        20: ["blue", "black", "black", "white", "orange", "black"],
        22: ["blue", "black", "black", "black", "black", "black"],
      };

    case "TOP_CROSS":
      return {
        0: ["black", "orange", "black", "white", "black", "green"],
        1: ["black", "orange", "black", "white", "black", "black"],
        2: ["black", "orange", "black", "white", "blue", "black"],
        3: ["black", "orange", "black", "black", "black", "green"],
        4: ["black", "orange", "black", "black", "black", "black"],
        5: ["black", "orange", "black", "black", "blue", "black"],
        7: ["black", "black", "yellow", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        15: ["black", "black", "yellow", "black", "black", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        17: ["black", "black", "yellow", "black", "black", "black"],
        18: ["red", "black", "black", "white", "black", "green"],
        19: ["red", "black", "black", "white", "black", "black"],
        20: ["red", "black", "black", "white", "blue", "black"],
        21: ["red", "black", "black", "black", "black", "green"],
        22: ["red", "black", "black", "black", "black", "black"],
        23: ["red", "black", "black", "black", "blue", "black"],
        25: ["black", "black", "yellow", "black", "black", "black"],
      };

    case "TOP_DOT":
      return {
        0: ["black", "orange", "black", "white", "black", "green"],
        1: ["black", "orange", "black", "white", "black", "black"],
        2: ["black", "orange", "black", "white", "blue", "black"],
        3: ["black", "orange", "black", "black", "black", "green"],
        4: ["black", "orange", "black", "black", "black", "black"],
        5: ["black", "orange", "black", "black", "blue", "black"],
        7: ["black", "black", "black", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        15: ["black", "black", "black", "black", "black", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        17: ["black", "black", "black", "black", "yellow", "black"],
        18: ["red", "black", "black", "white", "black", "green"],
        19: ["red", "black", "black", "white", "black", "black"],
        20: ["red", "black", "black", "white", "blue", "black"],
        21: ["red", "black", "black", "black", "black", "green"],
        22: ["red", "black", "black", "black", "black", "black"],
        23: ["red", "black", "black", "black", "blue", "black"],
        25: ["yellow", "black", "black", "black", "black", "black"],
      };

    case "TOP_LINE":
      return {
        0: ["black", "orange", "black", "white", "black", "green"],
        1: ["black", "orange", "black", "white", "black", "black"],
        2: ["black", "orange", "black", "white", "blue", "black"],
        3: ["black", "orange", "black", "black", "black", "green"],
        4: ["black", "orange", "black", "black", "black", "black"],
        5: ["black", "orange", "black", "black", "blue", "black"],
        7: ["black", "black", "yellow", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        15: ["black", "black", "black", "black", "black", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        17: ["black", "black", "black", "black", "yellow", "black"],
        18: ["red", "black", "black", "white", "black", "green"],
        19: ["red", "black", "black", "white", "black", "black"],
        20: ["red", "black", "black", "white", "blue", "black"],
        21: ["red", "black", "black", "black", "black", "green"],
        22: ["red", "black", "black", "black", "black", "black"],
        23: ["red", "black", "black", "black", "blue", "black"],
        25: ["black", "black", "yellow", "black", "black", "black"],
      };

    case "TOP_L":
      return {
        0: ["black", "orange", "black", "white", "black", "green"],
        1: ["black", "orange", "black", "white", "black", "black"],
        2: ["black", "orange", "black", "white", "blue", "black"],
        3: ["black", "orange", "black", "black", "black", "green"],
        4: ["black", "orange", "black", "black", "black", "black"],
        5: ["black", "orange", "black", "black", "blue", "black"],
        7: ["black", "black", "yellow", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        15: ["black", "black", "yellow", "black", "black", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        17: ["black", "black", "black", "black", "yellow", "black"],
        18: ["red", "black", "black", "white", "black", "green"],
        19: ["red", "black", "black", "white", "black", "black"],
        20: ["red", "black", "black", "white", "blue", "black"],
        21: ["red", "black", "black", "black", "black", "green"],
        22: ["red", "black", "black", "black", "black", "black"],
        23: ["red", "black", "black", "black", "blue", "black"],
        25: ["yellow", "black", "black", "black", "black", "black"],
      };

    case "TOP_ALL":
      return {
        0: ["black", "orange", "black", "white", "black", "green"],
        1: ["black", "orange", "black", "white", "black", "black"],
        2: ["black", "orange", "black", "white", "blue", "black"],
        3: ["black", "orange", "black", "black", "black", "green"],
        4: ["black", "orange", "black", "black", "black", "black"],
        5: ["black", "orange", "black", "black", "blue", "black"],
        6: ["black", "black", "yellow", "black", "black", "black"],
        7: ["black", "black", "yellow", "black", "black", "black"],
        8: ["black", "black", "yellow", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        15: ["black", "black", "yellow", "black", "black", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        17: ["black", "black", "yellow", "black", "black", "black"],
        18: ["red", "black", "black", "white", "black", "green"],
        19: ["red", "black", "black", "white", "black", "black"],
        20: ["red", "black", "black", "white", "blue", "black"],
        21: ["red", "black", "black", "black", "black", "green"],
        22: ["red", "black", "black", "black", "black", "black"],
        23: ["red", "black", "black", "black", "blue", "black"],
        24: ["black", "black", "yellow", "black", "black", "black"],
        25: ["black", "black", "yellow", "black", "black", "black"],
        26: ["black", "black", "yellow", "black", "black", "black"],
      };

    case "TOP_CROSS_02":
      return {
        0: ["black", "orange", "black", "white", "black", "green"],
        1: ["black", "orange", "black", "white", "black", "black"],
        2: ["black", "orange", "black", "white", "blue", "black"],
        3: ["black", "orange", "black", "black", "black", "green"],
        4: ["black", "orange", "black", "black", "black", "black"],
        5: ["black", "orange", "black", "black", "blue", "black"],
        6: ["black", "black", "black", "black", "black", "yellow"],
        7: ["black", "black", "yellow", "black", "black", "black"],
        8: ["black", "black", "black", "black", "yellow", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        15: ["black", "black", "yellow", "black", "black", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        17: ["black", "black", "yellow", "black", "black", "black"],
        18: ["red", "black", "black", "white", "black", "green"],
        19: ["red", "black", "black", "white", "black", "black"],
        20: ["red", "black", "black", "white", "blue", "black"],
        21: ["red", "black", "black", "black", "black", "green"],
        22: ["red", "black", "black", "black", "black", "black"],
        23: ["red", "black", "black", "black", "blue", "black"],
        24: ["black", "black", "yellow", "black", "black", "black"],
        25: ["black", "black", "yellow", "black", "black", "black"],
        26: ["black", "black", "yellow", "black", "black", "black"],
      };

    case "TOP_CROSS_1":
      return {
        0: ["black", "orange", "black", "white", "black", "green"],
        1: ["black", "orange", "black", "white", "black", "black"],
        2: ["black", "orange", "black", "white", "blue", "black"],
        3: ["black", "orange", "black", "black", "black", "green"],
        4: ["black", "orange", "black", "black", "black", "black"],
        5: ["black", "orange", "black", "black", "blue", "black"],
        6: ["black", "black", "black", "black", "black", "yellow"],
        7: ["black", "black", "yellow", "black", "black", "black"],
        8: ["black", "black", "yellow", "black", "black", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        15: ["black", "black", "yellow", "black", "black", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        17: ["black", "black", "yellow", "black", "black", "black"],
        18: ["red", "black", "black", "white", "black", "green"],
        19: ["red", "black", "black", "white", "black", "black"],
        20: ["red", "black", "black", "white", "blue", "black"],
        21: ["red", "black", "black", "black", "black", "green"],
        22: ["red", "black", "black", "black", "black", "black"],
        23: ["red", "black", "black", "black", "blue", "black"],
        24: ["yellow", "black", "black", "black", "black", "black"],
        25: ["black", "black", "yellow", "black", "black", "black"],
        26: ["black", "black", "black", "black", "yellow", "black"],
      };

    case "PLL_CORNER":
      return {
        0: ["black", "orange", "black", "white", "black", "green"],
        1: ["black", "orange", "black", "white", "black", "black"],
        2: ["black", "orange", "black", "white", "blue", "black"],
        3: ["black", "orange", "black", "black", "black", "green"],
        4: ["black", "orange", "black", "black", "black", "black"],
        5: ["black", "orange", "black", "black", "blue", "black"],
        6: ["black", "orange", "yellow", "black", "black", "green"],
        7: ["black", "black", "yellow", "black", "black", "black"],
        8: ["black", "orange", "yellow", "black", "blue", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        15: ["black", "black", "yellow", "black", "black", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        17: ["black", "black", "yellow", "black", "black", "black"],
        18: ["red", "black", "black", "white", "black", "green"],
        19: ["red", "black", "black", "white", "black", "black"],
        20: ["red", "black", "black", "white", "blue", "black"],
        21: ["red", "black", "black", "black", "black", "green"],
        22: ["red", "black", "black", "black", "black", "black"],
        23: ["red", "black", "black", "black", "blue", "black"],
        24: ["red", "black", "yellow", "black", "black", "green"],
        25: ["black", "black", "yellow", "black", "black", "black"],
        26: ["red", "black", "yellow", "black", "blue", "black"],
      };

    case "PLL_CORNER_0_PAIRS":
      return {
        0: ["black", "orange", "black", "white", "black", "green"],
        1: ["black", "orange", "black", "white", "black", "black"],
        2: ["black", "orange", "black", "white", "blue", "black"],
        3: ["black", "orange", "black", "black", "black", "green"],
        4: ["black", "orange", "black", "black", "black", "black"],
        5: ["black", "orange", "black", "black", "blue", "black"],
        6: ["black", "green", "yellow", "black", "black", "red"],
        7: ["black", "black", "yellow", "black", "black", "black"],
        8: ["black", "blue", "yellow", "black", "red", "black"],
        9: ["black", "black", "black", "white", "black", "green"],
        10: ["black", "black", "black", "white", "black", "black"],
        11: ["black", "black", "black", "white", "blue", "black"],
        12: ["black", "black", "black", "black", "black", "green"],
        14: ["black", "black", "black", "black", "blue", "black"],
        15: ["black", "black", "yellow", "black", "black", "black"],
        16: ["black", "black", "yellow", "black", "black", "black"], // top
        17: ["black", "black", "yellow", "black", "black", "black"],
        18: ["red", "black", "black", "white", "black", "green"],
        19: ["red", "black", "black", "white", "black", "black"],
        20: ["red", "black", "black", "white", "blue", "black"],
        21: ["red", "black", "black", "black", "black", "green"],
        22: ["red", "black", "black", "black", "black", "black"],
        23: ["red", "black", "black", "black", "blue", "black"],
        24: ["green", "black", "yellow", "black", "black", "orange"],
        25: ["black", "black", "yellow", "black", "black", "black"],
        26: ["blue", "black", "yellow", "black", "orange", "black"],
      };
  }
};

export const DEFAULT = ["red", "orange", "yellow", "white", "blue", "green"];

export const BLACK = ["black", "black", "black", "black", "black", "black"];
