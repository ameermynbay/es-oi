<template>
  <div class="main-container">
    <div v-if="selectedVideoLink" class="main-container-child">
      <div class="video-and-title-container"> 
        <div class="video-container">
          <iframe :src="selectedVideoLink" width="640" height="360" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class = "title-container">
          <span class="title">{{ selectedSubjectName }}</span>
        </div>
      </div>
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
.main-container{
  width: 100%;
  padding: 24px 16px;
  box-sizing: border-box;
  max-height: calc(100vh - 60px);
  overflow-y: auto;
}

.video-and-title-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.title-container {
  /* width: 100%; */
  padding: 16px 0;
}

.title-container span {
  display: block;
  font-size: 20px;
  font-weight: bold;
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .main-container{
    padding: 24px 48px;
  }
  .title-container span{
    font-size: 24px;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  
}


</style>
