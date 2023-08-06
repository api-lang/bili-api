export const doc = {
  name: "获取自己的信息",
  summary: "获取自己的信息",
};

export const apiInfo = {
  funcName: "myInfo",
  comment: "获取自己的信息",
} as const;

export const api = {
  url: "https://api.bilibili.com/x/space/myinfo",
  method: "GET",
  verify: false,
};

export type ApiParams = {
  mid: number;
};

export type ApiResult = {
  mid: number;
} & {
  [k in string]?: unknown;
};
