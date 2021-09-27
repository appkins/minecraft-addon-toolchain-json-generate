export interface ITexture {
  resource_pack_name: string;
  texture_name:       string;
  texture_data:       Map<string, { textures: string; }>;
}

export interface ItemTextureConfig extends ITexture {
}

export interface TerrainTextureConfig extends ITexture {
  padding: number;
  num_mip_levels: number;
}

export type TexturesListConfig = Array<string>;
