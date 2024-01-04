<template>
  <div class="topic-list">
    <h2>Topics</h2>
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
        // Assuming the API endpoint can filter topics by subjectId
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
.topic-list {
  padding: 1% 3%;
  background-color: #f0f0f0;
  width: 200px;
  height: 100%;
  overflow-y: auto;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
  cursor: pointer; /* Set cursor to pointer during hover */
  transition: color 0.3s; /* Smooth color transition */
}

li:hover {
  text-decoration: underline;
}

/* Style for selected topic */
li.selected {
  color: #707070;
}
</style>
