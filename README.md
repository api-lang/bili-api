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

### 心法

- 心法的分享，提前攒热度，让更多人参与开源
- 为什么选择 typescript

### 完善用法和边界

- ApiRequestHeader 类型声明与校验
- verify 逻辑抽离
- 数据互通至 单独 request 的 Ctx
- 解决目前只支持固定目录结构的问题
- 除了 b 站，多接入几个平台，看看哪些地方没考虑到，尽量做到更通用

### 辅助功能

- api-lang to readme (提供转化为 readme 的功能，主要是为了得到社区的帮助)
- api-lang 的 check
- yapi to api-lang
- ...
