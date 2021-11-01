
<template>
  <div class="home">
    <div class="banner">
      <div class="banner__title">Left until the draw</div>
      <div class="banner__value">{{ timeLeftValue }}</div>
    </div>
    <div class="header">
      <div class="header__content">
        <span class="header__text">Participant</span>
        <span class="header__text">work email</span>
        <span class="header__text">signed up</span>
      </div>
    </div>
    <div v-for="user in visibleUsers" :key="user.login.uuid">
      <user :data="user" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'
  import relativeTime from 'dayjs/plugin/relativeTime'

  import User from '@/components/User.vue'

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
    public timeLeftValue: string = this.getTimeToEndOdTheDay()

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

    getTimeToEndOdTheDay() {
      const endOfDay = dayjs().endOf('day')
      return dayjs.duration(endOfDay.diff(dayjs())).format('H[H] m[M] s[S]')
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
        this.timeLeftValue = this.getTimeToEndOdTheDay()
      }, 1000)
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
    margin: 60px auto 50px;

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
    max-width: 1000px;
    margin: 0 auto;

    &__content {
      display: flex;
      margin-left: 68px;
    }

    &__text {
      min-width: calc(100% / 3);
      max-width: calc(100% / 3);
      font-size: 12px;
      line-height: 24px;
      color: #808080;
      align-self: center;

      &:last-child {
        padding-left: 100px;
      }
    }
  }
</style>