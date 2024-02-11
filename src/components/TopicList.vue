<template>
  <div class="list-container">
    <span>Topics</span>
    <ul>
      <li v-for="topic in topics" :key="topic.id" @click="selectTopic(topic)" :class="{ 'selected': topic === selectedTopic }">
        {{ topic.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import apiService from '@/services/apiService'; // Adjust the import path as needed

export default {
  name: 'TopicList',
  props: ['subjectId'],
  data() {
    return {
      topics: [],
      selectedTopic: null,
    };
  },
  watch: {
    subjectId: {
      handler(newSubjectId) {
        this.fetchTopics(newSubjectId);
      },
      immediate: true,
    },
  },
  methods: {
    async fetchTopics(subjectId) {
      try {
        const response = await apiService.getTopicsBySubject(subjectId);
        this.topics = response.data;
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    },
    selectTopic(topic) {
      this.selectedTopic = topic;
      this.$emit('topicSelected', topic);
    },
  },
};
</script>

<style>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

span {
  display: inline-block;
  margin-top: 22px;
  margin-bottom: 0.5em;
  font-size: 1.1em;
  font-weight: bold;
}

li {
  margin-bottom: 10px;
  cursor: pointer; /* Set cursor to pointer during hover */
  transition: color 0.3s; /* Smooth color transition */
}

li:hover {
  text-decoration: underline;
}

li.selected {
  color: #707070;
}

.list-container {
  position: absolute;
  z-index: 100;
  padding: 5px 15px 30px 15px;
  background-color: #fff;
  border: thin solid #bebebe;
  box-shadow: 1px 1px 10px rgba(211, 211, 211, 0.5);
  overflow-y: auto;

  box-sizing: border-box;
  max-height: calc(100vh - 50px);
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .list-container {
    width: 200px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .list-container {
    width: 250px;
    padding: 7px 19px 38px 19px;
  }
}

@media only screen and (max-height: 575.98px) and (orientation: landscape) {
  .list-container{
    position: static;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .list-container{
    position: static;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .list-container {
    width: 300px;
    padding: 8px 23px 45px 23px;
    max-height: calc(100vh - 70px);
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  
}



</style>
