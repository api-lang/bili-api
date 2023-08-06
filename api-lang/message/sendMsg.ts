export const doc = {
  name: "发送消息（私聊）",
  summary: "发送消息（私聊），未关注的用户只能发一条消息",
  groupOrder: 1,
};

export const apiInfo = {
  funcName: "sendMsg",
  comment: "发送消息（私聊），未关注的用户只能发一条消息",
} as const;

export const api = {
  url: "https://api.vc.bilibili.com/web_im/v1/web_im/send_msg",
  method: "POST",
  verify: true,
  useFormUrlEncoded: true,
};

export type ApiData = {
  "msg[sender_uid]": number;
  "msg[receiver_id]": number;
  "msg[receiver_type]": 1 | (number & {});
  "msg[msg_type]": 1 | (number & {});
  "msg[msg_status]": 0 | (number & {});
  /** 只知道是 JSON.stringify({ content: "you content..." }) */
  "msg[content]": string;
  /** 以秒为单位的时间戳 */
  "msg[timestamp]": number;
  "msg[new_face_version]": 0 | (number & {});
  "msg[dev_id]": "11F95AB4-3246-4C81-8E10-D7924681F3DA" | (string & {});
  from_firework: 0 | (number & {});
  build: 0 | (number & {});
  mobi_app: "web" | (string & {});
};

export type ApiResult = void;
