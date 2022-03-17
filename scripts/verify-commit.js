import * as fs from 'fs'
import chalk from 'chalk'

// 通过 GIT_PARAMS 读取到保存 git commit 时输入的描述信息的文件目录，一般路径是：.git/COMMIT_EDITMSG
const msgPath = process.env.GIT_PARAMS
console.log('process.env.GIT_PARAMS =', process.env.GIT_PARAMS)

// 读取 .git/COMMIT_EDITMSG 文件信息
const msg = fs.readFileSync(msgPath, 'utf-8').trim()

/**
 * 校验提交信息格式
 * 示例：feat(compiler): add 'comments' option
 *   - type must be one of [feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert, merge
 *   - 括号+冒号+空格 (括号内一般描述修改模块的名称)
 *   - 输入一些描述信息 .{1,50}
 */
const commitRE =
  /^(revert: )?(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert|merge)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `Invalid commit message format.`
    )}\n\n` +
      chalk.red(
        `  Proper commit message format is required for automated changelog generation.\n\n`
      ) +
      `  ${chalk.green(`Examples: feat(compiler): add 'comments' option`)}\n` +
      `  ${chalk.green(
        `  - type must be one of [feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert, merge]`
      )}\n` +
      `  ${chalk.green(`  - header must not be longer than 50 characters`)}\n` +
      `  ${chalk.green(`  - subject may not be empty`)}\n`
  )
  process.exit(1)
}
