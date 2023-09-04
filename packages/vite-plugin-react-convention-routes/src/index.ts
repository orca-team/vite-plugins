// 编写一个 vite 插件
import type { Plugin } from 'vite';
import { resolve } from 'path';
import chokidar from 'chokidar';
import { createLogger } from 'vite';
import type { CreateRoutesOptions } from './createRoutes';
import { createRoutes } from './createRoutes';


const moduleId = 'virtual:convention-routes';
const log = createLogger();



export type ReactConventionRoutesOptions = CreateRoutesOptions & {

  /** 需要扫描的页面根目录 */
  pageRoot?: string;

};


export default function reactConventionRoutes(options: ReactConventionRoutesOptions = {}): Plugin {
  const defaultPageRoot = resolve(process.cwd(), 'src/pages');
  const { pageRoot = defaultPageRoot, ...otherProps } = options;
  return {
    name: '@orca-fe/vite-plugin-react-convention-routes',
    enforce: 'pre',
    resolveId(id) {
      if (id === moduleId) {
        return `\0${moduleId}`;
      }
      return undefined;
    },
    async load(id) {
      if (id === `\0${moduleId}`) {
        const template = createRoutes(pageRoot, otherProps);
        return template;
      }
      return undefined;
    },
    configureServer(server) {
      const watcher = chokidar.watch(pageRoot, {
        ignoreInitial: true,
      });

      const listener = (file: string) => {
        log.info(`File ${file} changed, rebuilding routes...`);
        // log.info('Rebuilding routes...');
        // 添加这行通知Vite重新解析该模块
        const vm = server.moduleGraph.getModuleById(`\0${moduleId}`);
        if (vm) server.moduleGraph.invalidateModule(vm);
      };
      watcher.on('add', listener);
      watcher.on('unlink', listener);
    },
  };
}

export { default as buildDirTree } from './buildRoutes';
