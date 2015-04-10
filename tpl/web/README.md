# <%= appname %>

> <%= description %>

## 准备

```bash
$ cd path/to/<%= appname %>
# 生成 seajs 及 config 文件
$ dong init sea
```

## 开发

```bash
$ cd path/to/<%= appname %>
# 本地 Web 服务
$ dong serve
```

## 使用

```html
<script src="/<%= appname %>/lib/seajs/sea.js"></script>
<script src="/<%= appname %>/lib/config.js"></script>
<script>
  // /<%= appname %>/app/**/*.js
  seajs.use('/<%= appname %>/app/<folder>/<file>.js');
</script>
```

## 构建

```bash
$ grunt build
```

构建后的 app 文件存放于 dist 目录，css 文件存放于 theme/default/css 目录
