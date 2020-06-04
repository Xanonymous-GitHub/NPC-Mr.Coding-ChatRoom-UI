import Vue from 'vue'
import axios from 'axios'
import { ChatRoomType, MessageType, UserType } from '~/store/types/appTypes'
import { ResponseErrorType } from '~/store/types/apiTypes'

axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

class API {
  static async getSpecifyChatRoomsData (chatRoomId: string): Promise<ChatRoomType | ResponseErrorType> {
    try {
      const { data } = await axios.get(`/chatrooms/${chatRoomId}`)
      return data
    } catch (e) {
      const status = e.response.status
      return { error: status }
    }
  }

  static async getAllChatRoomsData (jwtToken: string): Promise<Array<ChatRoomType> | ResponseErrorType> {
    try {
      const { data } = await axios.get('/chatrooms', {
        headers: {
          Authorization: 'bearer ' + jwtToken
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      return { error: status }
    }
  }

  static async createNewChatRoom (identify: string, uniqueToken: string): Promise<ChatRoomType | ResponseErrorType> {
    try {
      const { data } = await axios.post('/chatrooms', {
        identify
      }, {
        headers: {
          Authorization: uniqueToken
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      if (status === 400) {
        return { error: 'duplicate room id' + status }
      }
      return { error: status }
    }
  }

  static async setChatRoomLineAccessToken (chatRoomId: string, lineAccessToken: string, lineUserId: string): Promise<ChatRoomType | ResponseErrorType> {
    try {
      const { data } = await axios.patch(`/chatrooms/${chatRoomId}/lineAccessToken`, {
        lineAccessToken
      }, {
        headers: {
          Authorization: lineUserId
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      if (status === 404) {
        return { error: 'could not find the chatRoom' + status }
      }
      return { error: status }
    }
  }

  static async setChatRoomStatus (chatRoomId: string, closed: boolean, jwtToken: string): Promise<ChatRoomType | ResponseErrorType> {
    try {
      const { data } = await axios.patch(`/chatrooms/${chatRoomId}/closed`, {
        closed
      }, {
        headers: {
          Authorization: 'bearer ' + jwtToken
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      if (status === 404) {
        return { error: 'chatRoom not found' + status }
      }
      return { error: status }
    }
  }

  static async getHistoryMessages (chatRoomId: string, number: number, jwtToken: string, lineUserId: string, lastTime?: number): Promise<Array<MessageType> | ResponseErrorType> {
    try {
      const header: { Authorization?: string, userID?: string } = {}
      if (jwtToken) {
        header.Authorization = 'bearer ' + jwtToken
      } else if (lineUserId) {
        header.userID = lineUserId
      }
      const param: { number?: number, lastTime?: number } = {}
      param.number = number
      if (lastTime) {
        param.lastTime = lastTime
      }
      const { data } = await axios.get(`/chatrooms/${chatRoomId}/history`, {
        params: param,
        headers: header
      })
      return data
    } catch (e) {
      const status = e.response.status
      return { error: status }
    }
  }

  static async login (username: string, password: string): Promise<{ token: string } | ResponseErrorType> {
    try {
      const { data } = await axios.post('/auth', {
        username,
        password
      })
      return data
    } catch (e) {
      const status = e.response.status
      return { error: status }
    }
  }

  static async getSpecifyAdminData (UserId: string): Promise<UserType | ResponseErrorType> {
    try {
      const { data } = await axios.get(`/users/${UserId}`)
      return data
    } catch (e) {
      const status = e.response.status
      return { error: status }
    }
  }

  static async getAllAdminsData (jwtToken: string): Promise<Array<UserType> | ResponseErrorType> {
    try {
      const { data } = await axios.get('/users', {
        headers: {
          Authorization: 'bearer ' + jwtToken
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      return { error: status }
    }
  }

  static async setAdminInfo (userId: string, info: string, jwtToken: string): Promise<UserType | ResponseErrorType> {
    try {
      const { data } = await axios.patch(`/users/${userId}/info`, {
        info
      }, {
        headers: {
          Authorization: 'bearer ' + jwtToken
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      if (status === 400) {
        return { error: 'cross-user-access denied.' + status }
      }
      return { error: status }
    }
  }

  static async setAdminAvatar (userId: string, avatar: string, jwtToken: string): Promise<UserType | ResponseErrorType> {
    try {
      const { data } = await axios.patch(`/users/${userId}/avatar`, {
        avatar
      }, {
        headers: {
          authorization: 'bearer ' + jwtToken
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      if (status === 400) {
        return { error: 'cross-user-access denied.' + status }
      }
      return { error: status }
    }
  }

  static async setAdminValidation (userId: string, cc: string, jwtToken: string): Promise<UserType | ResponseErrorType> {
    try {
      const { data } = await axios.patch(`/users/${userId}/cc`, {
        cc
      }, {
        headers: {
          authorization: 'bearer ' + jwtToken
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      if (status === 400) {
        return { error: 'cross-user-access denied.' + status }
      }
      return { error: status }
    }
  }
}

Vue.prototype.$api = API
