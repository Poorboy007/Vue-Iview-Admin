<template>
  <div class="tags-panel">
    <div ref="scrollCon" class="tags-outer-scroll" @scroll="handlescroll" @mousewheel="handlescroll">
      <div ref="closeAllTag" class="close-all-tag">
        <Dropdown transfer @on-click="handleTagsOption">
          <Button size="small" type="primary">
            <div class="all-tag-btn-big">
              标签选项
              <Icon type="md-arrow-dropdown" />
            </div>

            <div class="all-tag-btn-min">
              <Icon type="logo-buffer" />
            </div>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="clearAll">
              关闭全部
            </DropdownItem>
            <DropdownItem name="clearOthers">
              关闭其他
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <span :class="[prefixCls + '-nav-prev', scrollable ? '' : prefixCls + '-nav-scroll-disabled']" @click="scrollPrev">
        <Icon type="ios-arrow-back"></Icon>
      </span>
      <div ref="scrollBody" class="tags-inner-scroll-body" :class="[scrollable ? '' : 'no-scroll-arrow']" :style="{left: tagBodyLeft + 'px'}">
        <transition-group name="taglist-moving-animation">
          <Tag v-for="item in pageTagsList" ref="tagsPageOpened" :key="item.name" type="dot" :name="item.name"
               :closable="!item.isHome" :color="item.name === currentPageName ? 'primary' : 'default'" @on-close="closePage"
               @click.native="linkTo(item)">
            {{ item.title }}
          </Tag>
        </transition-group>
      </div>
      <span :class="[prefixCls + '-nav-next', scrollable ? '' : prefixCls + '-nav-scroll-disabled']" @click="scrollNext">
        <Icon type="ios-arrow-forward"></Icon>
      </span>
    </div>
  </div>
</template>

<script>
import * as Auth from '@/libs/auth'
export default {
  name: 'TagsPage',
  props: {
    pageTagsList: {
      type: Array,
      default: () => {
        return []
      }
    },
    beforePush: {
      type: Function,
      default: item => {
        return true
      }
    }
  },
  data() {
    return {
      currentPageName: this.$route.name,
      tagBodyLeft: 0,
      refsTag: [],
      tagsCount: 0,
      scrollable: false,
      prefixCls: 'ivu-tabs',
      allTagBtnWidth: 100
    }
  },
  computed: {
    title() {
      return this.$store.state.app.currentTitle
    },
    tagsList() {
      return []
      // return this.$store.state.app.pageOpenedList
    }
  },
  watch: {
    $route(to) {
      this.currentPageName = to.name
      this.$nextTick(() => {
        this.refsTag.forEach((item, index) => {
          if (to.name === item.name) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
      this.tagsCount = this.tagsList.length
    }
  },
  mounted() {
    this.allTagBtnWidth = this.$refs.closeAllTag.offsetWidth + 13
    this.refsTag = this.$refs.tagsPageOpened
    if (typeof this.refsTag === 'undefined') {
      return false
    }
    setTimeout(() => {
      this.refsTag.forEach((item, index) => {
        if (this.$route.name === item.name) {
          let tag = this.refsTag[index].$el
          this.moveToView(tag)
        }
      })
    }, 1) // 这里不设定时器就会有偏移bug
    this.tagsCount = this.tagsList.length

    window.onresize = () => {
      return (() => {
        this.scrollable = this.$refs.scrollCon.offsetWidth - this.allTagBtnWidth < this.$refs.scrollBody.offsetWidth
      })()
    }
  },
  methods: {
    scrollPrev() {
      let left = Math.min(0, this.tagBodyLeft + 40)
      this.tagBodyLeft = left
    },
    scrollNext() {
      if (!(this.$refs.scrollCon.offsetWidth < this.$refs.scrollBody.offsetWidth + this.$refs.scrollBody.offsetLeft + 10)) {
        return false
      }
      let left = Math.min(0, this.tagBodyLeft - 40)
      this.tagBodyLeft = left
    },
    closePage(event, name) {
      let pageOpenedList = this.$store.state.app.pageOpenedList
      let lastPageObj = pageOpenedList[0]
      if (this.currentPageName === name) {
        let len = pageOpenedList.length
        for (let i = 1; i < len; i++) {
          if (pageOpenedList[i].name === name) {
            if (i < len - 1) {
              lastPageObj = pageOpenedList[i + 1]
            } else {
              lastPageObj = pageOpenedList[i - 1]
            }
            break
          }
        }
      } else {
        let tagWidth = event.target.parentNode.offsetWidth
        this.tagBodyLeft = Math.min(this.tagBodyLeft + tagWidth, 0)
      }
      this.$store.commit('REMOVE_TAG', name)
      this.$store.commit('CLOSE_PAGE', name)
      pageOpenedList = this.$store.state.app.pageOpenedList
      Auth.setPageOpenedList(JSON.stringify(pageOpenedList))
      if (this.currentPageName === name) {
        this.linkTo(lastPageObj)
      }
    },
    linkTo(item) {
      let routerObj = {}
      routerObj.name = item.name
      if (item.argu) {
        routerObj.params = item.argu
      }
      if (item.query) {
        routerObj.query = item.query
      }
      if (this.beforePush(item)) {
        this.$router.push(routerObj)
      }
    },
    handlescroll(e) {
      console.log(e)
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
      }
      let left = 0
      if (delta > 0) {
        left = Math.min(0, this.tagBodyLeft + delta)
      } else {
        if (
          this.$refs.scrollCon.offsetWidth - this.allTagBtnWidth <
          this.$refs.scrollBody.offsetWidth
        ) {
          if (
            this.tagBodyLeft <
            -(
              this.$refs.scrollBody.offsetWidth -
              this.$refs.scrollCon.offsetWidth +
              this.allTagBtnWidth
            )
          ) {
            left = this.tagBodyLeft
          } else {
            left = Math.max(
              this.tagBodyLeft + delta,
              this.$refs.scrollCon.offsetWidth -
              this.$refs.scrollBody.offsetWidth -
              this.allTagBtnWidth
            )
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
      this.tagBodyLeft = left
    },
    handleTagsOption(type) {
      let pageList = this.$store.state.app.pageOpenedList
      let homePage = pageList.filter(item => item.isHome)
      if (type === 'clearAll') {
        this.$store.commit('CLEAR_ALL_TAGS')
        this.$router.push({
          path: homePage[0].path
        })
      } else {
        this.$store.commit('CLEAR_OTHER_TAGS', this)
      }
      this.tagBodyLeft = 0
    },
    moveToView(tag) {
      this.scrollable = this.$refs.scrollCon.offsetWidth - this.allTagBtnWidth < this.$refs.scrollBody.offsetWidth
      if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + 10
      } else if (
        tag.offsetLeft + 10 > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth <
        -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - this.allTagBtnWidth
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          this.$refs.scrollCon.offsetWidth -
          100 -
          tag.offsetWidth -
          tag.offsetLeft -
          20
        )
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (this.$refs.scrollCon.offsetWidth - this.allTagBtnWidth - tag.offsetWidth) +
          20
        )
      }
    }
  }
}
</script>
