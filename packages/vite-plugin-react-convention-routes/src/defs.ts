import type { RouteProps } from 'react-router';

export type RouteConfig = Omit<RouteProps, 'children'> & {
  children?: RouteConfig[];
  isLayout?: boolean;
  name?: string;
};

export type FileObject = {

  /** path relative to page root */
  path: string;

  /** filename */
  name: string;
  isFile: true;
  extname: string;
};

export type DirObject = {
  path: string;
  name: string;
  isDirectory: true;
  children: (DirObject | FileObject)[];
};

export type DirFileObject = FileObject | DirObject;

export type BuildRoutesOptions = {

  /**
   * 判断路径是否为 layout
   * @param path
   */
  isLayout?: (path: string) => boolean;

  /**
   * 判断路径是否为 index
   * @param path
   */
  isIndex?: (path: string) => boolean;

  /**
   * 过滤路径
   * @param path
   */
  filter?: (path: string) => boolean;

  /**
   * 路径转换
   * @param path
   */
  transform?: (path: string) => string;
};
