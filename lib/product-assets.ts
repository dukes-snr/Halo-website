/** Live Halo implementation captures from /public/scene. */
export const productAssets = {
  nook: {
    src: "/scene/implementation-nook.png",
    width: 580,
    height: 152,
  },
  mediaExpanded: {
    src: "/scene/implementation-media-expanded.png",
    width: 420,
    height: 190,
  },
  apps: {
    src: "/scene/implementation-apps.png",
    width: 580,
    height: 228,
  },
  tray: {
    src: "/scene/implementation-tray-populated.png",
    width: 580,
    height: 228,
  },
  clipboard: {
    src: "/scene/implementation-clipboard.png",
    width: 580,
    height: 228,
  },
  call: {
    src: "/scene/implementation-call.png",
    width: 474,
    height: 112,
  },
  callConnected: {
    src: "/scene/implementation-call-connected.png",
    width: 424,
    height: 80,
  },
  timer: {
    src: "/scene/implementation-timer.png",
    width: 380,
    height: 80,
  },
  notificationList: {
    src: "/scene/implementation-notification-list.png",
    width: 540,
    height: 258,
  },
  notificationReactions: {
    src: "/scene/implementation-notification-reactions.png",
    width: 540,
    height: 240,
  },
  notificationReply: {
    src: "/scene/implementation-notification-reply.png",
    width: 540,
    height: 208,
  },
} as const;

export type ProductAsset = (typeof productAssets)[keyof typeof productAssets];
