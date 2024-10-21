import axios from 'axios';
import fs from 'fs';
import yaml from 'js-yaml';

const configPath = './config.yml'; // Load configuration from YAML file
let config;

try {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    config = yaml.load(fileContents);
} catch (e) {
    console.error(`Error reading config file: ${e.message}`);
    throw e; // Exit if configuration cannot be loaded
}

// Function to make GET requests
const get = async (url, additionalHeaders = {}) => {
    try {
        const response = await axios.get(`${config.baseUrl}${url}`, {
            headers: { ...config.headers, ...additionalHeaders },
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error(`Error making GET request: ${error.message}`);
        throw error; // Rethrow the error to handle it in the calling function
    }
};
// Future functions can be added here, e.g., POST, PUT, DELETE methods

export default {
    get,
    // You can add more methods here in the future
};
