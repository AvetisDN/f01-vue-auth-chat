<template>
  <div class="p-4 bg-light rounded shadow col-12 col-sm-8 col-md-5 col-lg-3 chat d-flex flex-column mt-3">
    <h5 class="fw-bolder text-black-50 mb-3" v-if="user">
      {{ user.displayName }}
    </h5>
    <div class="messages border rounded p-3 d-flex flex-column overflow-auto flex-grow-1">

      <div v-for="message in messages" :key="message.id" class="d-flex flex-column w-100">

        <div class="message rounded text-white p-3 shadow-sm position-relative mb-2"
          :class="{'bg-primary align-self-end': message.uid === user.uid,
            'bg-secondary': message.uid !== user.uid
          }"
        >
          <h6 class="fw-bold fst-italic mb-0">
            {{message.username}}
          </h6>
          <p class="my-2">
            {{message.text}}
          </p>
          <i class="small text-white-50 position-absolute message-time">
            {{new Date(message.timestamp).toLocaleTimeString('ru-RU')}}
          </i>
        </div>

      </div>

    </div>
    <div class="input-group my-3">
      <input type="text"
             class="form-control"
             v-model="newMessage">
      <button type="button"
              class="btn btn-success"
              @click="sendMessage"
      >
        <i class="bi bi-cursor-fill"></i>
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Chat",
  data() {
    return {
      user: null,
      newMessage: '',
      messages: []
    }
  },
  created() {
    firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (user) {
            this.user = user
          } else {
            this.user = null
            this.$router.push('/login')
          }
        })
  },
  mounted() {
    const messagesRef = firebase.database().ref('messages')
    messagesRef.on('value', snapshot => {
      let data = snapshot.val()
      let messagesTmp = []

      Object.keys(data).forEach((key => {
        messagesTmp.push({
          id: key,
          ...data[key]
        })
      }))
      this.messages = messagesTmp
    })
  },
  methods: {
    sendMessage() {
      const messageObj = {
        username: this.user.displayName,
        email: this.user.email,
        uid: this.user.uid,
        text: this.newMessage,
        timestamp: Date.now()
      }
      firebase
          .database()
          .ref('messages')
          .push(messageObj)
      this.newMessage = ''
    }
  }
}
</script>

<style scoped lang="scss">
.chat {
  height: 100vh;
  max-height: calc(100vh - 96px);

  .messages {
    background-color: #ddd;

    .message {
      width: 90%;

      &-time {
        display: block;
        bottom: .5rem;
        right: 1rem;
      }
    }
  }
}
</style>
