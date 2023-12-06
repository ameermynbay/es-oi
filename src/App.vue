<template>
  <div id="app">
    <AppNavbar @subjectSelected="updateSelectedSubject" />

    <div class="content-container">
      <router-view></router-view>
      
      <TopicList :subjectId="selectedSubjectId" @videoSelected="playVideo" v-if="selectedSubjectId" />

      <div v-if="selectedVideoLink" class="video-container">
        <iframe :src="selectedVideoLink" width="640" height="360" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue';
import TopicList from './components/TopicList.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    TopicList,
  },
  data() {
    return {
      selectedSubjectId: null,
      selectedVideoLink: null,
    };
  },
  methods: {
    updateSelectedSubject(subjectId) {
      this.selectedSubjectId = subjectId;
      this.selectedVideoLink = null; // Reset the selected video link when the subject changes
    },
    playVideo(videoLink) {
      this.selectedVideoLink = videoLink;
    },
  },
};
</script>

<style>
/* Import the Roboto font from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

/* Apply the Roboto font to the entire application */
body {
  font-family: 'Roboto', sans-serif;
  color: black; /* Set the default text color */
  margin: 0%;
}

a {
  color: black; /* Set the link color */
  text-decoration: none; /* Remove the underline on links */
}

a:hover {
  color: #555; /* Change the link color on hover if desired */
}

#app {
  display: flex;
  flex-direction: column; /* Make the main container a column layout */
  height: 100vh; /* Set the height to 100% of the viewport */
  margin: 0 3%; /* Add 5% margin on both sides */
}

.content-container {
  display: flex;
  flex: 1; /* Take up all available space in the main container */
}

/* Additional styling for TopicList and Video containers if needed */
.topic-list {
  margin-left: auto; /* Push the topic list to the right */
  padding: 20px;
  background-color: #f0f0f0;
  width: 200px;
  height: 100%;
  overflow-y: auto;
}

/* Other styles remain unchanged */


.video-container {
  flex: 1; /* Take up remaining space */
}
</style>