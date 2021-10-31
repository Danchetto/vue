import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import dayjs from 'dayjs'
import _sortBy from 'lodash/sortBy'

import { getUsers } from '../../services/users'

@Module({ namespaced: true })
class UsersModule extends VuexModule {
  public allUsers: Record<string, any>[] = []
  public visibleCount: number = 20

  
  @Mutation
  public setUsers(users: Record<string, any>[]): void {
    this.allUsers = users
  }

  @Mutation
  public setVisibleCount(count: number): void {
    this.visibleCount += count
  }
  
  @Action({ rawError: true })
  public async loadUsers(): Promise<void> {
    const newUsers = await getUsers()
    this.context.commit('setUsers', _sortBy(newUsers, (user: Record<string, any>) => -dayjs(user.registered.date, 'YYYY-MM-DDTHH:MM:SS').valueOf()))
  }

  @Action({ rawError: true })
  public async addVisible(): Promise<void> {
    this.context.commit('setVisibleCount', 20)
  }
}

export default UsersModule
