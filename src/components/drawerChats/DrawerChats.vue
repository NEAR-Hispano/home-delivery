<template>
  <section id="drawerChats">
    <v-badge
      v-if="!$store.state.drawerChats"
      :content="messagesBadge"
      :value="messagesBadge"
      color="red"
      class="floatingButton"
      overlap
    >
      <v-btn icon @click="openDrawer()">
        <v-icon color="#FFFFFF !important">mdi-chat</v-icon>
      </v-btn>
    </v-badge>

    <v-navigation-drawer
      v-model="$store.state.drawerChats"
      right
      fixed
      temporary
      width="max-content"
      height="100vh"
      hide-overlay
    >
      <section class="contPedidos divcol acenter">
        <!-- caja de pedidos -->
        <h3 class="h10_em tcenter">{{$t('pedidosPendientes')}}</h3>
      </section>

      <chat-window
        ref="noir"
        :current-user-id="currentUserId"
        :rooms="rooms"
        :rooms-loaded="roomsLoaded"
        :loading-rooms="loadingRooms"
        :messages="messages"
        :messages-loaded="messagesLoaded"
        @fetch-messages="fetchMessages($event)"
        @room-action-handler="test($event)"
        :show-audio="false"
        :show-files="false"
        :width="'max-content'"
        :responsive-breakpoint="3000"
        @send-message="handleMessage"
      />
    </v-navigation-drawer>
  </section>
</template>

<script>
import ChatWindow from 'vue-advanced-chat'
import { MESSAGES, CHATS } from '@/services/api.js'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'
export default {
  name: "drawerChats",
  components: { ChatWindow },
  i18n: require("./i18n"),
  data() {
    return {
      messagesBadge: 1,
      currentUserId: '',
      // Chats
      loadingRooms: false,
      roomsLoaded: true,
      rooms: [],
      esperando: false,
      rooms_b: [
        {
          roomId: 1,
          roomName: "Room 1",
          avatar: "assets/imgs/people.png",
          unreadCount: 4,
          index: 3,
          lastMessage: {
            content: "Last message received",
            senderId: 1234,
            username: "John Doe",
            timestamp: "10:20",
            saved: true,
            distributed: false,
            seen: false,
            new: true,
          },
          users: [
            {
              _id: 1,
              username: "John Doe",
              avatar: "assets/imgs/doe.png",
              status: {
                state: "online",
                lastChanged: "today, 14:30",
              },
            },
            {
              _id: 2,
              username: "John Snow",
              avatar: "assets/imgs/snow.png",
              status: {
                state: "offline",
                lastChanged: "14 July, 20:00",
              },
            },
          ],
          typingUsers: [4321],
        },
      ],
      // Mensajes
      messagesLoaded: false,
      messages: [],
      intervalo: null,
      room_id: null,
    }
  },
  mounted () {
    this.currentUserId = 1
    this.messagesLoaded = false
    this.initChatComponent()
  },
  methods: {
    openDrawer () {
      this.$store.dispatch('DrawerChats', {key: 'open'})
      this.fetchChats(localStorage.getItem('profileid'))
    },
    initChatComponent(){
      this.fetchChats(localStorage.getItem('profileid'))
      // this.intervalo = setInterval(()=>{
      //   if (this.esperando !== true) {
      //     console.log('fetchChats')
      //   }
      // },3000)
    },
    handleChats(){
      this.axios.post(CHATS).then((res) => {
        if (res.status !== 201) {
          console.log(res)
        }
      }).catch((e)=>console.log(e))
    },
    fetchChats(e) {
      this.esperando = true
      this.roomsLoaded = true
      // vue-advanced-chat component is performance oriented, hence you have to follow specific rules to make it work properly
      const habs = []; // El componente necesita igualar un array lleno con la variable de las rooms
      this.axios.get(CHATS+'?id='+e+'&').then((res) => {
        res.data.forEach((element) => {
          habs.push(element);
        })
        this.rooms = habs
        this.esperando = false
        this.roomsLoaded = false
      }).catch((e)=>console.log(e))
    },
    handleMessage(data){
      this.esperando = true
      var msgs = this.messages
      this.axios.post(MESSAGES,{content:data.content,replyMessage:data.replyMessage,roomId:data.roomId,usuario:localStorage.getItem('profileid')}).then((res) => {
        console.log(res)
        if (res.status !== 201) {
          console.log(res)
        } else {
          msgs.push(res.data)
          this.messages = msgs
          this.esperando = false
        }
      }).catch((e)=>console.log(e))
    },
    fetchMessages(data) {
      console.log(data)
      var msgs = []
      this.axios.get(MESSAGES+'?chat='+data.room.roomId+'&').then((res) => {
        res.data.forEach((element) => {
          msgs.push(element);
        });
        this.esperando = false
        this.messages = msgs
        this.messagesLoaded = true
      })
    },
    // onFetchMessages() {
    //   this.axios.get(MESSAGES).then((res) => {
    //     this.messages = res.data
    //     this.messagesLoaded = true;
    //   })
    // },
  },
};
</script>

<style src="./DrawerChats.scss" lang="scss" />
