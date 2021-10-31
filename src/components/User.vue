<template lang="html">
  <div class="user">
    <img class="user__avatar" :src="data.picture.medium" />
    <div class="user__text">{{ `${data.name.first} ${data.name.last}` }}</div>
    <div class="user__text">{{ data.email }}</div>
    <div class="user__text">{{ timeLeft }}</div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'
  import utc from 'dayjs/plugin/utc'
  import relativeTime from 'dayjs/plugin/relativeTime'
  
  dayjs.extend(utc)
  dayjs.extend(duration)
  dayjs.extend(relativeTime)
  
  @Component
  export default class User extends Vue {
    @Prop() private data!: Record<string, any>;
    
    get timeLeft () {
      const now = dayjs.utc()
      const dataTime = dayjs(this.data.registered.date, 'YYYY-MM-DDTHH:MM:SS')

      return dayjs.duration(now.diff(dataTime)).humanize()
      // const timeDiff = now.diff(dataTime)

      // console.log(now, timeDiff, dayjs.duration(1, 'minute').milliseconds())

      // if (timeDiff < dayjs.duration(1, 'minute').milliseconds()) {
      //   return 'just now'
      // }

      // if (timeDiff < dayjs.duration(1, 'hour').milliseconds()) {
      //   return `${dayjs(timeDiff).minute()}m ago`
      // }

      // if (dataTime.date() === now.date()) {
      //   return `${dayjs(timeDiff).hour()}h ago`
      // }
    }
  }

</script>

<style lang="scss" scoped>
  .user {
    position: relative;
    display: flex;
    max-width: 1000px;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 50px 20px 70px;

    &__avatar {
      position: relative;
      width: 48px;
      height: 48px;
      border-radius: 48px;
    }

    &__text {
      font-family: Open Sans;
      font-size: 20px;
      line-height: 24px;
    }
  }
</style>