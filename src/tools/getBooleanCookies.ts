import Cookies from "js-cookie";

/** booleanのCookieの値を取得。ない場合はfalse */
export const getBooleanCookies = (key: string) => {
  const value = Cookies.get(key);

  if (!value) {
    return false;
  }

  if (`${value}` !== "true") {
    return false;
  }
  return true;
};
