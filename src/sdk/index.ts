import axios, { AxiosRequestConfig } from "axios";
import { init, interceptors } from "../api-lang/__api-lang-root__";
import { IsAny } from "@juln/type-fest";
import { sdkFileContent, ApiLangModule } from "@api-lang/core";

type InitArgs = Parameters<typeof init>;

type ApiConfig<A extends ApiLangModule> = Omit<
  AxiosRequestConfig,
  "params" | "data"
> &
  (A["ApiData"] extends never
    ? {
        /** 该接口不需要传data */
        data?: never;
      }
    : { data: A["ApiData"] }) &
  (A["ApiParams"] extends never
    ? {
        /** 该接口不需要传params */
        params?: never;
      }
    : { params: A["ApiParams"] });

type GroupItem<A extends ApiLangModule> = {
  [k in A["apiInfo"]["funcName"]]: (config: ApiConfig<A>) => A["ApiResult"];
};

type DataOrNever<T> = IsAny<T> extends true ? never : T;
type DataOrVoid<T> = IsAny<T> extends true ? void : T;

export type ApiKit = {
  [k in typeof import("../api-lang/user/__group__")["GROUP_TS_NAME"]]: GroupItem<
    typeof import("../api-lang/user/myInfo") & {
      // @ts-ignore
      ApiParams: DataOrNever<import("../api-lang/user/myInfo").ApiParams>;
      // @ts-ignore
      ApiData: DataOrNever<import("../api-lang/user/myInfo").ApiData>;
      // @ts-ignore
      ApiResult: DataOrVoid<import("../api-lang/user/myInfo").ApiResult>;
    }
  >;
} & {
  [k in typeof import("../api-lang/message/__group__")["GROUP_TS_NAME"]]: GroupItem<
    typeof import("../api-lang/message/sendMsg") & {
      // @ts-ignore
      ApiParams: DataOrNever<import("../api-lang/message/sendMsg").ApiParams>;
      // @ts-ignore
      ApiData: DataOrNever<import("../api-lang/message/sendMsg").ApiData>;
      // @ts-ignore
      ApiResult: DataOrVoid<import("../api-lang/message/sendMsg").ApiResult>;
    }
  > &
    GroupItem<
      typeof import("../api-lang/message/at") & {
        // @ts-ignore
        ApiParams: DataOrNever<import("../api-lang/message/at").ApiParams>;
        // @ts-ignore
        ApiData: DataOrNever<import("../api-lang/message/at").ApiData>;
        // @ts-ignore
        ApiResult: DataOrVoid<import("../api-lang/message/at").ApiResult>;
      }
    >;
};

type SDK = {
  init: (...initArgs: InitArgs) => Promise<{
    apiKit: ApiKit;
  }>;
};

const createSdk = (): SDK => {
  return {
    init: async (credential) => {
      const apiKit: Record<string, any> = {};

      const ctx = init(credential);
      const request = interceptors(axios.create(), ctx);

      const apiLangModules = await Promise.all([
        {
          module: await import("../api-lang/user/myInfo"),
          group: await import("../api-lang/user/__group__"),
        },
        {
          module: await import("../api-lang/message/at"),
          group: await import("../api-lang/message/__group__"),
        },
        {
          module: await import("../api-lang/message/sendMsg"),
          group: await import("../api-lang/message/__group__"),
        },
      ]);

      apiLangModules.forEach(
        ({ module, group: { GROUP_TS_NAME: groupName } }) => {
          if (!apiKit[groupName]) {
            apiKit[groupName] = {};
          }

          apiKit[groupName][module.api.method] = request;
        }
      );

      return {
        apiKit: apiKit as ApiKit,
      };
    },
  };
};

const sdk = createSdk();

export default sdk;

// user

(async () => {
  const { apiKit } = await sdk.init({
    sessdata: "",
    bili_jct: "",
    dedeuserid: "",
  });
  apiKit.user.myInfo({
    params: {
      mid: 0,
    },
  });
  apiKit.message;
})();
