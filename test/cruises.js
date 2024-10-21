import api from '../src/api.js';
import { expect } from 'chai';

let destinationId;

describe('Tripadvisor Cruises API Tests', function () {
    it('Should get the destination ID for the Caribbean', async function () {
        const response = await api.get('/cruises/getLocation');
        // Validate the response status and message
        expect(response.status).to.equal(true);
        expect(response.message).to.equal('Success');

        // Check if the response contains the expected location
        const caribbeanLocation = response.data.find(location => location.name === 'Caribbean');

        if (!caribbeanLocation) {
            throw new Error('Destination ID for Caribbean not found in the response');
        }

        destinationId = caribbeanLocation.destinationId; // Extract destinationId if location is found

        if (destinationId === undefined || typeof destinationId !== 'number') {
            throw new Error('Invalid destinationId for Caribbean location');
        }

        console.log(`Found destinationId: ${destinationId}`);

    });

    it('Should get cruises for the Caribbean and sort by crew size', async function () {
        if (!destinationId) {
            this.skip(); // Skip this test if destinationId is not set
        }

        const cruisesResponse = await api.get(`/cruises/searchCruises?destinationId=${destinationId}&order=popularity&page=1&currencyCode=USD`);

        const sortedShips = cruisesResponse.data.list // Sort ships by crew size
            .filter(ship => ship.ship.crew !== null)
            .sort((a, b) => {
            return a.ship.crew - b.ship.crew; // Ascending order
        });

        expect(sortedShips).to.be.an('array'); // Assert the sorted ships array
        expect(sortedShips.length).to.be.greaterThan(0);

        console.log('Ships sorted by crew size:'); // Log and display ship names
        sortedShips.forEach(ship => {
            console.log(`Ship: ${ship.ship.name}, Crew Size: ${ship.ship.crew}`);
        });
    });
});
