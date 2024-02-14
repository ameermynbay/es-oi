<template>
  <div class="list-container">
    <ul>
      <li
        v-for="topic in topics"
        :key="topic.id"
        @click="handleClick(topic)"
        :class="{ 'selected': topic === selectedTopic }"
      >
        <div class="li-container">
          <span class="li-topic-title">
            {{ topic.title }}
          </span>
        </div>
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
    handleClick(topic) {
      this.selectTopic(topic);
      if (window.innerWidth <= 768) {
        this.$emit('updateHamburgerMenu', false); // Emitting an event
      }
    }
  },
};
</script>

<style>
.list-container {
  position: absolute;
  z-index: 100;
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

li {
  cursor: pointer; /* Set cursor to pointer during hover */
  transition: background-color 0.3s; /* Smooth color transition */
  background-color: #fff;
}

li:hover {
  background-color: #f5f5f5;
}

li.selected {
  background-color: #f5f5f5;
}

.li-container{
  border-bottom: thin solid #bebebe;
  padding: 16px;
}

.li-topic-title{
  font-size: 16px;
  font-weight: 600;
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
