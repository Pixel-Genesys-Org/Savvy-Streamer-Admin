import { Hospital, IdCard, ShieldQuestionMark, UserCog } from "lucide-react";

export const URL_REGEX = /^https:\/\/(?:www\.)?[a-zA-Z0-9\-._~%]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/

const USER_TABS = [
  { title: "Basic Information", icon: IdCard },
  { title: "Access Control", icon: ShieldQuestionMark },
  { title: "General Access", icon: Hospital },
  { title: "Activity", icon: UserCog },
];

export { USER_TABS };

