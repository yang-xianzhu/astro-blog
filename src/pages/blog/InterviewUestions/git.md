---
title: Git
description: Git
layout: ../../../layouts/MainLayout.astro
---

### 概述

​	git是一块免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。目前是最受欢迎的版本管理工具，应用在各行各业的版本管理，尤其在IT行业广泛使用。git分为三个区：

![image-20221006090353919](/git图解.png)

​	由上图可以看出，git版本控制有三个区，分别是工作区、暂存区、本地仓库，简单理解的话，未执行`git add` 命令的话是在工作区，执行了`git add` 之后到了暂存区，执行了`git commit `之后到了本地仓库中。

​	另外建议大家经常使用git命令面板执行相关命令，git bash 面板是一个非常好用的工具，不仅可以使用git相关的命令，还可以执行linux部分命令，如登陆远程服务器 `ssh root@hostname ` 任何输入账号密码即可，也可以通过下载相关的包，支持更多的命令，如zip命令等。



### 基础

```sh
# 初始化仓库
git init # 初始化项目 生成.git文件
# 状态查询
git status # 查看当前状态，看提示的颜色和标志，区分文件需要的操作、待push的commit
		-s #git status 简化 注意前面的字母标志，分为两列，第一列是对staging区域而言，第二列是对wording目录而言。同时注意字母的颜色，区分当前文件的状态。
```

### 追踪

```sh
git add # 将文件添加到暂存区，非常重要的一个操作，这样就可以实时的对你的文件进行跟踪了。
git add <filename> # 将 filename 文件添加到暂存区
git add . # 将所有文件添加到暂存区
git add -A # 添加所有改动文件到暂存区 （不常用）
git add -u # 添加有改动并且已追踪的文件 （不常用）
git clean
					-n # 并不删除操作，只显示将呗清理的文件列表
					-f # 删除文件，但不会动 .gitignore 里的标记
					-d # 删除目录，但不会动 .gitignore里的标记
					-x # 仅删除.gitignore 里标记的文件
					-df # 删除未跟踪的文件和文件夹
```

### 比较

```sh
# 比较文件，默认是工作区和暂存区文件比较，不加参数是所有文件
git diff 
# 暂存区和本地仓库比较
git diff --cached
# 工作区和本地仓库比较
git diff head
# 工作区和暂存区 filename 文件的对比，可以加路径
git diff filename
# 比较当前分支和	`branchName`分支的filename的文件
git diff <branch> filename 
# 比较远程主机 romoteName 的branchName 分支的filename文件比较
git diff <remote/branch> <filename>
# 比对当前的dev 与 master 两个分支代码的差异
git diff dev master filename 
# 输出当前与指定版本的差异文件
git diff --name-only <branch | commitId |HEAD@{num}>
```

### 提交

```sh
# 提交到本地仓库
git commit -m'描述信息'
# 提交指定文件，可以是文件目录，多文件用空格隔开
git commit filename -m '描述信息'
# 合并提交
git commit --amend -m '描述信息'
# 添加到暂存区并提交到本地仓库（不建议使用）
git commit -a -m '描述信息'
# 标记提交到节点，记录提交人
git commit -s（-signoff） -m '描述信息'
```

### 日志

```sh
# git log 简化
git shortlog
# 列出提交到详细信息
git log 
-p # 查看历次的log信息及更改情况
-p -number # 查看距现在最近的number次的，提交的信息及更改情况
--stat -number # 查看log显示文件修改情况
--pretty=oneline # 查看提交的版本ID
--author="author" # 查看author 提交的记录
--oneline --graph # 查看分支图
git show commitid/tag # 查看记录
git log --oneline ｜ wc -l # 查看一共有多少条提交记录
```

### 进阶

​		文章解释说明 `git`  相关的高级功能，包含暂存、分支、合并、回滚等。这些命令是我们日常工作中分支管理、代码管理等重要手段，基本通过这些命令可以解决在开发中遇到的代码冲突、冲突解决、代码回退、紧急 `bug` 修复等。

##### git stash

