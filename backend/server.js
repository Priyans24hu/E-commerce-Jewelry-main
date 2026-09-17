const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const DB_PATH = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(DB_PATH);

// Initialize database
function initDatabase() {
  db.serialize(() => {
    // Products table
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        base_price INTEGER NOT NULL,
        description TEXT,
        base_image TEXT,
        variants TEXT,
        materials TEXT,
        stones TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Customizations table
    db.run(`
      CREATE TABLE IF NOT EXISTS customizations (
        id TEXT PRIMARY KEY,
        product_id TEXT NOT NULL,
        metal TEXT NOT NULL,
        stone TEXT NOT NULL,
        size INTEGER NOT NULL,
        design TEXT NOT NULL,
        total_price INTEGER NOT NULL,
        captured_image TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `);

    console.log('Database initialized successfully');
  });
}

// Seed sample products
function seedProducts() {
  const products = [
    {
      id: 'earring-1',
      name: 'Classic Diamond Stud',
      type: 'earring',
      base_price: 2500,
      description: 'Timeless diamond stud earrings with brilliant cut',
      base_image: '/images/earring-diamond.png',
      variants: JSON.stringify(['classic', 'halo', 'drop']),
      materials: JSON.stringify([
        { name: 'gold', color: '#D4AF37', price: 0 },
        { name: 'rosegold', color: '#B76E79', price: 100 },
        { name: 'silver', color: '#C0C0C0', price: -200 }
      ]),
      stones: JSON.stringify([
        { name: 'diamond', color: '#E8E8E8', price: 0 },
        { name: 'emerald', color: '#50C878', price: -500 },
        { name: 'ruby', color: '#E0115F', price: -400 },
        { name: 'sapphire', color: '#0F52BA', price: -300 }
      ])
    },
    {
      id: 'necklace-1',
      name: 'Elegant Solitaire Pendant',
      type: 'necklace',
      base_price: 4500,
      description: 'Single stone pendant with delicate chain',
      base_image: '/images/necklace-solitaire.png',
      variants: JSON.stringify(['solitaire', 'cluster', 'bar']),
      materials: JSON.stringify([
        { name: 'gold', color: '#D4AF37', price: 0 },
        { name: 'rosegold', color: '#B76E79', price: 200 },
        { name: 'silver', color: '#C0C0C0', price: -300 }
      ]),
      stones: JSON.stringify([
        { name: 'diamond', color: '#E8E8E8', price: 0 },
        { name: 'emerald', color: '#50C878', price: -800 },
        { name: 'ruby', color: '#E0115F', price: -600 },
        { name: 'sapphire', color: '#0F52BA', price: -500 }
      ])
    },
    {
      id: 'ring-1',
      name: 'Royal Band Ring',
      type: 'ring',
      base_price: 3200,
      description: 'Classic band with center stone and accent diamonds',
      base_image: '/images/ring-band.png',
      variants: JSON.stringify(['solitaire', 'three-stone', 'eternity']),
      materials: JSON.stringify([
        { name: 'gold', color: '#D4AF37', price: 0 },
        { name: 'rosegold', color: '#B76E79', price: 150 },
        { name: 'silver', color: '#C0C0C0', price: -250 }
      ]),
      stones: JSON.stringify([
        { name: 'diamond', color: '#E8E8E8', price: 0 },
        { name: 'emerald', color: '#50C878', price: -600 },
        { name: 'ruby', color: '#E0115F', price: -500 },
        { name: 'sapphire', color: '#0F52BA', price: -400 }
      ])
    },
    {
      id: 'bangle-1',
      name: 'Stackable Bangle Set',
      type: 'bangle',
      base_price: 2800,
      description: 'Sleek stackable bangles with subtle sparkle',
      base_image: '/images/bangle-stack.png',
      variants: JSON.stringify(['plain', 'diamond-studded', 'twisted']),
      materials: JSON.stringify([
        { name: 'gold', color: '#D4AF37', price: 0 },
        { name: 'rosegold', color: '#B76E79', price: 100 },
        { name: 'silver', color: '#C0C0C0', price: -200 }
      ]),
      stones: JSON.stringify([
        { name: 'diamond', color: '#E8E8E8', price: 0 },
        { name: 'emerald', color: '#50C878', price: -400 },
        { name: 'ruby', color: '#E0115F', price: -300 },
        { name: 'sapphire', color: '#0F52BA', price: -250 }
      ])
    }
  ];

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO products 
    (id, name, type, base_price, description, base_image, variants, materials, stones)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  products.forEach(p => {
    stmt.run(p.id, p.name, p.type, p.base_price, p.description, 
             p.base_image, p.variants, p.materials, p.stones);
  });

  stmt.finalize();
  console.log('Sample products seeded');
}

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    const products = rows.map(row => ({
      ...row,
      variants: JSON.parse(row.variants),
      materials: JSON.parse(row.materials),
      stones: JSON.parse(row.stones)
    }));
    
    res.json(products);
  });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const product = {
      ...row,
      variants: JSON.parse(row.variants),
      materials: JSON.parse(row.materials),
      stones: JSON.parse(row.stones)
    };
    
    res.json(product);
  });
});

// Save customization
app.post('/api/customization/save', (req, res) => {
  const { product_id, metal, stone, size, design, total_price, captured_image } = req.body;
  
  const id = uuidv4();
  
  db.run(`
    INSERT INTO customizations (id, product_id, metal, stone, size, design, total_price, captured_image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [id, product_id, metal, stone, size, design, total_price, captured_image], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    res.json({ 
      id, 
      message: 'Customization saved successfully',
      customization: {
        id,
        product_id,
        metal,
        stone,
        size,
        design,
        total_price
      }
    });
  });
});

// Get customization
app.get('/api/customization/:id', (req, res) => {
  db.get(`
    SELECT c.*, p.name as product_name, p.type as product_type
    FROM customizations c
    JOIN products p ON c.product_id = p.id
    WHERE c.id = ?
  `, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Customization not found' });
    }
    
    res.json(row);
  });
});

// Get all customizations
app.get('/api/customizations', (req, res) => {
  db.all(`
    SELECT c.*, p.name as product_name, p.type as product_type
    FROM customizations c
    JOIN products p ON c.product_id = p.id
    ORDER BY c.created_at DESC
  `, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    res.json(rows);
  });
});

// Calculate price
app.post('/api/calculate-price', (req, res) => {
  const { product_id, metal, stone, size } = req.body;
  
  db.get('SELECT * FROM products WHERE id = ?', [product_id], (err, row) => {
    if (err || !row) {
      return res.status(500).json({ error: 'Product not found' });
    }
    
    const materials = JSON.parse(row.materials);
    const stones = JSON.parse(row.stones);
    
    const metalPrice = materials.find(m => m.name === metal)?.price || 0;
    const stonePrice = stones.find(s => s.name === stone)?.price || 0;
    const sizeMultiplier = 1 + (size - 50) * 0.01;
    
    const totalPrice = Math.round((row.base_price + metalPrice + stonePrice) * sizeMultiplier);
    
    res.json({ 
      base_price: row.base_price,
      metal_adjustment: metalPrice,
      stone_adjustment: stonePrice,
      size_multiplier: sizeMultiplier,
      total_price: totalPrice
    });
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize and start server
initDatabase();
seedProducts();

app.listen(PORT, () => {
  console.log(`Roshni Creations AR Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
