const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Read the JSON file
const fileData = fs.readFileSync('./read.json');

const jsonData = JSON.parse(fileData);

// Define the CSV headers
const csvHeaders = [
  { id: 'id', title: 'id' },
  { id: 'title', title: 'title' },
  { id: 'url', title: 'url' },
  { id: 'description', title: 'description' },
  { id: 'image_url', title: 'image_url' },
  { id: 'date_created', title: 'date_created' },
  { id: 'date_saved', title: 'date_saved' },
  { id: 'date_archived', title: 'date_archived' },
  { id: 'archived', title: 'archived' },
];

// Define the CSV writer
const csvWriter = createCsvWriter({
  path: './read.csv',
  header: csvHeaders
});

// Write the data to CSV file
csvWriter.writeRecords(jsonData)
  .then(() => console.log('Data converted to CSV'))
  .catch((err) => console.error(err));