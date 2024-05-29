import { useEffect } from "react";
import { Layout } from "../../components/layout/Layout/container";
import { TimerStateProvider } from "../../providers/TimerStateProvider";
import { IndexPagePresenter } from "./presenter";
import Cookies from "js-cookie";

export const IndexPage = () => {
  // Cookieを見て、timeがnullの履歴を削除. 12個以上ある場合は先頭から削除
  useEffect(() => {
    const time_record_txt = Cookies.get("time_record");
    if (time_record_txt) {
      const time_record_list = time_record_txt.split(",");
      const no_null_record_list = time_record_list.filter((txt) => {
        return !txt.match(/(scramble:.*)-time:(null|00:00:00)/);
      });
      if (no_null_record_list.length > 12) {
        Cookies.set(
          "time_record",
          no_null_record_list.slice(no_null_record_list.length - 12).join()
        );
      } else {
        Cookies.set("time_record", no_null_record_list.join());
      }
    }
  }, []);

  return (
    <Layout>
      <TimerStateProvider>
        <IndexPagePresenter />
      </TimerStateProvider>
    </Layout>
  );
};
