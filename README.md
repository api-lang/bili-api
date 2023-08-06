# @api-lang/bili-api

bili-api

## install

`npm i @api-lang/bili-api`

## use

```typescript
import sdk from "@api-lang/bili-api";
import type { ApiKit } from "@api-lang/bili-api"; // contains typescript types for all APIs

(async () => {
  const { apiKit } = await sdk.init();
  // 完全支持ts类型, 可以不需要看文档: ide会提示你有哪些api, 且api需要填哪些参数, 返回的数据是什么
  const res = await apiKit.video.detail({
    params: {
      bvid: "BV1uv411q7Mv",
    },
  });
  console.log("res", res);

  // 用到需要身份验证的接口时
  const { apiKit: verifyApiKit } = await sdk.init({
    sessdata: string;
    bili_jct: string;
    dedeuserid: string;
  });

  verifyApiKit.user.myInfo({
    mid: 'xxx',
  });
})();
```

## TODO-LIST

- ApiRequestHeader 类型声明与校验
- verify 逻辑抽离
- 数据互通至 单独 request 的 Ctx
- api-lang 的 check
