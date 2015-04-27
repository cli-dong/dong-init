# <%= appname %>

> <%= description %>

## 准备

```bash
$ cd path/to/<%= appname %>
$ dong build spa
```

## 开发

```bash
$ cd path/to/<%= appname %>
# 本地 Web 服务
$ dong serve
```

## 使用

```html
<script src="lib/seajs/sea.js"></script>
<script src="lib/config.js"></script>
<script>
  seajs.use('index.js');
</script>
```

## 构建

```bash
$ dong build spa
```

构建后的 js 文件存放于 dist 目录，css 文件存放于 theme/default/css 目录