​		stash命令不是很常用，在工作中一般遇到紧急问题，我们会暂存一下代码，由于暂存的代码容易和本地代码冲突无法强制使用暂存区代码，这是暂存的一个缺陷。当然在我们日常工作中，在暂存状态下尽量不要频繁暂存，容易造成一些问题。下面主要介绍暂存、暂存的取出、暂存的查看、暂存的删除、以及暂存树的调出等。`git stash --help` 查看相关参数。

```js
git stash # 中断，保持现场。（用编号标记不同的中断）

git stash list # 查看所有的中断信息

git stash clear # 清除所有中断信息

git stash save '描述信息'

git stash show [-p]

git stash show stash@{num} # 查看stash中的修改内容

git stash pop stash@{num} # 从stash中取出并删除stash{num}，默认是最后一条

git stash apply stash@{num} # 取出stash{num}，但不删除stash，默认是最后一条

git fsck [--lost-found] # 查看丢失的stash
```

##### git branch

​		分支管理相关命令较多，在日常工作操作中也较为频繁，熟练掌握这些命令可以提高代码管理的效率，下面是分支操作的相关命令说明，包含分支的新建、切换、更名、查看等。使用`git branch --help` 查看相关参数。

```js
# 新建分支
git branch '分支名' # 创建一个分支
git checkout -b '分支名' # 创建并切换分支
'分支名' <remote/branch> # 以远程分支为基础，创建新的本地分支

'分支名' <commitId> # 以某次提交创建新的分支

'分支名' <tagName> # 以 tag 创建新的分支

git checkout --orphan <branch> # 新建纯净分支，不依赖任何分支

# 分支查看
git branch -l # 查看本地分支
					 -r # 列出所有分支
           -a # 远程分支 + 本地分支
           -v # 查看各分支最后一次提交的版本，[feat/v6.7.16 8351a38 fix 修复分组bug]

# 删除分支
git branch -d <branch< # 删除分支，未合并分支不能被删除
           -D <branch> # 强制删除分支

# 切换分支
git checkout <branch> # 从当前分支切换到 branchName 分支
git checkout - # 切换到上一分支 类似 cd --

# 更改分支名
git branch -m <oldBranch> <newBranch> 
```

##### Git merge / rebase / cherry-pick

​		代码合并是多人协作开发必要命令，在日常开发中可能每个功能块均有一个或多个开发或者每个人都自己维护一个本地分支。大家为了避免冲突做了很多分支和代码管理上的约束。都是为了降低代码管理的成本。下面主要说明几种不同合并方式，第一是 `merge` 第二是 `rebase` ，第三是 `cherry-pick`。



##### git merge

```sh
# git merge
git merge dev # 将 dev 分支合并到当前分支
git merge origin/dev # 将远程主机origin到dev分支合并到当前分支
--continue # 有冲突时执行
--abort # 放弃合并
--allow-unrelated-histories dev # 合并独立分支代码
--no-commit  # 使用分支上的最后的提交 commit 信息，否则会出现 Merge branch `test`
--squash # 压缩所有合并
```

##### git rebase

```sh
# git rebase
git rebase master # master 分支 合并到 当前分支
git rebase origin/dev # 将 远程主机 origin 到dev分支合并到当前分支
--continue # 有冲突时执行
--abort # 放弃合并
git reabse -i commtId # 压缩合并代码
```

##### git cherry-pick

```sh
# git cherry-pick
git cherry-pick commitId # 将其他分支 pick 到当前分支
git cherry-pick commitId1^..commitId2 # 连接到 commit记录pick到当前分支
--continue # 有冲突时执行
--abort # 放弃合并
git cherry-pick -m 1 commitId # -m 1 表示使用父分支代码 （代码合并的commitId）
```

##### git reset

```sh
git checkout .(<filename> | /dirname) # 撤销修改，不建议使用，会造成修改的文件无法找回。（从工作区撤回）
git checkout [commitId] <filename> # 将文件 file 从仓库恢复
git reset HEAD <filename> # 从暂存区撤销指定文件
git reset --hard/(--soft) HEAD # 强行回退到最后一次提交 （硬/软）
HEAD^ # 最后一次提交的前一个提交（硬/软）
HEAD～number # 回退到前number版本（硬/软）
commitId # 回滚到当前 commitId
git reset commitId <filename> # 回滚某一个文件
git restore <filename> # 恢复到这个版本

git revert commitId # 回滚到指定的提交（作为一次提交）
--abort # 放弃回滚
--skip # 跳过冲突
--continue # 继续操作

git reset tagname # 回滚到指定的版本号
```

