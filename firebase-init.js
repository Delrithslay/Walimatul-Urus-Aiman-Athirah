// Firebase initialization (loaded as an ES module via CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase configuration (from provided snippet)
const firebaseConfig = {
  apiKey: "AIzaSyBQIgjPMPSvg5g5_KK58utP185h4zwS3S4",
  authDomain: "kad-kahwin-aiman.firebaseapp.com",
  projectId: "kad-kahwin-aiman",
  storageBucket: "kad-kahwin-aiman.firebasestorage.app",
  messagingSenderId: "802306594206",
  appId: "1:802306594206:web:64447545755a1f6de8b28f",
  measurementId: "G-0BEVVHXNLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = null;
try {
  analytics = getAnalytics(app);
  console.log('Firebase initialized: analytics enabled');
} catch (e) {
  console.warn('Firebase analytics not available:', e);
}

// Initialize Firestore
const db = getFirestore(app);

// Save RSVP helper: writes a document to `rsvps` collection with server timestamp
async function saveRSVP({ name, count, wish }) {
  try {
    const docRef = await addDoc(collection(db, 'rsvps'), {
      name: name || null,
      count: Number(count) || 1,
      wish: wish || null,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id };
  } catch (err) {
    throw err;
  }
}

export { app, db, saveRSVP };

// Delete RSVP helper
async function deleteRSVP(id) {
  if (!id) throw new Error('No id provided');
  try {
    await deleteDoc(doc(db, 'rsvps', id));
    return true;
  } catch (err) {
    console.error('deleteRSVP error', err);
    throw err;
  }
}

export { fetchRSVPs, deleteRSVP };

// Fetch recent RSVPs helper
async function fetchRSVPs({ limit = 100 } = {}) {
  try {
    const q = query(collection(db, 'rsvps'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    const items = [];
    snap.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items.slice(0, limit);
  } catch (err) {
    console.error('fetchRSVPs error', err);
    return [];
  }
}

export { fetchRSVPs };
