<template>
  <nav>
    <div class="navbar-container">
      <button class="hamburger-btn" @click="toggleTopicList">&#9776;</button>

      <div class="dropdown">
        <button class="dropbtn">{{ selectedSubjectLabel }}</button>
        <div class="dropdown-content">
          <a v-for="item in navbarItems" :key="item.id" @click="selectSubject(item.id)" :class="{ 'active': selectedSubject === item.id }">
            {{ item.label }}
          </a>
        </div>
      </div>
      
    </div>
  </nav>
</template>


<script>
import apiService from '@/services/apiService';

export default {
  name: 'AppNavbar',
  data() {
    return {
      navbarItems: [],
      selectedSubject: null,
    };
  },
  computed: {
    selectedSubjectLabel() {
      const selectedItem = this.navbarItems.find(item => item.id === this.selectedSubject);
      return selectedItem ? selectedItem.label : '';
    },
  },
  mounted() {
  this.fetchSubjects().then(() => {
    if (this.navbarItems.length > 0) {
      this.selectedSubject = this.navbarItems[0].id; // Set the first item as selected by default
    }
  });
},

  methods: {
    async fetchSubjects() {
      try {
        const response = await apiService.getSubjects();
        this.navbarItems = response.data.map(subject => ({
          id: subject.id,
          label: subject.name,
        }));
        if (this.navbarItems.length > 0) {
          this.selectedSubject = this.navbarItems[0].id; // Set first item as selected by default
          this.$emit('subjectSelected', this.navbarItems[0].id)
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    },
    selectSubject(id) {
      this.selectedSubject = id;
      this.$emit('subjectSelected', id); // Emitting an event with the selected subject ID
    },
    toggleTopicList() {
      this.$emit('toggle-topic-list');
    },
  },
};
</script>


<style>
nav {
  height: 50px;
}
.navbar-container {
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  border-bottom: thin solid #bebebe;
  height: 50px;
}

.dropdown {
  position: relative;
  display: inline-block;
  height: 100%;
}

.dropbtn {
  background-color: rgb(244 130 37);
  color: white;
  height: 100%;
  font-size: 16px;
  min-width: 160px;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1000;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: rgb(233 111 10);
}



.hamburger-btn {
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {

}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {

}

@media only screen and (max-height: 575.98px) and (orientation: landscape) {
  .hamburger-btn{
    display: none;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .hamburger-btn{
    display: none;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .navbar-container{
    height: 70px;
  }
  nav {
    height: 70px;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  
}
</style>