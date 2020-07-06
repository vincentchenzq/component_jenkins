# 打印当前的工作目录(Jenkins)
echo "当前的工作目录：${WORKSPACE}"
# 进入到工作目录
cd ${WORKSPACE}

# 切换分支
git checkout master
#  强行拉取远程分支覆盖本地分支
git fetch --all
git reset --hard origin/master

# lerna 初始化模块依赖
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

if [ "$gitlabTargetBranch" == "master" ]; then
  if hasLernaChanged; then
    echo "lerna 有变动，继续执行"
    npm run ci:release
    errorExit
    npm run changelog
    git add CHANGELOG.md
    git commit --amend --no-edit
    reSignTag
    git push origin master
    git push origin --tags
  fi
  docBuildOut doc h3yun-shared-doc
elif [ "$gitlabTargetBranch" == "dev" ]; then
  if hasLernaChanged; then
    echo "lerna 有变动，继续执行"
    npm run ci:dev
    errorExit
    git push  origin dev
  fi
  recentMergeLogFindDocsFeat doc-alpha h3yun-shared-doc-alpha
fi

# 普通构建任务也会推送到构建
echo "执行 Jenkins构建概要推送钉钉任务"
#npm run jk2dt
