PATH=/root/tools/node-v10.9.0-linux-x64/bin:/root/tools/node-v10.9.0-linux-x64/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:/usr/local/git_home/git-2.7.2:/usr/local/git/bin:/usr/local/git/bin:/root/bin

# 打印当前的工作目录(Jenkins)
echo "当前的工作目录：${WORKSPACE}"
# 进入到工作目录
cd ${WORKSPACE}
# git checkout -b master origin/master
git checkout master
git fetch --all
git reset --hard origin/master


echo "执行 lerna bootstrap"
npm run bootstrap

# 缓存当前项目分支 lerna 模块是否有变动
lernaChanged=$(npm run changed | tail -n 1)

hasLernaChanged() {
  # 若是 lerna change 没有变动则退出
  echo "lerna changed start:$lernaChanged:lerna changed end"
  if [ -z "$lernaChanged" ]; then
    # 1 = false
    return 1
  fi
  # 0 = true
  return 0
}
reSignTag() {
  lastTagName=$(git tag | tail -n 1)
  git tag -d $lastTagName
  git tag -a $lastTagName -m "$lastTagName"
}

if hasLernaChanged; then
  echo "lerna 有变动，继续执行"
  npm run ci:release
  npm run changelog
  git add CHANGELOG.md
  git commit --amend --no-edit
  reSignTag
  git push origin master
  git push origin --tags
fi

# 普通构建任务也会推送到构建
echo "构建成功"