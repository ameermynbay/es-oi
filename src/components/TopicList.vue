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
import axios from 'axios';

export default {
  name: 'TopicList',
  props: ['subjectId'],
  data() {
    return {
      topics: [],
      selectedTopic: null, // Track the selected topic
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
        const response = await axios.get(`http://localhost:3001/topics?subjectId=${subjectId}`);
        this.topics = response.data.map(topic => ({
          id: topic.id,
          title: topic.title,
          link: topic.link,
        }));
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    },
    selectTopic(topic) {
      this.selectedTopic = topic; // Update the selected topic
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
