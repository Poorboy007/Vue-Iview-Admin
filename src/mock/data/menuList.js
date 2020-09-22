export default {
  menu: {
    'success': true,
    'message': 'success',
    'code': 200,
    'timestamp': 1599010065038,
    'result': [
      {
        'id': '125909152017944576',
        'parentId': '',
        'name': 'ICS-Admin',
        'showAlways': true,
        'level': 0,
        'type': -1,
        'title': 'ICS-Admin',
        'path': '',
        'component': '',
        'url': '',
        'children': [
          {
            'id': '264935801085759489',
            'parentId': '125909152017944576',
            'name': 'dashboard',
            'showAlways': false,
            'level': 1,
            'type': 0,
            'title': '总览',
            'path': '/dashboard',
            'component': 'Layout',
            'icon': 'logo-buffer',
            'url': '',
            'children': [
              {
                'id': '264936312123953152',
                'parentId': '264935801085759489',
                'name': 'dashboard-index',
                'showAlways': true,
                'level': 2,
                'type': 0,
                'title': '总览',
                'path': 'index',
                'component': 'dashboard/workplace',
                'icon': 'logo-buffer',
                'url': '',
                'children': [],
                'permTypes': [],
                'isCustomIcon': 1
              }
            ],
            'permTypes': null,
            'isCustomIcon': 0
          },
          {
            'id': '5129710648430592',
            'parentId': '125909152017944576',
            'name': 'sys',
            'showAlways': true,
            'level': 1,
            'type': 0,
            'title': '系统管理',
            'path': '/sys',
            'component': 'Layout',
            'icon': 'ios-settings',
            'url': '',
            'children': [
              {
                'id': '5129710648430593',
                'parentId': '5129710648430592',
                'name': 'user-manage',
                'showAlways': true,
                'level': 2,
                'type': 0,
                'title': '用户管理',
                'path': 'user-manage',
                'component': 'system/userManage/user',
                'icon': 'md-person',
                'url': '',
                'children': null,
                'permTypes': [
                  'add',
                  'edit',
                  'disable',
                  'enable',
                  'delete',
                  'upload',
                  'input',
                  'other'
                ],
                'isCustomIcon': 1
              },
              {
                'id': '5129710648430594',
                'parentId': '5129710648430592',
                'name': 'role-manage',
                'showAlways': true,
                'level': 2,
                'type': 0,
                'title': '角色权限管理',
                'path': 'role-manage',
                'component': 'system/roleManage/role',
                'icon': 'md-contacts',
                'url': '',
                'children': [],
                'permTypes': [
                  'add',
                  'edit',
                  'delete',
                  'editPerm',
                  'setDefault'
                ],
                'isCustomIcon': 1
              },
              {
                'id': '5129710648430595',
                'parentId': '5129710648430592',
                'name': 'menu-manage',
                'showAlways': true,
                'level': 2,
                'type': 0,
                'title': '菜单权限管理',
                'path': 'menu-manage',
                'component': 'system/menuManage/menu',
                'icon': 'md-menu',
                'url': '',
                'children': [],
                'permTypes': [
                  'add',
                  'edit',
                  'delete'
                ],
                'isCustomIcon': 1
              },
              {
                'id': '75002207560273920',
                'parentId': '5129710648430592',
                'name': 'dict',
                'showAlways': true,
                'level': 2,
                'type': 0,
                'title': '数据字典管理',
                'path': 'dict',
                'component': 'system/dictManage/dict',
                'icon': 'md-bookmarks',
                'url': '',
                'children': [],
                'permTypes': [
                  'add',
                  'edit',
                  'delete',
                  'add',
                  'edit',
                  'delete'
                ],
                'isCustomIcon': 1
              }
            ],
            'permTypes': null,
            'isCustomIcon': 0
          }
        ],
        'permTypes': null,
        'isCustomIcon': 1
      }
    ]
  },
  all: {
    'success': true,
    'message': 'success',
    'code': 200,
    'timestamp': 1599547116182,
    'result': [{
      'id': '125909152017944576',
      'createUser': '',
      'createTime': '2019-04-04 00:50:22',
      'updateUser': 'admin',
      'updateTime': '2020-04-14 10:31:40',
      'delFlag': 0,
      'name': 'SecurityOperationCenter',
      'showAlways': true,
      'level': 0,
      'type': -1,
      'title': 'ICS-Admin',
      'path': '',
      'component': '',
      'icon': 'md-home',
      'buttonType': '',
      'parentId': '',
      'description': '',
      'sortOrder': 0.00,
      'status': 0,
      'url': '',
      'isCustomize': 1,
      'children': [{
        'id': '264935801085759489',
        'createUser': 'admin',
        'createTime': '2020-04-21 16:12:38',
        'updateUser': 'admin',
        'updateTime': '2020-04-24 10:59:55',
        'delFlag': 0,
        'name': 'dashboard',
        'showAlways': false,
        'level': 1,
        'type': 0,
        'title': '总览',
        'path': '/dashboard',
        'component': 'Main-New',
        'icon': 'icon-jiaoyizonglan',
        'buttonType': '',
        'parentId': '125909152017944576',
        'description': '',
        'sortOrder': 0.00,
        'status': 0,
        'url': '',
        'isCustomize': 0,
        'children': [{
          'id': '264936312123953152',
          'createUser': 'admin',
          'createTime': '2020-04-21 16:14:40',
          'updateUser': 'admin',
          'updateTime': '2020-04-21 16:16:01',
          'delFlag': 0,
          'name': 'dashboard-index',
          'showAlways': true,
          'level': 2,
          'type': 0,
          'title': '总览',
          'path': 'index',
          'component': 'dashboard/index',
          'icon': 'icon-jiaoyizonglan',
          'buttonType': '',
          'parentId': '264935801085759489',
          'description': '',
          'sortOrder': 0.00,
          'status': 0,
          'url': '',
          'isCustomize': 1,
          'children': [],
          'permTypes': null,
          'expand': true,
          'checked': false,
          'selected': false
        }],
        'permTypes': null,
        'expand': true,
        'checked': false,
        'selected': false
      }, {
        'id': '5129710648430592',
        'createUser': '',
        'createTime': '2018-06-04 19:02:29',
        'updateUser': 'admin',
        'updateTime': '2020-05-12 16:20:13',
        'delFlag': 0,
        'name': 'sys',
        'showAlways': true,
        'level': 1,
        'type': 0,
        'title': '系统管理',
        'path': '/sys',
        'component': 'Main-New',
        'icon': 'icon-xitongguanli',
        'buttonType': '',
        'parentId': '125909152017944576',
        'description': '',
        'sortOrder': 1.00,
        'status': 0,
        'url': '',
        'isCustomize': 0,
        'children': [{
          'id': '5129710648430593',
          'createUser': '',
          'createTime': '2018-06-04 19:02:32',
          'updateUser': 'admin',
          'updateTime': '2020-04-24 10:51:23',
          'delFlag': 0,
          'name': 'user-manage',
          'showAlways': true,
          'level': 2,
          'type': 0,
          'title': '用户管理',
          'path': 'user-manage',
          'component': 'sys/userManage/userManage',
          'icon': 'md-person',
          'buttonType': '',
          'parentId': '5129710648430592',
          'description': '',
          'sortOrder': 1.10,
          'status': 0,
          'url': '',
          'isCustomize': 1,
          'children': [{
            'id': '15701400130424832',
            'createUser': null,
            'createTime': '2018-06-03 22:04:06',
            'updateUser': null,
            'updateTime': '2018-09-19 22:16:44',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '添加用户',
            'path': '/ics/user/admin/add*',
            'component': '',
            'icon': '',
            'buttonType': 'add',
            'parentId': '5129710648430593',
            'description': '',
            'sortOrder': 1.11,
            'status': 0,
            'url': '',
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '16678126574637056',
            'createUser': null,
            'createTime': '2018-06-06 14:45:16',
            'updateUser': null,
            'updateTime': '2018-09-19 22:16:48',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '编辑用户',
            'path': '/ics/user/admin/edit*',
            'component': '',
            'icon': '',
            'buttonType': 'edit',
            'parentId': '5129710648430593',
            'description': '',
            'sortOrder': 1.12,
            'status': 0,
            'url': '',
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '15701915807518720',
            'createUser': null,
            'createTime': '2018-06-03 22:06:09',
            'updateUser': null,
            'updateTime': '2018-06-06 14:46:51',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '禁用用户',
            'path': '/ics/user/admin/disable/**',
            'component': '',
            'icon': '',
            'buttonType': 'disable',
            'parentId': '5129710648430593',
            'description': '',
            'sortOrder': 1.13,
            'status': 0,
            'url': null,
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '15708892205944832',
            'createUser': null,
            'createTime': '2018-06-03 22:33:52',
            'updateUser': null,
            'updateTime': '2018-06-28 16:44:48',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '启用用户',
            'path': '/ics/user/admin/enable/**',
            'component': '',
            'icon': '',
            'buttonType': 'enable',
            'parentId': '5129710648430593',
            'description': '',
            'sortOrder': 1.14,
            'status': 0,
            'url': null,
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '16678447719911424',
            'createUser': null,
            'createTime': '2018-06-06 14:46:32',
            'updateUser': null,
            'updateTime': '2018-08-10 21:41:16',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '删除用户',
            'path': '/ics/user/delByIds/**',
            'component': '',
            'icon': '',
            'buttonType': 'delete',
            'parentId': '5129710648430593',
            'description': '',
            'sortOrder': 1.15,
            'status': 0,
            'url': '',
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '25014528525733888',
            'createUser': null,
            'createTime': '2018-06-29 14:51:09',
            'updateUser': null,
            'updateTime': '2018-10-08 11:13:27',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '上传图片',
            'path': '无',
            'component': '',
            'icon': '',
            'buttonType': 'upload',
            'parentId': '5129710648430593',
            'description': '',
            'sortOrder': 1.16,
            'status': 0,
            'url': '',
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '56898976661639168',
            'createUser': null,
            'createTime': '2018-09-25 14:28:34',
            'updateUser': null,
            'updateTime': '2018-09-25 15:12:46',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '导入用户',
            'path': '/ics/user/importData*',
            'component': '',
            'icon': '',
            'buttonType': 'input',
            'parentId': '5129710648430593',
            'description': '',
            'sortOrder': 1.17,
            'status': 0,
            'url': '',
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '156365156580855808',
            'createUser': null,
            'createTime': '2019-06-27 01:51:39',
            'updateUser': null,
            'updateTime': '2019-06-27 01:51:39',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '重置密码',
            'path': '/ics/user/resetPass',
            'component': '',
            'icon': '',
            'buttonType': 'other',
            'parentId': '5129710648430593',
            'description': null,
            'sortOrder': 1.18,
            'status': 0,
            'url': null,
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }],
          'permTypes': null,
          'expand': true,
          'checked': false,
          'selected': false
        },
        {
          'id': '5129710648430594',
          'createUser': null,
          'createTime': '2018-06-04 19:02:35',
          'updateUser': null,
          'updateTime': '2018-10-13 13:51:36',
          'delFlag': 0,
          'name': 'role-manage',
          'showAlways': true,
          'level': 2,
          'type': 0,
          'title': '角色权限管理',
          'path': 'role-manage',
          'component': 'sys/roleManage/role',
          'icon': 'md-contacts',
          'buttonType': '',
          'parentId': '5129710648430592',
          'description': '',
          'sortOrder': 1.60,
          'status': 0,
          'url': '',
          'isCustomize': 1,
          'children': [{
            'id': '16687383932047360',
            'createUser': '',
            'createTime': '2018-06-06 15:22:03',
            'updateUser': 'admin',
            'updateTime': '2020-07-15 10:31:19',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '添加角色',
            'path': '/ics/role/save*',
            'component': '',
            'icon': '',
            'buttonType': 'add',
            'parentId': '5129710648430594',
            'description': '',
            'sortOrder': 1.21,
            'status': 0,
            'url': '',
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '16689632049631232',
            'createUser': null,
            'createTime': '2018-06-06 15:30:59',
            'updateUser': null,
            'updateTime': '2018-09-19 22:07:37',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '编辑角色',
            'path': '/ics/role/edit*',
            'component': '',
            'icon': '',
            'buttonType': 'edit',
            'parentId': '5129710648430594',
            'description': '',
            'sortOrder': 1.22,
            'status': 0,
            'url': '',
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '16689745006432256',
            'createUser': null,
            'createTime': '2018-06-06 15:31:26',
            'updateUser': null,
            'updateTime': '2018-08-10 21:41:23',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '删除角色',
            'path': '/ics/role/delAllByIds/**',
            'component': '',
            'icon': '',
            'buttonType': 'delete',
            'parentId': '5129710648430594',
            'description': '',
            'sortOrder': 1.23,
            'status': 0,
            'url': '',
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '16689883993083904',
            'createUser': null,
            'createTime': '2018-06-06 15:31:59',
            'updateUser': null,
            'updateTime': '2018-06-06 15:31:59',
            'delFlag': 0,
            'name': null,
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '分配权限',
            'path': '/ics/role/editRolePerm**',
            'component': null,
            'icon': null,
            'buttonType': 'editPerm',
            'parentId': '5129710648430594',
            'description': null,
            'sortOrder': 1.24,
            'status': 0,
            'url': null,
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '16690313745666048',
            'createUser': null,
            'createTime': '2018-06-06 15:33:41',
            'updateUser': null,
            'updateTime': '2018-09-19 22:07:46',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '设为默认角色',
            'path': '/ics/role/setDefault*',
            'component': '',
            'icon': '',
            'buttonType': 'setDefault',
            'parentId': '5129710648430594',
            'description': '',
            'sortOrder': 1.25,
            'status': 0,
            'url': '',
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }],
          'permTypes': null,
          'expand': true,
          'checked': false,
          'selected': false
        },
        {
          'id': '5129710648430595',
          'createUser': null,
          'createTime': '2018-06-04 19:02:37',
          'updateUser': null,
          'updateTime': '2018-09-23 23:32:02',
          'delFlag': 0,
          'name': 'menu-manage',
          'showAlways': true,
          'level': 2,
          'type': 0,
          'title': '菜单权限管理',
          'path': 'menu-manage',
          'component': 'sys/menuManage/menu',
          'icon': 'md-menu',
          'buttonType': '',
          'parentId': '5129710648430592',
          'description': '',
          'sortOrder': 1.70,
          'status': 0,
          'url': '',
          'isCustomize': 1,
          'children': [{
            'id': '16694861252005888',
            'createUser': null,
            'createTime': '2018-06-06 15:51:46',
            'updateUser': null,
            'updateTime': '2018-09-19 22:07:52',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '添加菜单',
            'path': '/ics/permission/add*',
            'component': '',
            'icon': '',
            'buttonType': 'add',
            'parentId': '5129710648430595',
            'description': '',
            'sortOrder': 1.31,
            'status': 0,
            'url': '',
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '16695107491205120',
            'createUser': null,
            'createTime': '2018-06-06 15:52:44',
            'updateUser': null,
            'updateTime': '2018-09-19 22:07:57',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '编辑菜单',
            'path': '/ics/permission/edit*',
            'component': '',
            'icon': '',
            'buttonType': 'edit',
            'parentId': '5129710648430595',
            'description': '',
            'sortOrder': 1.32,
            'status': 0,
            'url': '',
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '16695243126607872',
            'createUser': null,
            'createTime': '2018-06-06 15:53:17',
            'updateUser': null,
            'updateTime': '2018-08-10 21:41:33',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '删除菜单',
            'path': '/ics/permission/delByIds/**',
            'component': '',
            'icon': '',
            'buttonType': 'delete',
            'parentId': '5129710648430595',
            'description': '',
            'sortOrder': 1.33,
            'status': 0,
            'url': '',
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }],
          'permTypes': null,
          'expand': true,
          'checked': false,
          'selected': false
        },
        {
          'id': '75002207560273920',
          'createUser': null,
          'createTime': '2018-11-14 13:24:21',
          'updateUser': null,
          'updateTime': '2018-11-20 20:06:22',
          'delFlag': 0,
          'name': 'dict',
          'showAlways': true,
          'level': 2,
          'type': 0,
          'title': '数据字典管理',
          'path': 'dict',
          'component': 'sys/dictManage/dict',
          'icon': 'md-bookmarks',
          'buttonType': '',
          'parentId': '5129710648430592',
          'description': '',
          'sortOrder': 1.80,
          'status': 0,
          'url': '',
          'isCustomize': 1,
          'children': [{
            'id': '76215889006956544',
            'createUser': null,
            'createTime': '2018-11-17 21:47:05',
            'updateUser': null,
            'updateTime': '2018-11-17 21:47:53',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '添加字典',
            'path': '/ics/dict/add*',
            'component': '',
            'icon': '',
            'buttonType': 'add',
            'parentId': '75002207560273920',
            'description': '',
            'sortOrder': 1.81,
            'status': 0,
            'url': '',
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '76216071333351424',
            'createUser': null,
            'createTime': '2018-11-17 21:47:48',
            'updateUser': null,
            'updateTime': '2018-11-17 21:47:48',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '编辑字典',
            'path': '/ics/dict/edit*',
            'component': '',
            'icon': '',
            'buttonType': 'edit',
            'parentId': '75002207560273920',
            'description': null,
            'sortOrder': 1.82,
            'status': 0,
            'url': null,
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '76216264070008832',
            'createUser': null,
            'createTime': '2018-11-17 21:48:34',
            'updateUser': null,
            'updateTime': '2018-11-17 21:48:34',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '删除字典',
            'path': '/ics/dict/delByIds/**',
            'component': '',
            'icon': '',
            'buttonType': 'delete',
            'parentId': '75002207560273920',
            'description': null,
            'sortOrder': 1.83,
            'status': 0,
            'url': null,
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '76216459709124608',
            'createUser': null,
            'createTime': '2018-11-17 21:49:21',
            'updateUser': null,
            'updateTime': '2018-11-17 21:49:21',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '添加字典数据',
            'path': '/ics/dictData/add*',
            'component': '',
            'icon': '',
            'buttonType': 'add',
            'parentId': '75002207560273920',
            'description': null,
            'sortOrder': 1.84,
            'status': 0,
            'url': null,
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '76216594207870976',
            'createUser': null,
            'createTime': '2018-11-17 21:49:53',
            'updateUser': null,
            'updateTime': '2018-11-17 21:49:53',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '编辑字典数据',
            'path': '/ics/dictData/edit*',
            'component': '',
            'icon': '',
            'buttonType': 'edit',
            'parentId': '75002207560273920',
            'description': null,
            'sortOrder': 1.85,
            'status': 0,
            'url': null,
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }, {
            'id': '76216702639017984',
            'createUser': null,
            'createTime': '2018-11-17 21:50:18',
            'updateUser': null,
            'updateTime': '2018-11-17 21:50:18',
            'delFlag': 0,
            'name': '',
            'showAlways': true,
            'level': 3,
            'type': 1,
            'title': '删除字典数据',
            'path': '/ics/dictData/delByIds/**',
            'component': '',
            'icon': '',
            'buttonType': 'delete',
            'parentId': '75002207560273920',
            'description': null,
            'sortOrder': 1.86,
            'status': 0,
            'url': null,
            'isCustomize': 1,
            'children': null,
            'permTypes': null,
            'expand': true,
            'checked': false,
            'selected': false
          }],
          'permTypes': null,
          'expand': true,
          'checked': false,
          'selected': false
        }
        ],
        'permTypes': null,
        'expand': true,
        'checked': false,
        'selected': false
      }],
      'permTypes': null,
      'expand': true,
      'checked': false,
      'selected': false
    }]
  }
}
