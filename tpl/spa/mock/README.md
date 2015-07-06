# 存放 API Mocking 文件

> 所有以 js 或 json 结尾的文件

## 数据模式

```json
{
  <URL>: {
    <METHOD>: <VALUE>
  }
}
```

- `<URL>`: Request URL, without query string.
- `<METHOD>`: RESTful request method，such as `POST|PATCH|PUT|DELETE|GET`, and `*` matches all methods.
- `<VALUE>`: Response text, could be json or string.

## 数据样例

```js
module.exports = {
  '/foo/bar': {
    'GET': function(url, query) {
      // do something with url and query
      return {
        code: 0,
        message: 'ok'
      };
    }
  }
};
```

```js
module.exports = {
  '/foo/bar': {
    '*': {
      code: 0,
      message: 'ok'
    }
  }
};
```

```json
{
  "/foo/bar": {
    "*": {
      "code": 0,
      "message": "ok"
    }
  }
}
```
