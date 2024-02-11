<template>
  <div class="whole-screen">
    <AppNavbar @subjectSelected="updateSelectedSubject" @toggle-topic-list="toggleTopicListVisibility" />

    <div class="under-nav">
      <div class="main-content">

        <TopicList 
          :subjectId="selectedSubjectId" 
          @topicSelected="playTopic" 
          v-if="topicListVisible && selectedSubjectId" 
        />

        <TopicVideoPlayer
          :selectedVideoLink="selectedVideoLink"
          :selectedSubjectName="selectedSubjectName"
        />

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
      topicListVisible: false,
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
    adjustTopicListVisibility() {
      if (window.innerWidth >= 768 || (window.innerHeight <= 575.98 && window.matchMedia("(orientation: landscape)").matches)) {
        this.topicListVisible = true;
      }
    },
    toggleTopicListVisibility() {
      this.topicListVisible = !this.topicListVisible;
    },
  },
  mounted() {
    this.adjustTopicListVisibility(); // Adjust visibility on mount
    window.addEventListener('resize', this.adjustTopicListVisibility); // Adjust visibility on window resize
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustTopicListVisibility); // Clean up event listener
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  color: black; 
  margin: 0%;
}

a {
  color: black;
  text-decoration: none; /* Remove the underline on links */
}

a:hover {
  color: #555;
}

.whole-screen {
  display: flex;
  flex-direction: column; /* Make the main container a column layout */
  height: 100vh; /* Set the height to 100% of the viewport */
}

.under-nav {
  display: flex;
  flex: 1; /* Take up all available space in the main container */
}

.topic-video-player {
  flex: 1;
}

.main-content {
  position: relative;
  display: flex;
  flex: 1; 
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {

}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {

}

@media only screen and (max-height: 575.98px) and (orientation: landscape) {

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {

}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {

}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {

}


</style>