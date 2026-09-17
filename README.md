# Roshni Creations - AR Jewelry Customization + Try-On System

A production-ready augmented reality jewelry try-on and customization system for eCommerce, featuring real-time AR rendering with MediaPipe, live customization, and premium Apple-style UI.

![Tech Stack](https://img.shields.io/badge/React-18.2.0-blue)
![Tech Stack](https://img.shields.io/badge/Vite-5.0.8-purple)
![Tech Stack](https://img.shields.io/badge/MediaPipe-Latest-green)
![Tech Stack](https://img.shields.io/badge/Tailwind-3.3.6-cyan)

## Features

- **Real-Time AR Try-On**: Live jewelry preview using MediaPipe FaceMesh and Hands
- **Seamless Customization**: Metal type, stone type, size, and design variants
- **Multi-Category Support**: Earrings, necklaces, rings, and bangles
- **Premium UI**: Apple-style minimal design with glass morphism effects
- **Smart Feedback**: Dynamic conversion-boosting messages
- **Capture & Save**: Save custom configurations with captured images
- **Dynamic Pricing**: Real-time price updates based on selections

## Tech Stack

### Frontend
- React 18 + Vite
- MediaPipe (FaceMesh, Hands)
- Tailwind CSS
- Zustand (state management)
- Lucide React (icons)

### Backend
- Node.js + Express
- SQLite3 database
- RESTful API

## Project Structure

```
roshni-creations-ar/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Camera.jsx           # Camera component with video/image capture
│   │   │   ├── TryOnCanvas.jsx      # AR rendering engine
│   │   │   ├── ProductSelector.jsx  # Product selection cards
│   │   │   └── CustomizationPanel.jsx # Customization controls
│   │   ├── hooks/
│   │   │   ├── useFaceMesh.js       # MediaPipe FaceMesh tracking
│   │   │   ├── useHandTracking.js   # MediaPipe Hands tracking
│   │   │   └── useCustomization.js  # Customization state & API
│   │   ├── pages/
│   │   │   └── TryOnPage.jsx        # Main application page
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── server.js                    # Express server & API routes
│   ├── package.json
│   └── db.sqlite                    # SQLite database (auto-created)
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Backend Setup

```bash
cd backend
npm install
npm start
```

The backend will start on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

### 3. Access the Application

Open your browser to `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/customization/save` | Save customization |
| GET | `/api/customization/:id` | Get saved customization |
| GET | `/api/customizations` | Get all saved customizations |
| POST | `/api/calculate-price` | Calculate dynamic price |

## Usage Guide

### AR Try-On
1. Allow camera access or upload a photo
2. Select a jewelry type (earrings, necklace, ring, bangle)
3. The jewelry will appear overlaid on your face/hands in real-time
4. Move naturally - the jewelry tracks your movements smoothly

### Customization
1. **Metal Type**: Choose Gold, Rose Gold, or Silver
2. **Stone Type**: Select Diamond, Emerald, Ruby, or Sapphire
3. **Size**: Adjust the scale with the slider (30-100%)
4. **Design**: Switch between design variants instantly

### Capture & Save
1. Click the capture button to take a photo
2. Preview your customized design
3. Download the image or save the configuration

## Database Schema

### Products Table
- `id` (TEXT PRIMARY KEY)
- `name` (TEXT)
- `type` (TEXT) - earring, necklace, ring, bangle
- `base_price` (INTEGER)
- `description` (TEXT)
- `variants` (JSON)
- `materials` (JSON)
- `stones` (JSON)

### Customizations Table
- `id` (TEXT PRIMARY KEY)
- `product_id` (TEXT)
- `metal` (TEXT)
- `stone` (TEXT)
- `size` (INTEGER)
- `design` (TEXT)
- `total_price` (INTEGER)
- `captured_image` (TEXT - base64)
- `created_at` (DATETIME)

## AR Rendering Features

### Face Tracking (FaceMesh)
- 468 facial landmarks
- Earring positioning on ears
- Necklace placement at neck/collarbone
- Head tilt detection for realistic jewelry angle
- Smooth motion with alpha blending

### Hand Tracking (Hands)
- 21 hand landmarks per hand
- Ring positioning on ring/middle fingers
- Bangle placement at wrist
- Hand angle detection
- Scale estimation from hand size

### Realism Engine
- Metallic gradients for authentic metal appearance
- Stone glow effects
- Dynamic shadows and highlights
- Smooth animations (30-60 FPS)
- Jitter reduction with landmark smoothing

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note**: Camera access requires HTTPS in production or localhost for development.

## Performance Optimizations

- Lazy loading of MediaPipe models
- `requestAnimationFrame` for smooth rendering
- Landmark smoothing to reduce jitter
- Canvas optimization for high FPS
- Debounced price calculations

## Customization

### Adding New Products
Edit the `seedProducts()` function in `backend/server.js`:

```javascript
{
  id: 'your-product-id',
  name: 'Product Name',
  type: 'earring', // or necklace, ring, bangle
  base_price: 5000,
  description: 'Product description',
  variants: JSON.stringify(['variant1', 'variant2']),
  materials: JSON.stringify([
    { name: 'gold', color: '#D4AF37', price: 0 },
    { name: 'silver', color: '#C0C0C0', price: -200 }
  ]),
  stones: JSON.stringify([
    { name: 'diamond', color: '#E8E8E8', price: 0 },
    { name: 'ruby', color: '#E0115F', price: -400 }
  ])
}
```

### Custom Jewelry Drawing
The AR rendering in `TryOnCanvas.jsx` uses HTML5 Canvas. You can customize:
- Metal gradients in `METAL_COLORS`
- Stone colors in `STONE_COLORS`
- Drawing logic for each jewelry type

## Troubleshooting

### Camera not working
- Ensure HTTPS or localhost
- Check browser permissions
- Try uploading a photo instead

### AR tracking issues
- Ensure good lighting
- Keep face/hands visible
- MediaPipe models load from CDN (requires internet)

### Port conflicts
- Backend: Change `PORT` in `backend/server.js`
- Frontend: Change port in `frontend/vite.config.js`

## License

MIT License - feel free to use for commercial projects.

## Credits

- MediaPipe by Google
- Icons by Lucide
- Fonts: Playfair Display, Inter

---

**Roshni Creations** - Where technology meets elegance
