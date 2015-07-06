# <%= appname %>

> <%= description %>

## 1. 开发

```bash
$ cd path/to/<%= appname %>
# 生成 config.js 等
$ dong build [spa] -d
# 启动本地 Web 服务
$ dong serve -d -o
```

## 2. 构建

```bash
$ dong build [spa]
```

构建后的 js 文件存放于 dist 目录，css 文件存放于 theme/default/css 目录

## 3. 迁移（拷贝）指南

> 将 RBAC 部分代码迁移到已有的管理后台项目上

### 后端部分

#### 文件清单

    +---branch
        |   pom.xml (1)
        |   
        \---src
            \---main
                +---filters (2)
                |       filter-development.properties
                |       filter-pressure.properties
                |       filter-product.properties
                |       filter-test.properties
                |       
                \---java
                    \---com
                        \---nd
                            \---admin
                                +---app
                                |       WebApplication.java (3)
                                |               
                                \---config
                                        AdminProperties.java (4)
                                        Config.java (5)
                                        URLGenerator.java (6)

#### 需修改处

- (1) name
- (2) mongodb and target.uri
- (3) getRealm()
- (4) ADMIN_TARGET_URI_DEFAULT_VALUE
- (5) API_KEY
- (6) getForwardRequestUrl()/getSelfRequestUrl()
- (7) NOTHING

### 前端部分

#### 文件清单

    +---webapp
        |   index.html (0)
        |   index.js (0)
        |   package.json (2)
        |   
        +---app (1)
        |                   
        +---i18n
        |   |   en-US.json (2)
        |   |   zh-CN.json (2)
        |   |   
        |   \---error (1)
        |               
        +---mod
        |   |   util.js (0)
        |   |   
        |   +---layout (0)
        |   |       
        |   +---misc
        |   |   file.js (3)
        |   |   user.js (0)
        |   |       
        |   +---mixins
        |   |       auth.js (0)
        |   |       bread.js (0)
        |   |       console.js (0)
        |   |       const.js (2)
        |   |       dollar.js (0)
        |   |       layout.js (0)
        |   |       rest.js (0)
        |   |       route.js (2)
        |   |       session.js (0)
        |   |       storage.js (0)
        |   |       unique.js (0)
        |   |       use.js (0)
        |   |       
        |   \---model (1)
        |               
        +---spm_modules (1)
        |       
        \---WEB-INF
                web.xml (0)

#### 需修改处

- (0) 代表直接覆盖
- (1) 代表文件级合并
- (2) 代表代码级合并
- (3) 代表修改后使用
