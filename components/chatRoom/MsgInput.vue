<template>
  <v-text-field
    v-model="textContent"
    class="msg-input"
    dense
    filled
    hide-details
    no-resize
    placeholder="Put Some Messages"
    rounded
    @keypress.enter.exact.prevent="sendMessage"
  >
    <template #prepend-inner>
      <v-icon>mdi-message-reply-text</v-icon>
    </template>
    <template #append-outer>
      <v-btn fab icon small @click.prevent="sendMessage">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </template>
    <template #prepend>
      <v-btn fab icon small>
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { Component, Provide, Vue, Emit, Prop } from 'nuxt-property-decorator'

  @Component
export default class MsgInput extends Vue {
    @Provide()
    private textContent = ''

    @Prop({ required: true })
    private currentChatRoomId!: string

    @Emit('scrollMsgAreaToEnd')
    @Emit('sendNewMsg')
    private sendMessage () {
      const textContext = this.textContent.trim()
      this.textContent = ''
      return textContext
    }
}
</script>
