import crypto from "crypto";
import type { AxiosInstance, AxiosProxyConfig } from "axios";

export const VERSION = "202301";

export type BasicApi<T = unknown> = {
  /** 0为成功 */
  code: 0 | (number & {});
  data: T;
  message: string;
  ttl: 0 | 1;
};

interface Ctx {
  credential?: {
    sessdata: string;
    bili_jct: string;
    dedeuserid: string;
  };
  proxy?: AxiosProxyConfig;
}

export const init = (credential?: Ctx["credential"]): Ctx => {
  return { credential };
};

export const interceptors = (axios: AxiosInstance, ctx: Ctx) => {
  axios.interceptors.request.use((config) => {
    const { headers, jar: oldCookieJar, proxy } = config;
    const cookieJar = oldCookieJar!.cloneSync();
    const { credential } = ctx;

    // headers
    if (!headers.has("user-agent")) {
      headers.set("user-agent", "Mozilla/5.0");
    }
    if (!headers.has("referer")) {
      headers.set("referer", "https://www.bilibili.com/");
    }

    // responseType
    if (!config.responseType) config.responseType = "json";

    // credential
    if (credential) {
      cookieJar.setCookieSync(
        `SESSDATA=${credential.sessdata}; Domain=.bilibili.com`,
        "https://www.bilibili.com"
      );
      cookieJar.setCookieSync(
        `bili_jct=${credential.bili_jct}; Domain=.bilibili.com`,
        "https://www.bilibili.com"
      );
      cookieJar.setCookieSync(
        `DedeUserID=${credential.dedeuserid}; Domain=.bilibili.com`,
        "https://www.bilibili.com"
      );
    }
    cookieJar.setCookieSync(
      `buvid3=${crypto.randomUUID()}; Domain=.bilibili.com`,
      "https://www.bilibili.com"
    );
    config.jar = cookieJar;

    // csrf
    if (credential) {
      if (headers["Content-Type"] === "application/x-www-form-urlencoded") {
        if (config.data === undefined) {
          config.data = "";
        }
        if (typeof config.data === "string") {
          config.data += `$csrf=${credential.bili_jct}&csrf_token=${credential.bili_jct}`;
        }
      } else {
        if (config.data === undefined) {
          config.data = {};
        }
        if (
          typeof config.data === "object" &&
          config.data["csrf"] === undefined &&
          config.data["csrf_token"] === undefined
        ) {
          config.data["csrf"] = credential.bili_jct;
          config.data["csrf_token"] = credential.bili_jct;
        }
      }
    }

    // proxy
    if (!proxy && ctx.proxy) {
      config.proxy = ctx.proxy;
    }

    return config;
  });
  axios.interceptors.response.use((response) => {
    return response.data;
  });
  return axios;
};
