<template>
    <div class="topic-video-player">
      <div class="video-container">
        <iframe :src="selectedVideoLink" width="640" height="360" frameborder="0" allowfullscreen></iframe>
      </div>
      <h2 class="selected-subject">{{ selectedSubjectName }}</h2>
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
    align-items: center;
  }
  
  .video-container {
    margin-bottom: 20px;
  }
  
  .selected-subject {
    font-weight: bold;
    color: #333;
  }
  
  h2 {
    margin-top: 10px; /* Add margin to separate from the video container */
  }
  </style>
  