import moment from "moment";

//Calculating time ago
export const timeAgo = (date: any) => {
  return moment(new Date(date)).fromNow();
};

//Capitalise first letter
export const cfl: (str: string) => string = (str) => {
  if (!str) return "";
  return str[0].toUpperCase() + str.substring(1);
};

export const enum IsLoading {
  loading,
  failed,
  done,
  none,
  empty,
}
