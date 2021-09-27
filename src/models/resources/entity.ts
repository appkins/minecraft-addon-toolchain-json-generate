export interface Geometry { GeometryDefault: string; }

export interface Materials { MaterialDefault: string; }

export interface IEntityScripts {
  animate: string[];
}

export interface IEntityDescription {
  identifier?:         string;
  materials?:          { MaterialDefault: string; };
  geometry?:           { GeometryDefault: string; };
  textures?:           Map<string, string>;
  animations?:         Map<string, string>;
  particle_effects?:   Map<string, string>;
  spawn_egg?:          Map<string, string>;
  scripts?:            IEntityScripts;
  render_controllers?: string[];
}

export interface EntityConfig {
  format_version:            number[];
  "minecraft:client_entity": { description: IEntityDescription; };
}
