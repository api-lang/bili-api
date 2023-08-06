export const doc = {
  name: "获取视频详情",
  summary: "获取视频详情",
};

export const apiInfo = {
  funcName: "detail",
  comment: "获取视频详情",
} as const;

export const api = {
  url: "https://api.bilibili.com/x/web-interface/view",
  method: "GET",
  verify: false,
};

export type ApiParams =
  | {
      bvid: string;
    }
  | {
      aid: string;
    };

export type ApiResult = unknown;
