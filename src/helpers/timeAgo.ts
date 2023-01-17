import moment from "moment";

export const timeAgo = (date: any) => {
  return moment(date).fromNow();
};
