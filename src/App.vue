<template>
  <div class="ics-webapp">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'WebApp'
}
</script>
<style lang="scss">
.ics-webapp,
body,
html {
  height: 100%;
}

body {
  background-color: #FFF;
  overflow: hidden;
  font-size: 14px;
}

html body ::-webkit-scrollbar {
    width: 8px;
    height: 8px
}

html body ::-webkit-scrollbar-thumb {
    background-color: rgba(144,147,153,.3);
    border: 3px solid transparent;
    border-radius: 7px;
}

html body ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(144,147,153,.5)
}
</style>
