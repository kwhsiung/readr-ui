<template>
  <li class="list-item">
    <a class="list-item-wrapper" :href="link" target="_blank">
      <img class="list-item-wrapper__img" :src="imgUrl" alt="" />
      <h1 class="list-item-wrapper__title" v-text="title" />
    </a>
  </li>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '...'
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-item-wrapper
  display flex
  text-decoration none
  &__img
    min-width 127.672px
    max-width 127.672px
    min-height 85.1094px
    max-height 85.1094px
    background-color gray
    object-fit cover
  &__title
    margin 0 0 0 14px
    font-size 16px
    font-weight 400
    color #797979
</style>
