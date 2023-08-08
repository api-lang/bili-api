# @api-lang/bili-api

bilibili-api 集合 的 sdk

## 如何参与开源

本 sdk 基于 `api-lang` 框架编写, `api-lang` 是能更高效、更便捷的维护各大 api-sdk 的框架

关于 `api-lang` 文档的编写请看: [doc](https://github.com/api-lang/api-lang/blob/master/API_LANG_DOC.md)

如果你是小白, 关于 `api-lang` 框架请看: [doc](https://github.com/api-lang/api-lang/blob/master/API_LANG_DOC.md)

本地开发: `npm run dev` or `yarn dev`; 修改 api-lang 目录后, 会实时打包到 dist 和 es 目录下

## install

`npm i @api-lang/bili-api -S` or `yarn add @api-lang/bili-api -S`

## use

```typescript
// typescript+esm导入
import sdk from "@api-lang/bili-api";
import type { ApiKit } from "@api-lang/bili-api"; // contains typescript types for all APIs
// commonjs导入
// const { default: sdk } = require("@api-lang/bili-api");

console.log('apiKit version: ', sdk.VERSION);

(async () => {
  const { apiKit } = await sdk.init({});
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
