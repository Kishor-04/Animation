# Teddy Day Jigsaw Puzzle Game 🧸

A beautiful, interactive jigsaw puzzle game created for Teddy Day! Features interlocking puzzle pieces, magnetic snapping, smooth animations, and a lovely pink/cream/red aesthetic.

## Features ✨

- **Mystery Selection**: 10 blurred teddy bear images to choose from
- **12-Piece Puzzle**: 3x4 grid of interlocking jigsaw pieces
- **Drag & Drop**: Smooth piece movement with mouse/touch support
- **Magnetic Snapping**: Automatic piece locking when placed correctly
- **Beautiful UI**: Soft pinks, creams, and warm red color palette
- **Animations**: Smooth transitions, piece snapping effects, and heart confetti
- **Sound Effects**: Audio feedback for snapping and completion
- **Success Screen**: Celebration page with custom message

## How to Play 🎮

1. **Launch the game** from the home page by clicking "🧸 Play Teddy Day Puzzle"
2. **Select a mystery teddy** - Click on any blurred image to reveal your puzzle
3. **Drag puzzle pieces** to move them around the play area
4. **Position pieces correctly** - When a piece is within 15 pixels of its correct position, it will automatically snap and lock
5. **Complete the puzzle** - Once all pieces are in place, enjoy the celebration!

## Setup Instructions 🚀

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Asset Replacement 📁

The game includes placeholder assets that you can customize:

### Teddy Images
Located in `/public/assets/`:
- `teddy_1.svg` through `teddy_10.svg` - SVG placeholder teddy bears

**To customize**: 
- Replace these files with your own teddy bear images
- Supports `.jpg`, `.png`, and `.svg` formats
- Recommended size: 400x400 pixels or larger
- The images will automatically be used in the puzzle

### Sound Effects
Located in `/public/assets/`:
- `snap.mp3` - Played when a piece locks into place
- `complete.mp3` - Played when the puzzle is completed

**To add real sound effects**:
1. Find or create appropriate sound files (MP3 format)
2. Replace the placeholder files with actual audio
3. Suggested sounds:
   - **snap.mp3**: A soft click, snap, or lock sound (0.2-0.5 seconds)
   - **complete.mp3**: A celebratory chime, success jingle, or magical sparkle (1-3 seconds)

**Free sound resources**:
- [Freesound.org](https://freesound.org)
- [Zapsplat.com](https://zapsplat.com)

## Technical Details 🛠️

### Technologies Used
- React 18
- Vite
- CSS3 with animations
- SVG for jigsaw piece shapes
- HTML5 Drag and Drop API

### Puzzle Configuration
You can modify these constants in `TeddyJigsaw.jsx`:

```javascript
const ROWS = 3;          // Number of rows
const COLS = 4;          // Number of columns
const PIECE_SIZE = 100;  // Base size of each piece in pixels
const SNAP_THRESHOLD = 15; // Distance for magnetic snap in pixels
```

### SVG Jigsaw Piece Generation
The puzzle uses programmatically generated SVG paths to create interlocking jigsaw pieces with:
- Tab patterns (tabs and blanks)
- Complementary edges (tabs match with blanks)
- Clipping masks for image portions

## Customization 🎨

### Colors
Edit `TeddyJigsaw.css` to change the color scheme:
- Background gradient: Lines 2-4
- Button colors: `.play-again-btn` class
- Heart confetti: `.heart-confetti` class

### Success Message
Edit `TeddyJigsaw.jsx` line ~280 to change the completion message:
```jsx
<p className="success-message">
  Your custom message here
</p>
```

### Difficulty
Adjust the grid size in `TeddyJigsaw.jsx`:
- Easy: 3x3 (9 pieces)
- Medium: 4x4 (16 pieces)  
- Hard: 5x5 (25 pieces)
- Current: 3x4 (12 pieces)

## Browser Compatibility 🌐

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Touch support included

## Performance Tips 💡

- Images are loaded once and reused across pieces
- SVG pieces are efficiently rendered
- CSS transforms used for smooth animations
- Sound files are preloaded for instant playback

## Troubleshooting 🔧

**Issue**: Sound effects don't play
- **Solution**: Replace placeholder MP3 files with actual audio files

**Issue**: Images don't load
- **Solution**: Check that image files exist in `/public/assets/` and match the filenames in the code

**Issue**: Pieces are too small/large
- **Solution**: Adjust `PIECE_SIZE` constant or use CSS zoom

**Issue**: Snapping is too sensitive/not sensitive enough
- **Solution**: Adjust `SNAP_THRESHOLD` constant

## Credits & License 📄

Created with ❤️ for Teddy Day celebrations!

This project is free to use and modify for personal projects.

---

**Happy Teddy Day! 🧸💕**

*"The teddy day shows the care to there loved ones"*
