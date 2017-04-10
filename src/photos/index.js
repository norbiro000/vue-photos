/* eslint-disable */
import Vue from 'vue'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyAwPjmT2GTiCuZJF_92zwQmLwPSs2Xf1QE",
  databaseURL: "https://portfolio-e8b55.firebaseio.com/",
  storageBucket: "portfolio-e8b55.appspot.com"
})

const db = firebase.database()
var storageRef = firebase.storage().ref();

const files = db.ref("files/images")

export default Vue.extend({
  render: function (createElement) {
    return createElement(
      'div',
      {
        attrs: {
          class: 'fuck'
        },
      },
      [
        createElement (
          'input', {
            attrs: {
              type: 'file'
            },
            on: {
              change: this.onHit
            },
             slot: 'nameofslot'
          }, 'Photos'),
          createElement (
            'h1',
            this.progress + '%'
          )
      ]
    )
  },
  props: {
  },
  created () {
  },
  data () {
    return {
      pg: '0'
    }
  },
  computed: {
    progress () {
      return this.pg
    }
  },
  methods: {
    onHit (e) {
      var self = this
      var file = e.target.files[0]

      // Create file metadata including the content type
      var metadata = {
        contentType: 'image/jpeg',
      };

      // Upload the file and metadata
      var uploadTask = storageRef.child('images/' + file.name).put(file, metadata)
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function progress(snapshot) {
        var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        console.log(percent)
        self.pg = percent;
      })

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
        'complete': function() {
          alert('Upload complate')
        }
      })
    }
  }
})
