<template>
  <div class="topic-screen">
    <AppNavbar @subjectSelected="updateSelectedSubject" />

    <div class="content-container">
      <div class="topic-content">
        <TopicVideoPlayer
          :selectedVideoLink="selectedVideoLink"
          :selectedSubjectName="selectedSubjectName"
        />

        <TopicList :subjectId="selectedSubjectId" @topicSelected="playTopic" v-if="selectedSubjectId" />
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue';
import TopicList from './components/TopicList.vue';
import TopicVideoPlayer from './components/TopicVideoPlayer.vue';
import apiService from '@/services/apiService'; // Adjust the import path as needed

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
      this.selectedVideoLink = null;
      this.selectedSubjectName = subjectName;
    },
    playTopic(topic) {
      this.selectedVideoLink = topic.link;
      this.selectedSubjectName = topic.title;
    },
    async fetchTopicDetails(topicId) {
      try {
        const response = await apiService.getTopic(topicId);
        this.selectedSubjectName = response.data.title;
        this.selectedVideoLink = response.data.link;
      } catch (error) {
        console.error('Error fetching topic details:', error);
      }
    },
  },
  watch: {
    $route(to) {
      this.selectedSubjectId = to.params.subjectId;
      this.fetchTopicDetails(to.params.topicId);
    },
  },
  beforeRouteUpdate(to, from, next) {
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

.topic-video-player {
  flex: 1; /* Take up all available space in the left */
  margin-right: 10px; /* Add some margin between TopicVideoPlayer and TopicList */
}

.topic-content {
  display: flex;
  flex: 1; /* Take up all available space in the content container */
}

.topic-list {
  background-color: #f0f0f0;
  width: 200px;
  height: 100%;
  overflow-y: auto;
  margin-left: auto; /* Push TopicList to the most right side */
}

/* Other styles remain unchanged */
</style>
