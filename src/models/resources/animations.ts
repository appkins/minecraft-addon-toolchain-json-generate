export interface IRotationValue {
  pre?:       number[];
  post?:      number[];
  lerp_mode?: string;
}

export interface IAnimationRotation {
  rotation: { [key: string]: IRotationValue | number[] };
}

export interface IAnimationData {
  loop?:             boolean;
  animation_length?: number;
  bones?:            Map<string, IAnimationRotation>;
}

export interface AnimationConfig {
  format_version: string;
  animations:     Map<string, IAnimationData>;
}
