import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/myapp/', // Base URL of your Django API
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  // Method to fetch all subjects
  getSubjects() {
    return apiClient.get('subjects');
  },

  // Method to fetch all topics
  getTopics() {
    return apiClient.get('topics');
  },

  // Method to fetch a single topic by ID
  getTopic(id) {
    return apiClient.get(`topics/${id}`);
  },

  getTopicsBySubject(subjectId) {
    return apiClient.get(`subjects/${subjectId}/topics`);
  },

  getSubject(subjectId) {
    return apiClient.get(`subjects/${subjectId}`);
  },

};
