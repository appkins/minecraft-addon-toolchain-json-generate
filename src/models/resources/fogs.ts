export interface FogDistanceParams {
  fog_start:            number;
  fog_end:              number;
  fog_color:            string;
  render_distance_type: string;
}

export interface FogDistance {
  air?:     FogDistanceParams;
  weather?: FogDistanceParams;
  water?:   FogDistanceParams;
}

export interface MinecraftFogSettings {
  description: { identifier: string; };
  distance:    FogDistance;
}

export interface FogConfig {
  format_version:           string;
  "minecraft:fog_settings": MinecraftFogSettings;
}
