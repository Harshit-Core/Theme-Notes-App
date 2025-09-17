# 🌫️ Pre Winter Notes

A minimalist, cozy notes application with a beautiful pre-winter theme. Capture your thoughts as the seasons change with this peaceful and intuitive note-taking app.

## ✨ Features

- **Clean Interface** - Minimalist design with a soothing pre-winter color palette
- **Persistent Storage** - Notes are automatically saved to your browser's local storage
- **Animated Background** - Gentle floating mist elements for atmospheric ambiance
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Keyboard Shortcuts** - Quick actions for power users
- **Draft Auto-save** - Never lose your thoughts while typing
- **Export Functionality** - Download your notes as JSON files
- **Toast Notifications** - Friendly feedback for all your actions

## 🎨 Theme

The app features a beautiful pre-winter aesthetic with:
- Soft gray and blue gradient backgrounds
- Misty, atmospheric elements
- Gentle animations of floating weather symbols (🌫️, 🌁, 🌀, 💨, 🌬️)
- Typography: Dancing Script for headings, Poppins for body text

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Installation
1. Download or clone this repository
2. Open `Index.html` in your web browser
3. Start writing your thoughts!

### File Structure
```
Pre Winter Notes/
├── Index.html          # Main HTML file
├── Styles.css          # CSS styling and animations
├── Script.js           # JavaScript functionality
├── favicon.png         # App icon
├── favicon.ico         # Fallback icon
└── README.md          # This file
```

## 🎯 How to Use

### Basic Operations
- **Add a Note**: Type in the text area and click "📝 Save Note" or press `Ctrl+Enter`
- **Delete a Note**: Click the "×" button on any note card
- **Clear Input**: Click "🗑️ Clear" to empty the text area

### Keyboard Shortcuts
- `Ctrl/Cmd + Enter` - Save current note
- `Ctrl/Cmd + N` - Focus on input area (new note)
- `Ctrl/Cmd + E` - Export all notes

### Features in Detail
- **Auto-draft Save**: Your typing is automatically saved as a draft
- **Timestamp Display**: Each note shows when it was created ("Just now", "2 hours ago", etc.)
- **Random Emojis**: Each note gets a random pre-winter themed emoji
- **Text Formatting**: Basic markdown support for **bold** and *italic* text

## 💾 Data Storage

- Notes are stored locally in your browser using `localStorage`
- Data persists between browser sessions
- Export feature allows backup as JSON files
- No data is sent to external servers - complete privacy

## 🛠️ Technical Details

### Built With
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, gradients, and animations
- **Vanilla JavaScript** - No frameworks, pure ES6+ JavaScript
- **Local Storage API** - For data persistence

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- Lightweight (~15KB total)
- No external dependencies except Google Fonts
- Smooth 60fps animations
- Responsive down to 320px width

## 🎨 Customization

### Changing Colors
Edit the CSS custom properties in `Styles.css`:
```css
:root {
    --pre-winter-gray: #708090;
    --pre-winter-blue: #4F6D8E;
    --pre-winter-silver: #B8C5D1;
    --pre-winter-mist: #E6E9F0;
}
```

### Modifying Animations
Adjust the floating elements in `Script.js`:
```javascript
this.preWinterEmojis = ['🌫️', '🌁', '🌀', '💨', '🌬️'];
```

## 📱 Mobile Support

The app is fully responsive and includes:
- Touch-friendly interface
- Optimized typography for mobile screens
- Gesture support for scrolling through notes
- Mobile-optimized button sizes

## 🔒 Privacy

- All data stays on your device
- No tracking or analytics
- No external API calls (except Google Fonts)
- No cookies or personal data collection

## 🐛 Known Issues

- Favicon may not display when opening directly as a file (use a local server)
- Very long notes may affect performance on older devices
- Some older browsers may not support all CSS features

## 🚀 Future Enhancements

- [ ] Search functionality
- [ ] Categories/tags for notes
- [ ] Dark/light theme toggle
- [ ] Note sharing capabilities
- [ ] Backup to cloud storage
- [ ] Rich text editor

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📞 Support

If you encounter any issues or have suggestions:
1. Check the browser console for error messages
2. Ensure your browser supports modern JavaScript features
3. Try clearing browser cache and refreshing

---

**Enjoy capturing your pre-winter thoughts! 🌫️✨**

*Made with ❄️ for those quiet, transitional moments between seasons.*
