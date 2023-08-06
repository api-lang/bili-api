import crypto from "crypto";
import type { CookieJar } from "tough-cookie";
import type { AxiosInstance } from "axios";

export const VERSION = "1.0.0";

export type BasicApi<T = unknown> = {
  /** 0为成功 */
  code: 0 | (number & {});
  data: T;
  message: string;
  ttl: 0 | 1;
};

declare module "axios" {
  interface AxiosRequestConfig {
    jar?: CookieJar;
  }
}

interface Ctx {
  credential?: {
    sessdata: string;
    bili_jct: string;
    dedeuserid: string;
  };
}

export const init = (credential?: Ctx["credential"]): Ctx => {
  return { credential };
};

export const interceptors = (axios: AxiosInstance, ctx: Ctx) => {
  axios.interceptors.request.use((config) => {
    const { headers, jar: oldCookieJar } = config;
    const cookieJar = oldCookieJar!.cloneSync();
    const { credential } = ctx;

    if (!headers.has("user-agent")) {
      headers.set("user-agent", "Mozilla/5.0");
    }
    if (!headers.has("referer")) {
      headers.set("referer", "https://www.bilibili.com/");
    }

    if (!config.responseType) config.responseType = "json";

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

    return config;
  });
  return axios;
};
