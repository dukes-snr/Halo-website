declare module "@/components/brand/cloudee-avatar.js" {
  export type CloudeeAvatar = {
    element: SVGElement;
    readonly animation: string;
    readonly playing: boolean;
    play(animationName?: string): CloudeeAvatar;
    pause(): CloudeeAvatar;
    stop(): CloudeeAvatar;
    destroy(): void;
  };

  export const availableAnimations: readonly string[];
  export function createAvatar(
    target: HTMLElement | string,
    options?: {
      animation?: string;
      size?: number | string;
      autoplay?: boolean;
      loop?: boolean;
      onAnimationEnd?: (animation: string) => void;
    },
  ): CloudeeAvatar;
  export default createAvatar;
}
