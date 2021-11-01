<template lang="html">
  <div class="user">
    <img class="user__avatar" :src="data.picture.medium" />
    <div class="user__content">
      <span class="user__text">{{ `${data.name.first} ${data.name.last}` }}</span>
      <span class="user__text">{{ data.email }}</span>
      <span class="user__text">{{ timeLeftValue }}</span>
    </div>
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
    public timeLeftValue: string = this.getTimeLeft()
    
    getTimeLeft () {
      const now = dayjs.utc()
      const dataTime = dayjs(this.data.registered.date, 'YYYY-MM-DDTHH:mm:ss')

      const timeDiff = now.diff(dataTime)

      // Меньше минуты
      if (timeDiff < dayjs.duration(1, 'minutes').asMilliseconds()) {
        return 'just now'
      }

      // Меньше часа
      if (timeDiff < dayjs.duration(1, 'hours').asMilliseconds()) {
        return `${dayjs.duration(timeDiff).format('m')}m ago`
      }

      // Сегодня
      if (dataTime.valueOf() >= now.startOf('day').valueOf()) {
        return `${dayjs.duration(timeDiff).format('H')}h ago`
      }

      // Вчера
      if (dataTime.valueOf() >= dayjs().add(-1, 'days').startOf('day').valueOf()) {
        return 'yesterday'
      }

      // В этом году
      if (dataTime.valueOf() >= now.startOf('year').valueOf()) {
        return dataTime.format('D MMM')
      }

      // Не в этом году
      if (dataTime.valueOf() < now.startOf('year').valueOf()) {
        return dataTime.format('D MMM YYYY')
      }

      return ''
    }

    mounted() {
      setInterval(() => {
        this.timeLeftValue = this.getTimeLeft()
      }, 60 * 1000)
    }
  }

</script>

<style lang="scss" scoped>
  .user {
    position: relative;
    display: flex;
    max-width: 1000px;
    align-items: center;
    margin: 0 auto;
    padding: 50px 0 70px;

    &__avatar {
      position: relative;
      width: 48px;
      height: 48px;
      border-radius: 48px;
      margin-right: 20px;
    }

    &__content {
      display: flex;
      width: 100%;
    }

    &__text {
      min-width: calc(100% / 3);
      max-width: calc(100% / 3);
      font-size: 20px;
      line-height: 24px;

      &:last-child {
        padding-left: 100px;
      }
    }
  }
</style>