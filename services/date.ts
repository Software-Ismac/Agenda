import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";

dayjs.extend(localizedFormat);
export const date = (date: Date) => {
  return dayjs(date).format("LL");
};
