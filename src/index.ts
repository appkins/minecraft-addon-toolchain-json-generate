/// <reference types="minecraft-addon-toolchain/v1" />
import { join, relative, resolve } from 'path'
import { readFileSync, existsSync } from 'fs'
import { series, src, dest } from 'gulp'
import tap from 'gulp-tap';
import { log } from 'gulp-util';
import pump from 'pump';

export class JsonConfigPlugin implements IPlugin {
  options: any;
  intermediateDir: string;
  entryPoints: string[];
  bundleSources: string[];
  sourceTasks: ITask[];

  _builder: any;
  constructor(options) {
    this.options = options ?? {
      version: [1, 0, 0]
    };
    this.intermediateDir = "./dist/before-manifest";
    this.entryPoints = ["manifest.json"];
    this.bundleSources = ["textures/*/*.png"];

    const _this = this;
    this.sourceTasks = [
      {
        condition: this.bundleSources[0],
        preventDefault: true,
        task: () => tap((file, t: { through(d, p): NodeJS.ReadWriteStream }) => {
          _this.options && log(`Manifest: redirecting ${file.path}`);
          return t.through(dest, [join(this.intermediateDir, file.relative)]);
        })
      }
    ];
  }

  set builder(builder) {
    this._builder = builder;
  }

  addDefaultTasks(gulpTasks) {
    const manifestBehavior = this._manifestBehavior.bind(this);
    manifestBehavior.displayName = "manifest:behavior";

    const manifestResources = this._manifestResources.bind(this);
    manifestResources.displayName = "manifest:resources";

    gulpTasks.buildSource = series(
      gulpTasks.buildSource,
      manifestBehavior,
      manifestResources
    );
  }

  updateManifest = (pack, packDone) => {
    const packDir = join(this.intermediateDir, pack.relativePath);
    const destination = join(this._builder.bundleDir, pack.relativePath);
    return pump(
      [
        src(this.entryPoints, { cwd: packDir, read: false }),
        tap(file => {
          this.options && log(`\tbundling ${relative(packDir, file.path)}`);
          file.base = resolve(packDir);

          if (existsSync(join(packDir, "manifest.json"))) {
            let manifestFile = readFileSync(join(packDir, "manifest.json"))

            let manifest = JSON.parse(manifestFile.toString())

            if (manifest) {

              manifest.header.version = this.options.version

              if (Array.isArray(manifest.modules)) {
                manifest.modules = manifest.modules.map(element => { element.version = this.options.version; return element; })
              }

              if (Array.isArray(manifest.dependencies)) {
                manifest.dependencies = manifest.dependencies.map(element => { element.version = this.options.version; return element; })
              }

              file.contents = Buffer.from(JSON.stringify(manifest, null, '\t'))
            }
          }
        }),
        dest(destination)
      ],
      packDone
    );
  }

  _manifestBehavior(done) {
    return this._builder.foreachPack(
      "manifest:behavior",
      "behavior",
      this.updateManifest,
      done
    );
  }

  _manifestResources(done) {
    return this._builder.foreachPack(
      "manifest:resources",
      "resources",
      this.updateManifest,
      done
    );
  }
}

export function createPlugin(version) {
  return new JsonConfigPlugin({
    version: version
  });
}

export default createPlugin;

//module.exports = JsonConfigPlugin

