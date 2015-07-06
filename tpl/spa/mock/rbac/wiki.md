# 权限相关 API

## 目录摘要
    - 功能 API 配置
    - 角色配置
    - 角色用户配置
    - 角色权限配置
    - 用户角色配置

## 接口定义

    5 系统配置

        5.1 功能 API 配置
            5.1.1 添加功能API
                [POST] /apis
                ```
                {
                    name: 'xxx',
                    api: '[POST]xxx',
                    level: 'aaa/xxxx/delete'
                }
                ```
            5.1.2 获取api列表
                [GET] /apis
                ```
                {
                    items: [
                        {
                            name: 'xxx',
                            api: '[POST]xxx',
                            level: 'aaa/xxxx/delete'
                        },
                        {
                            name: 'yyy',
                            api: '[POST]yyy',
                            level: 'aaa/xxxx/delete'
                        }
                    ]
                }
                ```
            5.1.3 删除api
                [DELETE] /apis?api={api}

        5.2 角色配置
            5.2.1 获取角色列表
                [GET] /roles
                ```
                {
                    items: [
                        {
                            role_name: 'ADMINISTRATOR',
                            role_id: 123,
                            ...
                        },
                        {
                            role_name: 'SDP DEVELOPER',
                            role_id: 456,
                            ...
                        }
                    ]
                }
                ```
            5.2.2 添加角色
                [POST] /roles
                ```
                {
                    role_name: 'ADMINISTRATOR',
                    role_id: 123,
                    ...
                }
                ```
            5.2.3 编辑角色
                [PATCH] /roles/{role_id}
                ```
                {
                    role_name: 'ADMINISTRATOR',
                    ...
                }
                ```
            5.2.4 删除角色
                [DELETE] /roles/{role_id}

        5.3 角色用户配置
            5.3.1 获取指定角色拥有的用户列表
                [POST] /roles/{role_id}/users
                ```
                {
                    items: [ USER1, USER2, ..., USERN ]
                }
                ```
            5.3.2 为指定角色添加用户
                [POST] /roles/{role_id}/users
                ```
                {
                     role_id: 123
                }
                ```
            5.3.3 删除指定角色的指定用户
                [DELETE] /roles/{role_id}/users/{user_id}

        5.4 角色权限配置
            5.4.1 获取角色权限列表
                [GET] /roles/{role_id}/apis
                ```
                {
                    items: [ API1, API2, ..., APIN ]
                }
                ```
            5.4.2 为指定角色添加权限
                [POST] /roles/{role_id}/apis
                ```
                {
                    apis: [ API1, API2, ..., APIN ]
                }
                ```
            5.4.3 获取待分配的权限列表
                [GET] /roles/apis
                ```
                {
                    items: [
                        {
                            name: 'xxx',
                            api: '[POST]xxx'
                            level: 'xxx/zzz/add'
                        },
                        {
                            name: 'yyy',
                            api: '[POST]yyy'
                            level: 'xxx/aaa/delete'
                        }
                    ]
                }
                ```

        5.5 用户角色配置
        5.5.1 获取指定用户所属的角色列表
            [POST] /users/{user_id}/roles
            ```
            {
                items: [ ROLE1, ROLE2, ..., ROLEN ]
            }
            ```
        5.5.2 为指定用户添加角色
            [POST] /users/{user_id}/roles
            ```
            {
                 role_id: 123
            }
            ```
        5.5.3 删除指定用户的指定角色
            [DELETE] /users/{user_id}/roles/{role_id}
