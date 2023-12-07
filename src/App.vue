<template>
  <div class="topic-screen">
    <AppNavbar @subjectSelected="updateSelectedSubject" />

    <div class="content-container">
      <router-view></router-view>

      <TopicList :subjectId="selectedSubjectId" @topicSelected="playTopic" v-if="selectedSubjectId" />

      <TopicVideoPlayer
        :selectedVideoLink="selectedVideoLink"
        :selectedSubjectName="selectedSubjectName"
        v-if="selectedVideoLink"
      />
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue';
import TopicList from './components/TopicList.vue';
import TopicVideoPlayer from './components/TopicVideoPlayer.vue';
import axios from 'axios';

export default {
  name: 'TopicScreen',
  components: {
    AppNavbar,
    TopicList,
    TopicVideoPlayer,
  },
  data() {
    return {
      selectedSubjectId: null,
      selectedVideoLink: null,
      selectedSubjectName: null,
    };
  },
  methods: {
    updateSelectedSubject(subjectId, subjectName) {
      this.selectedSubjectId = subjectId;
      this.selectedVideoLink = null; // Reset the selected video link when the subject changes
      this.selectedSubjectName = subjectName;
    },
    playTopic(topic) {
      this.selectedVideoLink = topic.link;
      this.selectedSubjectName = topic.title;
    },
    async fetchTopicDetails(topicId) {
      try {
        const response = await axios.get(`http://localhost:3001/topics/${topicId}`);
        const { name, link } = response.data;
        this.selectedSubjectName = name;
        this.selectedVideoLink = link;
      } catch (error) {
        console.error('Error fetching topic details:', error);
      }
    },
  },
  watch: {
    $route(to) {
      // Update selectedSubjectId and fetch topic details when the route changes
      this.selectedSubjectId = to.params.subjectId;
      this.fetchTopicDetails(to.params.topicId);
    },
  },
  beforeRouteUpdate(to, from, next) {
    // Ensure the route is updated before fetching topic details
    this.selectedSubjectId = to.params.subjectId;
    this.fetchTopicDetails(to.params.topicId);
    next();
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

.topic-screen {
  display: flex;
  flex-direction: column; /* Make the main container a column layout */
  height: 100vh; /* Set the height to 100% of the viewport */
  margin: 0 3%; /* Add 5% margin on both sides */
}

.content-container {
  display: flex;
  flex: 1; /* Take up all available space in the main container */
}

.topic-list {
  margin-left: auto; /* Push the topic list to the right */
  background-color: #f0f0f0;
  width: 200px;
  height: 100%;
  overflow-y: auto;
}

/* Other styles remain unchanged */
</style>
