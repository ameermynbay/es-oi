<template>
  <div class="topic-list">
    <h2>Topics</h2>
    <ul>
      <li v-for="topic in topics" :key="topic.id" @click="playVideo(topic.link)">
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
          link: topic.link, // Add the link property
        }));
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    },
    playVideo(videoLink) {
      // Emit an event to notify the parent component (App.vue) about the selected video link
      this.$emit('videoSelected', videoLink);
    },
  },
};
</script>

<style>
.topic-list {
  position: relative;
  padding: 2% 5%;
  background-color: #f0f0f0;
  width: 200px;
  height: 100%;
  overflow-y: auto; /* Enable vertical scrolling if the list is too long */
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
}

/* Additional styling for links if needed */
router-link {
  color: #333;
  text-decoration: none;
  font-weight: bold;
}

router-link:hover {
  text-decoration: underline;
}
</style>
