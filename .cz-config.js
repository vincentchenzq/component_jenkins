/* eslint-disable max-len */

module.exports = {
  // type 的枚举
  types: [
    { value: 'feat', name: 'feat: 一个新功能' }, // (A new feature)
    { value: 'improvement', name: 'improvement: 对当前功能的改进' }, // (An improvement to a current feature)
    { value: 'fix', name: 'fix: 一个bug修复' }, // (A bug fix)
    { value: 'docs', name: 'docs: 仅是文档修改' }, // (Documentation only changes)
    {
      value: 'style',
      name: 'style: 不会影响代码含义的更改，例如空格，格式化，缺少分号等等', // (Changes that do not affect the meaning of the code) \n         例如空格，格式化，缺少分号，等等(white-space, formatting, missing semi-colons, etc)
    },
    {
      value: 'refactor',
      name: 'refactor: 代码重构', // (A code change that neither fixes a bug nor adds a feature)
    },
    {
      value: 'perf',
      name: 'perf: 更改代码以提高性能', // (A code change that improves performance)
    },
    { value: 'test', name: 'test: 添加缺失的测试' }, // (Adding missing tests)
    {
      value: 'chore',
      name: 'chore: 更改构建过程或辅助工具和诸如文档生成之类的库', // (Changes to the build process or auxiliary tools) \n         和诸如文档生成之类的库(and libraries such as documentation generation)
    },
    {
      value: 'build',
      name: 'build: 影响构建系统或外部依赖项的更改，例如gulp，broccoli，npm', // (Changes that affect the build system or external dependencies) \n         例如gulp，broccoli，npm(example scopes: gulp, broccoli, npm)
    },
    {
      value: 'ci',
      name:
        'ci: 对CI配置文件和脚本的更改，例如Travis, Circle, BrowserStack, SauceLabs', // (Changes to our CI configuration files and scripts) \n      例如Travis, Circle, BrowserStack, SauceLabs(example scopes: Travis, Circle, BrowserStack, SauceLabs)
    },
    { value: 'revert', name: 'revert: 撤回之前某个提交' }, // (Revert to a commit)
    { value: 'WIP', name: 'WIP: 工作正在进行中，还未完成但不影响项目运行' }, // (Work in progress)
  ],
  // scopes 的枚举
  scopes: [],

  // 是否关联编号
  allowTicketNumber: true,

  // 是否必须关联编号
  isTicketNumberRequired: false,

  // 关联编号前缀
  ticketNumberPrefix: '',

  // 关联编号校验
  ticketNumberRegExp: '#\\d+|[A-Za-z0-9]+-\\d+',

  // it needs to match the value for field type. Eg.: 'fix'
  // 需要匹配字段类型的值。例如：'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  // 信息
  messages: {
    type: '选择您要提交更改的的类型:',
    scope: '\n选择更改的的范围(可选):',
    // used if allowCustomScopes is true
    customScope: '请输入更改的的范围(可选)。例如：components:',
    // ticketNumber: '输入关联的需求或缺陷的编号:',
    subject: '请输入更改的简短描述:\n',
    body: '请输入更改的详细描述(可选)。使用"|"换行:\n',
    breaking: '列出任何破坏性更改(可选):\n',
    confirmCommit: '您确定要继续上面的提交吗？',
  },
  // 是否允许只有scope
  allowCustomScopes: true,
  // 只允许以下类型提问破坏性更新
  allowBreakingChanges: ['feat', 'fix', 'improvement', 'refactor', 'perf'],
  // 跳过问题
  skipQuestions: [], // 'body'

  // limit subject length
  // 文本描述长度
  subjectLimit: 100,
  // breaklineChar: '|', // body 和 footer 换行符号 // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:' footer前缀
  // askForBreakingChangeFirst: true, // default is false // 是否先询问是否有破坏性更新
};
