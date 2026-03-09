const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin (you'll need to add your service account key)
// admin.initializeApp({
//   credential: admin.credential.cert(require('./serviceAccountKey.json'))
// });

// Mock data for testing (replace with your database)
const mockAssets = [
  {
    _id: '1',
    title: 'Modern UI Kit',
    description: 'A comprehensive UI kit with 100+ components',
    price: 49,
    category: 'UI Kit',
    platform: 'figma',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    rating: 4.8,
    sales: 234,
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: '3D Character Pack',
    description: 'High-quality 3D characters for games',
    price: 79,
    category: '3D Models',
    platform: 'unity',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800',
    rating: 4.9,
    sales: 156,
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'Icon Set Pro',
    description: '500+ premium icons in multiple formats',
    price: 29,
    category: 'Icons',
    platform: 'figma',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
    rating: 4.7,
    sales: 445,
    status: 'active',
    createdAt: new Date().toISOString()
  }
];

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Uncomment when Firebase Admin is initialized
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // req.user = decodedToken;
    
    // For testing without Firebase Admin:
    req.user = { uid: 'test-user' };
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// PUBLIC ROUTES (no auth required)

// Get all assets
app.get('/assets', (req, res) => {
  try {
    res.json(mockAssets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ message: 'Failed to fetch assets' });
  }
});

// Get single asset by ID
app.get('/assets/:id', (req, res) => {
  try {
    const asset = mockAssets.find(a => a._id === req.params.id);
    
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    res.json(asset);
  } catch (error) {
    console.error('Error fetching asset:', error);
    res.status(500).json({ message: 'Failed to fetch asset' });
  }
});

// PROTECTED ROUTES (auth required)

// Check if user purchased asset
app.get('/api/assets/:id/check-purchase', verifyToken, async (req, res) => {
  try {
    // TODO: Check in your database if user purchased this asset
    // For now, return false for testing
    res.json({ purchased: false });
  } catch (error) {
    console.error('Error checking purchase:', error);
    res.status(500).json({ message: 'Failed to check purchase status' });
  }
});

// Download asset
app.get('/api/assets/:id/download', verifyToken, async (req, res) => {
  try {
    // TODO: Verify purchase and return download URL
    const asset = mockAssets.find(a => a._id === req.params.id);
    
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    // Return download URL (replace with your actual file storage URL)
    res.json({ 
      downloadUrl: `https://example.com/downloads/${asset._id}.zip`,
      message: 'Download ready'
    });
  } catch (error) {
    console.error('Error downloading asset:', error);
    res.status(500).json({ message: 'Failed to download asset' });
  }
});

// Get all users (admin only)
app.get('/api/users', verifyToken, async (req, res) => {
  try {
    // TODO: Check if user is admin
    // TODO: Fetch users from database
    res.json([]);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Update user role (admin only)
app.put('/api/users/:id/role', verifyToken, async (req, res) => {
  try {
    const { role } = req.body;
    // TODO: Update user role in database
    res.json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Failed to update role' });
  }
});

// Get analytics stats (admin only)
app.get('/api/analytics/stats', verifyToken, async (req, res) => {
  try {
    // TODO: Calculate real stats from database
    res.json({