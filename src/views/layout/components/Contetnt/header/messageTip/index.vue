<template>
  <Dropdown>
    <div class="message-con">
      <Badge :count="value" dot>
        <Icon type="ios-notifications-outline" :size="24" />
      </Badge>
    </div>
    <DropdownMenu slot="list">
      <div class="notice">
        <div class="notice-wrap">
          <Tabs value="name1">
            <TabPane label="通知" name="name1">
              <ul class="notice-list-items">
                <li class="notice-list-item ">
                  <div class="notice-list-item-meta">
                    <div class="notice-list-item-meta-avatar">
                      <span class="notice-avatar">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"></span>
                    </div>
                    <div class="notice-list-item-meta-content">
                      <h4 class="notice-list-item-meta-title">
                        <div class="notice-list-title">你收到了 14 份新周报
                          <div class="notice-list-extra">&nbsp;</div>
                        </div>
                      </h4>
                      <div class="notice-list-item-meta-description">
                        <div>
                          <div class="notice-list-description">&nbsp;</div>
                          <div class="notice-list-datetime">1 小时前</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="notice-list-item ">
                  <div class="notice-list-item-meta">
                    <div class="notice-list-item-meta-avatar">
                      <span class="notice-avatar">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"></span>
                    </div>
                    <div class="notice-list-item-meta-content">
                      <h4 class="notice-list-item-meta-title">
                        <div class="notice-list-title">收到给你推荐的电影
                          <div class="notice-list-extra">&nbsp;</div>
                        </div>
                      </h4>
                      <div class="notice-list-item-meta-description">
                        <div>
                          <div class="notice-list-description">&nbsp;</div>
                          <div class="notice-list-datetime">2 小时前</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="notice-list-item  notice-list-read">
                  <div class="notice-list-item-meta ">
                    <div class="notice-list-item-meta-avatar">
                      <span class="notice-avatar">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"></span>
                    </div>
                    <div class="notice-list-item-meta-content">
                      <h4 class="notice-list-item-meta-title">
                        <div class="notice-list-title">任务成功5条,失败2条
                          <div class="notice-list-extra">&nbsp;</div>
                        </div>
                      </h4>
                      <div class="notice-list-item-meta-description">
                        <div>
                          <div class="notice-list-description">&nbsp;</div>
                          <div class="notice-list-datetime">5 小时前</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="notice-list-item ">
                  <div class="notice-list-item-meta ">
                    <div class="notice-list-item-meta-avatar">
                      <span class="notice-avatar">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png"></span>
                    </div>
                    <div class="notice-list-item-meta-content">
                      <h4 class="notice-list-item-meta-title">
                        <div class="notice-list-title">收藏夹中的电影已经更新
                          <div class="notice-list-extra">&nbsp;</div>
                        </div>
                      </h4>
                      <div class="notice-list-item-meta-description">
                        <div>
                          <div class="notice-list-description">&nbsp;</div>
                          <div class="notice-list-datetime">6 小时前</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="notice-list-item ">
                  <div class="notice-list-item-meta ">
                    <div class="notice-list-item-meta-avatar">
                      <span class="notice-avatar">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"></span>
                    </div>
                    <div class="notice-list-item-meta-content">
                      <h4 class="notice-list-item-meta-title">
                        <div class="notice-list-title">通知,你的任务已经部署完成
                          <div class="notice-list-extra">&nbsp;</div>
                        </div>
                      </h4>
                      <div class="notice-list-item-meta-description">
                        <div>
                          <div class="notice-list-description">&nbsp;</div>
                          <div class="notice-list-datetime">8 小时前</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </TabPane>
            <TabPane label="待办" name="name2">
              <ul class="notice-list-items">
                <li class="notice-list-item ">
                  <div class="notice-list-item-meta notice-list-meta">
                    <div class="notice-list-item-meta-content">
                      <h4 class="notice-list-item-meta-title">
                        <div class="notice-list-title">任务名称ABC
                          <div class="notice-list-extra">
                            <Tag color="default">未开始</Tag>
                          </div>
                        </div>
                      </h4>
                      <div class="notice-list-item-meta-description">
                        <div>
                          <div class="notice-list-description">任务需要在 2020-07-12 20:00 前启动</div>
                          <div class="notice-list-datetime">&nbsp;</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="notice-list-item ">
                  <div class="notice-list-item-meta notice-list-meta">
                    <div class="notice-list-item-meta-content">
                      <h4 class="notice-list-item-meta-title">
                        <div class="notice-list-title">采集紧急任务变更
                          <div class="notice-list-extra">
                            <Tag color="magenta">马上到期</Tag>
                          </div>
                        </div>
                      </h4>
                      <div class="notice-list-item-meta-description">
                        <div>
                          <div class="notice-list-description">提交于 2020-07-06，需在 2020-07-07 前完成变更任务</div>
                          <div class="notice-list-datetime">&nbsp;</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="notice-list-item ">
                  <div class="notice-list-item-meta notice-list-meta">
                    <div class="notice-list-item-meta-content">
                      <h4 class="notice-list-item-meta-title">
                        <div class="notice-list-title">信息安全漏洞测试
                          <div class="notice-list-extra">
                            <Tag color="yellow">已耗时 8 天</Tag>
                          </div>
                        </div>
                      </h4>
                      <div class="notice-list-item-meta-description">
                        <div>
                          <div class="notice-list-description">指Admin于 2020-06-09 前完成更新并发布</div>
                          <div class="notice-list-datetime">&nbsp;</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="notice-list-item ">
                  <div class="notice-list-item-meta notice-list-meta">
                    <div class="notice-list-item-meta-content">
                      <h4 class="notice-list-item-meta-title">
                        <div class="notice-list-title">采集任务发布
                          <div class="notice-list-extra">
                            <Tag color="blue">进行中</Tag>
                          </div>
                        </div>
                      </h4>
                      <div class="notice-list-item-meta-description">
                        <div>
                          <div class="notice-list-description">LiuFch提交于 2020-06-06，需在 2020-06-07 前完成变更任务</div>
                          <div class="notice-list-datetime">&nbsp;</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </TabPane>
          </Tabs>
          <div class="notice-list-bottomBar">
            <div>清空 通知</div>
            <div>查看更多</div>
          </div>
        </div>
      </div>
    </DropdownMenu>
  </Dropdown>

