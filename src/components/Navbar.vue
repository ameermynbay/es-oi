<template>
  <nav>
    <ul class="horizontal-navbar">
      <li v-for="item in navbarItems" :key="item.id">
        <router-link :to="`/subjects/${item.id}`" @click="selectSubject(item.id)" class="navbar-link" :class="{ 'active': selectedSubject === item.id }">
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AppNavbar',
  data() {
    return {
      navbarItems: [],
      selectedSubject: null,
    };
  },
  mounted() {
    // Fetch subjects from the API
    this.fetchSubjects();
  },
  methods: {
    async fetchSubjects() {
      try {
        const response = await axios.get('http://localhost:3001/subjects');
        // Assuming the API response is an array of subjects
        this.navbarItems = response.data.map(subject => ({
          id: subject.id,
          label: subject.name,
        }));
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    },
    selectSubject(subjectId) {
      // Emit an event to notify the parent component (App.vue) about the selected subject
      this.$emit('subjectSelected', subjectId);
      this.selectedSubject = subjectId;
    },
  },
};
</script>

<style scoped>
.horizontal-navbar {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex; /* Use flexbox to make the list items display horizontally */
}

.horizontal-navbar li {
  display: inline;
}


.navbar-link {
  font-size: 1.2em; /* Adjust the font size as needed */
  padding: 1em 1.5em; /* Add padding on all sides to make it look like a button */
  text-decoration: none;
  color: #333;
  position: relative;
  display: flex; /* Use flexbox */
  align-items: center; /* Center vertically */
}


.navbar-link:hover {
  background-color: #f0f0f0; /* Change background color on hover if desired */
}

.navbar-link.active::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 7%;
  background-color: black; /* Color of the line for the active subject */
}
</style>
