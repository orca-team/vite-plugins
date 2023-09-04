import { basename, join } from 'path';
import type { RouteObject } from 'react-router';
import type { BuildRoutesOptions } from './defs';

function slash(path: string) {
  return path.replace(/\\/g, '/');
}

const defaultIsIndex = (path: string) => {
  const pathWithoutExt = path.split('.').slice(0, -1)
    .join('.');
  return basename(pathWithoutExt) === 'index';
};
const defaultIsLayout = (path: string) => {
  const pathWithoutExt = path.split('.').slice(0, -1)
    .join('.');
  return basename(pathWithoutExt) === '_layout';
};

/**
 * 转义动态子路径(不包含 /)
 * @param path
 * @param fallback 当不存在动态子路径时的回调
 */
function escapeDynamicSubPath(path: string, fallback?: ((path: string) => string)) {
  // 支持将 /[id]/xxx 或者 /$id/xxx 的路径转换为 /:id/xxx
  const s = path
    // 兼容 umi 3.x 的动态路由写法
    .replace(/\[([^[\]]+)(\$)?\]/g, (_, v1, v2) => `:${v1}${v2 ? '?' : ''}`)
    // 兼容 umi 4.x 的动态路由写法
    .replace(/^\$/g, ':');
  // 兼容 umi 4.x 的完全动态路由写法
  if (path === '$') {
    return '*';
  }
  if (s.includes(':')) {
    return s;
  }
  return fallback ? fallback(s) : s;
}

const defaultFilter = () => true;

const defaultTransformer = (path: string) => path;

export default function buildRoutes(
  pageRoot: string,
  fileList: string[],
  options: BuildRoutesOptions = {},
): RouteObject[] {
  const { isLayout = defaultIsLayout, isIndex = defaultIsIndex, filter = defaultFilter, transform = defaultTransformer } = options;
  const root: RouteObject[] = [
    {
      path: '',
    },
  ];

  const cache = new Map<string, RouteObject>();
  cache.set('', root[0]);

  function getRoute(path: string) {
    // 已存在
    if (cache.has(path)) {
      return cache.get(path);
    }
    // 不存在，创建
    const pathArr = path.split('/');
    const parentPath = pathArr.slice(0, pathArr.length - 1).join('/');
    const currentPath = pathArr[pathArr.length - 1];
    const parent = getRoute(parentPath);
    if (!parent) {
      return undefined;
    }
    const route: RouteObject = {
      path: escapeDynamicSubPath(currentPath, transform),
    };
    cache.set(path, route);
    parent.children = parent.children ?? [];
    parent.children.push(route);
    return route;
  }

  fileList.filter(filter).forEach((filePath) => {
    const path = slash(filePath);
    const pathWithoutExt = path.split('.').slice(0, -1)
      .join('.');
    const routeIsIndex = isIndex(path);
    const routeIsLayout = isLayout(path);
    const parentPath = path.split('/').slice(0, -1)
      .join('/');
    const parent = getRoute(parentPath);
    if (!parent) {
      console.error('Build route failed: ', path);
      return;
    }

    if (routeIsLayout) {
      parent.element = `@import|${join(pageRoot, path)}|layout`;
      return;
    }

    const currentPath = basename(pathWithoutExt);
    parent.children = parent.children ?? [];
    if (currentPath === '404') {
      parent.children.push({
        path: '*',
        element: `@import|${join(pageRoot, path)}|`,
      });
      return;
    }

    const route: RouteObject = {
      path: routeIsIndex ? undefined : escapeDynamicSubPath(currentPath, transform),
      index: routeIsIndex,
      element: `@import|${join(pageRoot, path)}|`,
    };
    parent.children.push(route);
    cache.set(pathWithoutExt, route);
  });

  return root;
}
