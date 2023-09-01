# Monorepo template

多模块项目模板

## 如何添加模块

参考 `packages/demo-comp` 示例模块的结构，在 `packages` 目录下添加新模块。

### 注意事项

- 模块的 `package.json` 中的 `name` 字段，请修改为你的模块名称，且和目录名称保持一致（参考 demo-comp 的结构）。
- 在 `.dumirc.ts` 文件中的 `resolve.atomDirs` 中，参考 demo-comp，添加新的文档目录入口。
- 在 `.dumirc.ts` 文件中的 `alias` 中，添加你的 `组件名称` 到 `代码路径` 的映射，以便 `dumi` 识别。
- 在 `tsconfig.json` 中的 `compilerOptions.paths` 中，添加你的 `组件名称` 到 `代码路径` 的映射，以便 `TypeScript` 插件识别。注意，根目录下的 `tsconfig.json` 以及你的目录下的 `tsconfig.json` 都需要添加。
- 在 `.eslintrc.cjs` 中的 `settings` 的 `'import/resolver'.alias.map` 中，添加你的 `组件名称` 到 `代码路径` 的映射，以便 `eslint` 插件识别。

## 编写代码

在 `packages/组件名/src` 目录下编写你的代码。并通过 `src/index` 导出你的组件内容。

## 编写文档

在 `packages/组件名/docs/index.md` 目录下编写你的文档。如需要多语言支持，请命名为 `index.zh-CN.md`，`index.en.md` 等。

## 编写测试用例

在 `packages/组件名/__tests__` 目录下编写你的测试用例。参考 `jest` 的书写规范即可。

## 版本管理

当你添加/修改了某个组件代码后，准备更新版本时（先不要提交代码），执行 `npm run c` 调用 `changesets`。

`changesets` 会自动检测你的代码变更，并指引你选择需要变更版本的模块。当选择完毕后，`changesets` 会帮助你修改 `package.json` 中的版本号，并自动生成 `CHANGELOG.md`。

当你检查版本号生成无误后，就可以提交代码，由流水线执行编译并发布组件和文档。
