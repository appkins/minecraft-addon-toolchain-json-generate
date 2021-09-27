export interface Isotropic {
  up?:   boolean;
  down?: boolean;
}

export interface Textures {
  up?:   string;
  down?: string;
  side?: string;
  north?: string;
  south?: string;
  east?: string;
  west?: string;
}

export interface BlockData {
  isotropic?:        Isotropic;
  textures?:         Textures | string;
  carried_textures?: string;
  brightness_gamma?: number;
  sound?:            string;
}

export interface BlocksConfig {
  format_version: Array<number>;
  [key: string]: BlockData | Array<number>;
}
