<template>
  <div class="topic-video-player">
    <div v-if="selectedVideoLink" class="video-content">
      <div class="video-container">
        <iframe :src="selectedVideoLink" width="640" height="360" frameborder="0" allowfullscreen></iframe>
      </div>
      <h2 class="selected-subject">{{ selectedSubjectName }}</h2>
    </div>
    <div v-else class="centered-text">
      <h1>Es-Oi</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopicVideoPlayer',
  props: ['selectedVideoLink', 'selectedSubjectName'],
  methods: {
    // Add any methods related to the video player component if needed
  },
};
</script>

<style scoped>
.topic-video-player {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the start (left) */
  justify-content: flex-start; /* Align items to the start (top) */
  height: 100vh; /* Take up full height of the viewport */
}

.video-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the start (left) */
}

.centered-text {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
  height: 100%; /* Take up full height of the container */
}

.centered-text h1 {
  margin: 0; /* Remove default margin for h1 */
}

.video-container {
  margin-bottom: 20px;
}

.selected-subject {
  font-weight: bold;
  color: #333;
  margin-top: 10px; /* Add margin to separate from the video container */
}
</style>
