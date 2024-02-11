<template>
  <div class="main-container">
    <div v-if="selectedVideoLink" class="main-container-child">
      <div class="video-and-title-container"> 
        <div class="video-container">
          <iframe :src="selectedVideoLink" width="640" height="360" frameborder="0" allowfullscreen></iframe>
        </div>
        <h2 class="title">{{ selectedSubjectName }}</h2>
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
h2 {
  display: block;
}
.main-container{
  width: 100%;
  padding: 24px 16px;
  box-sizing: border-box;
  max-height: calc(100vh - 50px);
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




/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {

}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {

}

@media only screen and (max-height: 575.98px) and (orientation: landscape) {
  .main-container{
    padding: 24px 30px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .main-container{
    padding: 24px 30px;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .main-container{
    max-height: calc(100vh - 70px);
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  
}


</style>