##### Git format-patch

打补丁包，生成补丁包文件。然后通过应用补丁包 `解决功能bug` 。在实际工作中，为了快速的解决某一个功能问题，使用补丁包的方式提供给客户无疑是不错的选择。

```sh
# 单文件补丁包
# 生成 .patch 补丁包文件
git diff > feat.patch # 生成 feat.patch 文件
git diff preCommitId nextCommitId >feat.patch # 两个 commit 之间差异补丁包

# 打补丁（应用补丁）
git apply --check feat.patch # 检查 patch 文件是否可用（可用则无输出，否则输出错误）
git apply feat.patch # 应用补丁包

git format-patch master # 生成 master 分支的补丁
```

### 高级

- ##### 打标签

```sh
git tag verionNum # 打上版本号（轻标签，不含有注释备注等信息的标签）
git tag -a versionNum -m '描述信息' # 创建带有备注的标签
git tag -a versionNum(lablName) commitId # 给指定的 commitId 打标签

git tag -d versionNum # 删除标签
git push origin --delete tag <tagname> # 删除远程分支的tag

git tag # 查看当前分支下的标签
git tag -l 'v0.1.*' # 搜索符合模式的标签 -l(list)
git tag -n # 查看标签和标签说明

git push --tags # 上传当前分支下的所有标签
git push origin tagName # 上传 tag 标签
git push branchName tagsName # 将 targsName 推送到 branchName 分支
git diff tag1 tag2 --filename # 比较两个文件的差异

git checkout -b branchName tagName # 以 tag_name 创建一个分支 branch_name
git push origin : refs/tags/tagName # 删除远程分支 tag
```

- ##### 远程仓库

```sh
# 克隆
git clone <url> # 克隆仓库代码
git clone <url> <dir> # 将代码 clone 到 dir目录，不在使用默认目录
git clone -b <branch> --single--branch <url> # 克隆单一分支代码
git clone -b <branch> <url>

# 查看
git remote # 查看所有的主机名
git remote -v # 查看所有的远程仓库地址(name + url)
git remote show <remote> # 查看指定远程版本库信息

# 添加
git remote add <remote> <url> # 添加远程版本库（添加一个远程的仓库，在指定的url上）

# 修改
git remote set-url <remote> <newUrl> # 修改主机地址

# 删除
git push origin --delete <branch>
git remote rm <remote> # 删除远程仓库

# 上传
git push origin <本地分支>:<远程分支> # 上传代码到远程仓库，如果是本地名，则删除远程分支
-f # 强制上传
git push --set-upstream origin branchName # 新建 branchName 远程分支，当前分支与远程分支关联
git push -u origin master # --set-upstream 简写

# 下载
git fetch <origin> # 拉代码，需要手动合并代码
git pull <origin><remote/branch>:<branch>
```

- ##### 操作记录

```sh
git reflog # 查看所有的本地操作记录
git log --graph --oneline --decorate $(git fsck --no-reflog | awk '/dangling comm/{print $3}') # 调出 全部记录的树

git reflog show <branch> # 列出指定分支的版本记录列表
git reflog show --date=iso <branch> # 查看分支创建的时间

git show <commitId> # 查看 commitId 信息
git show --stat <commitId> # 查看 commitId 修改文件信息
```

- ##### 打包‘

```sh
git archive --format=zip --o master.zip master. # 用zip方式打包master分支代码
--format=zip --o v1.2.zip v1.2 # 打包v1.2版本
--format=zip --o update.zip HEAD ${git diff --name--only HEAD^} # 打包更新的内容文件
--format=zip --o update.zip HEAD ${git diff --name--only HEAD~2} # 打包最后两个版本修改的文件
--format=zip --o update.zip HEAD ${git diff --name--only master fix-error} # 打包两个分支差异的文件
```

- ##### 其他

```sh
git checkout <branch> --filename : # 将 dev 分支的 filename 检出到当前分支
git command --help # 查看命令详情 command命令
```