</template>
<style lang="scss" scoped>
.notice {
  width: 336px;
  background: #fff;

  .notice-wrap {
    .ivu-tabs-bar {
      padding: 0 18px;
    }

    .notice-list-items {
      margin: 0;
      padding: 0;
      list-style: none;
      max-height: 346px;
      overflow: auto;

      .notice-list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0;
        color: rgba(0, 0, 0, 0.85);
        padding-right: 24px;
        padding-left: 24px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: #e6f7ff;
        }

        .notice-list-item-meta {
          display: flex;
          flex: 1 1;
          align-items: flex-start;
          max-width: 100%;
        }
        .notice-list-item-meta-avatar {
          margin-right: 16px;

          .notice-avatar {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            color: rgba(0, 0, 0, 0.85);
            font-size: 14px;
            font-variant: tabular-nums;
            line-height: 1.5715;
            list-style: none;
            font-feature-settings: "tnum", "tnum";
            position: relative;
            display: inline-block;
            overflow: hidden;
            color: #fff;
            white-space: nowrap;
            text-align: center;
            vertical-align: middle;
            width: 32px;
            height: 32px;
            line-height: 32px;
            border-radius: 50%;

            & > img {
              display: block;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }

        .notice-list-item-meta-content {
          flex: 1 0;
          width: 0;
          color: rgba(0, 0, 0, 0.85);

          .notice-list-item-meta-title {
            margin-bottom: 4px;
            color: rgba(0, 0, 0, 0.85);
            font-size: 14px;
            line-height: 1.5715;
            font-weight: 500;

            .notice-list-extra {
              float: right;
              margin-top: -1.5px;
              margin-right: 0;
              color: rgba(0, 0, 0, 0.45);
              font-weight: 400;
            }

            & > a {
              color: rgba(0, 0, 0, 0.85);
              transition: all 0.3s;
            }

            & > a:hover {
              color: #1890ff;
            }
          }

          .notice-list-item-meta-description {
            color: rgba(0, 0, 0, 0.45);
            font-size: 12px;
            line-height: 1.5715;
          }
        }
      }
    }

    .notice-list-bottomBar {
      height: 46px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 46px;
      text-align: center;
      border-top: 1px solid #f0f0f0;
      border-radius: 0 0 2px 2px;
      transition: all 0.3s;
      & div {
        display: inline-block;
        width: 50%;
        cursor: pointer;
        transition: all 0.3s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      & div:only-child {
        width: 100%;
      }

      & div:not(:only-child):last-child {
        border-left: 1px solid #f0f0f0;
      }
    }
  }
}
</style>
<script>
export default {
  name: 'MessageTip',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  methods: {
    showMessage() {
    }
  }
}
</script>
