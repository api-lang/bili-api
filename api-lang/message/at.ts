export const doc = {
  name: "获取`@我的`列表",
  summary: "获取`@我的`列表（分页接口）",
};

export const apiInfo = {
  funcName: "at",
  comment: "获取自己的信息",
} as const;

export const api = {
  url: "https://api.bilibili.com/x/msgfeed/at",
  method: "GET",
  verify: true,
};

export type ApiRequestHeader = never;

export type ApiParams = {
  build: 0 | (number & {});
  mobi_app: "web" | (string & {});
};

export type ApiResult = {
  cursor: {
    is_end: boolean;
    id: number;
    time: number;
  };
  items: AtItem[];
};

interface User {
  /** 用户id */
  mid: number;
  fans: number;
  nickname: string;
  avatar: string;
  mid_link: string;
  follow: boolean;
}

interface AtItem {
  id: number;
  user: User;
  item: {
    type: "reply" | "dynamic" | (string & {});
    business: "评论" | "动态" | (string & {});
    /** 1 评论; 11 动态 */
    business_id: 1 | 11 | (number & {});
    title: string;
    image: string;
    /** 原视频地址 */
    uri: string;
    subject_id: number;
    root_id: number;
    target_id: number;
    source_id: number;
    /** 回复内容 */
    source_content: string;
    native_uri: string;
    at_details: {
      mid: number;
      fans: number;
      nickname: string;
      avatar: string;
      mid_link: string;
      follow: boolean;
    }[];
    topic_details: unknown[];
    hide_reply_button: boolean;
  };
  at_time: number;
}
