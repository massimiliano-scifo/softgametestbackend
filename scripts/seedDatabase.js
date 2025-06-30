// importFirestore.js
const admin = require('firebase-admin');
const fs = require('fs');

// Path to your JSON file
const data = JSON.parse(fs.readFileSync('./games.json', 'utf8'));

// Initialize Firebase Admin SDK to point to the emulator
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:5003';
admin.initializeApp({ projectId: 'softgames-test-464507' });

const db = admin.firestore();

async function importData() {
    const batch = db.batch();
    data.forEach((item) => {
        const ref = db.collection('games').doc(item.id);
        batch.set(ref, item);
    });

    await batch.commit();
    console.log('Import complete!');
    process.exit(0);
}

importData().catch(e => {
  console.error(e);
  process.exit(1);
});