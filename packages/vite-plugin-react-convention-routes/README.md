# `@orca-fe/vite-plugin-react-convention-routes`

一款适用于 `react-router-dom@6` 的路由插件，可以根据约定的目录结构自动生成路由配置。

插件会生成一份 `RouteObject[]` 类型的路由配置，你需要使用 `@orca-fe/vite-plugin-react-convention-routes/routes` 引入。
路由配置可以通过 `react-router-dom@6` 的 [`useRoutes`](https://reactrouter.com/en/main/hooks/use-routes) 直接生成路由。

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from '@orca-fe/vite-plugin-react-convention-routes/routes';

// 生成路由组件
const ConventionRoutes = () => useRoutes(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConventionRoutes />
    </BrowserRouter>
  </React.StrictMode>,
);

```

## 安装

```bash
npm install @orca-fe/vite-plugin-react-convention-routes --save-dev
```

## 使用

在 `vite.config.js` 中添加插件配置，以下是所有可配置的参数

```js
// vite.config.js
import conventionRoutes from '@orca-fe/vite-plugin-react-convention-routes';

export default {
  plugins: [
    conventionRoutes({
      // 需要扫描的页面根目录，默认为 `src/pages`
      pageRoot: resolve(process.cwd(), 'src/pages'),
      // 是否按需加载，默认为 true
      dynamic: true,
      // 是否支持 `.` 开头的文件，默认为 false (来自 `fast-glob` 的 `dot` 参数)
      dot: false,
      // 扫描目录的深度(来自 `fast-glob` 的 `deep` 参数)
      deep: undefined,
      // 忽略的文件(来自 `fast-glob` 的 `ignore` 参数) 默认规则如下
      ignore: ['**/node_modules/**', '**/components/**', '**/layouts/**', '**/services/**', '**/model/**', '**/hox/**'],
      // 扫描的文件规则(传递给 `fast-glob`) 默认规则如下
      globRule: ['*.{js,jsx,ts,tsx}', '**/*.{js,jsx,ts,tsx}'],
      // 对扫描到的文件进行过滤，默认不过滤
      filter: (path) => true,
      // 标记需要作为 layout 的文件，默认识别文件名为 `_layout` 的文件。
      isLayout: (path) => basename(path.split('.').slice(0, -1)
        .join('.')) === '_layout',
      // 标记需要作为 index 的文件，默认识别文件名为 `index` 的文件。
      isIndex: (path) => basename(path.split('.').slice(0, -1)
        .join('.')) === 'index',
      // 根据文件路径生成路由路径，默认为 `path => path`
      transform: subPath => subPath,
    }),
  ],
};
```

在 `main.tsx` 中引入路由配置 `@orca-fe/vite-plugin-react-convention-routes/routes` 并使用 `useRoutes` 生成一个路由组件。
接下来你就可以在 `App` 组件中使用该路由组件了。

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from '@orca-fe/vite-plugin-react-convention-routes/routes';

// 生成路由组件
const ConventionRoutes = () => useRoutes(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConventionRoutes />
    </BrowserRouter>
  </React.StrictMode>,
);

```

### 404 页面

如果需要自定义 404 页面，可以在 `src/pages` 目录下创建 `404` 文件，插件会自动将其作为 404 页面。当路由无法匹配到页面文件时，就会渲染该页面。

### 动态路由

#### 兼容 [umi@4.x](https://umijs.org/docs/guides/routes#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1) 的动态路由规则

带 `$` 前缀的目录或文件为动态路由。若 `$` 后不指定参数名，则代表 `*` 通配，比如：

* `src/pages/users/$id.tsx` 会成为 `/users/:id`
* `src/pages/users/$id/settings.tsx` 会成为 `/users/:id/settings`

#### 兼容 [umi@3.x](https://v3.umijs.org/docs/convention-routing) 的动态路由规则

约定 `[]` 包裹的文件或文件夹为动态路由。

比如：
* `src/pages/users/[id].tsx` 会成为 `/users/:id`
* `src/pages/users/[id]/settings.tsx` 会成为 `/users/:id/settings`

### 嵌套路由

约定目录下有 `_layout.tsx` 时会生成嵌套路由，以 `_layout.tsx` 为该目录的 `layout`。`layout` 文件需要返回一个 `React` 组件，并通过 `props.children` 渲染子组件。


```
.
└── pages
    └── users
        ├── _layout.tsx
        ├── index.tsx
        └── list.tsx
```

> 注意：你可以通过 `isLayout` 配置，来自定义哪些文件需要作为 `layout`。默认为 _layout

#### 全局 layout

与 `umijs` 不同，你可以在 `src/pages` 目录下创建 `_layout.tsx`，作为全局的 `layout`。而不是 `src/layouts`


### 配置推荐

```javascript
// vite.config.js
import conventionRoutes from '@orca-fe/vite-plugin-react-convention-routes';
import { paramCase } from 'change-case';

export default {
  plugins: [
    conventionRoutes({
      // 只扫描 404, index 和 _layout 文件，其他文件都不作为路由入口，这样可以避免一些不必要的路由生成，也使得路由更加清晰
      filter: path => /^(.*\/)?(index|_layout|404)\.(j|t)sx?$/.test(path),
      // 规范路由路径，避免出现大写字母和下划线
      transform: paramCase,
    }),
  ],
};
```
