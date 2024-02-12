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
.list-container {
  position: absolute;
  z-index: 100;
  padding: 5px 15px 30px 15px;
  background-color: #fff;
  border-right: thin solid #bebebe;
  /*box-shadow: 1px 1px 10px rgba(211, 211, 211, 0.5);*/
  overflow-y: auto;

  box-sizing: border-box;
  height: calc(100vh - 60px);
  width: 100vw;
}


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




/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .list-container{
    position: static;
    width: 400px;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {

}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  
}



</style>
