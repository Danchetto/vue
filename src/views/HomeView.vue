
<template>
  <div class="home">
    <div class="banner">
      <div class="banner__title">Left until the draw</div>
      <div class="banner__value">{{ leftTimeValue }}</div>
    </div>
    <div class="header">
      <span class="header__text">Participant</span>
      <span class="header__text">work email</span>
      <span class="header__text">signed up</span>
    </div>
    <div v-for="user in visibleUsers" :key="user.id">
      <user :data="user" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'
  import utc from 'dayjs/plugin/utc'
  import relativeTime from 'dayjs/plugin/relativeTime'

  import User from '@/components/User.vue'

  import { namespace } from 'vuex-class'
  dayjs.extend(utc)
  dayjs.extend(duration)
  dayjs.extend(relativeTime)

  const users = namespace('UsersModule')

  @Component({
    name: 'HomeView',
    components: {
      User,
    },
  })

  export default class HomeView extends Vue {
    public leftTimeValue: string = dayjs().format('HH MM ss')

    @users.State
    public allUsers!: Record<string, any>

    @users.State
    public visibleCount!: number

    get visibleUsers () {
      return this.allUsers.slice(0, this.visibleCount)
    }

    @users.Action
    public loadUsers!: () => void

    @users.Action
    public addVisible!: () => void

    created() {
      this.loadUsers()
    }

    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(
          window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop
        )+ window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow && this.visibleCount < this.allUsers.length) {
          setTimeout(() => this.addVisible(), 500)
        }
      }
    }

    timer() {
      setInterval(() => {
        const endOfDay = dayjs().endOf('day')
        console.log(endOfDay)
        const timeDiff = dayjs.duration(dayjs().diff(endOfDay)).humanize()
        console.log(timeDiff)
        this.leftTimeValue = timeDiff
      }, 3000)
    }

    mounted() {
      this.scroll()
      this.timer()
    }
  }
</script>

<style lang="scss" scoped>
  .banner {
    background: #F3F3F3;
    border-radius: 24px;
    padding: 28px 68px;
    font-weight: 600;
    color: black;
    max-width: 1000px;
    margin: 0 auto 50px;

    &__title {
    font-size: 12px;
    line-height: 24px;
    }

    &__value {
      font-size: 56px;
      line-height: 80px;
    }
  }

  .header {
    position: relative;
    display: flex;
    max-width: 1000px;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    // padding: 50px 20px 70px;

    &__text {
      font-family: Open Sans;
      font-size: 12px;
      line-height: 24px;
      color: #808080;
    }
  }
</style>