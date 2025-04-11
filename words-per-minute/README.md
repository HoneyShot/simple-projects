# Words Per Minute - Typing Speed Test Game

A modern, web-based typing speed test application designed to help users improve their typing speed and accuracy.

![Words Per Minute Screenshot]

## Features

- **Real-time WPM Calculation**: Monitors typing speed in words per minute
- **Accuracy Tracking**: Measures typing accuracy during the test
- **Multiple Languages**: Supports English and Turkish languages for both UI and typing content
- **Dark/Light Theme**: Toggle between dark and light themes based on preference
- **Responsive Design**: Works on desktop and mobile devices
- **Visual Feedback**: Highlights correct and incorrect characters as you type
- **Support for Multi-Word Phrases**: Space character works properly for typing phrases with spaces
- **Server Error Handling**: Shows user-friendly error message when server is unreachable

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 with Tailwind CSS framework
  - Vanilla JavaScript
  
- **Backend**: 
  - Node.js server for word API (hosted)
  - RESTful API for word fetching

## How to Play

1. Select your preferred UI language and game language
2. Click the "Start" button to begin
3. Type the displayed word as accurately as possible
4. Press Enter to submit the word
5. Try to type as many words as possible within the time limit
6. View your final WPM, word count, and accuracy when the game ends

## Setup Instructions

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/HoneyShot/words-per-minute.git
   cd words-per-minute
   ```

2. Open `index.html` in your browser to run the application locally

3. For the best experience, use a live server:
   - Using VS Code? Install the "Live Server" extension and click "Go Live"
   - Or use any HTTP server like `python -m http.server` or `npx serve`

## Backend API

The application uses an API to fetch words for typing practice.

## Future Enhancements

- Additional languages for both UI and typing content
- User accounts to save progress and statistics
- Different test modes (time-based, word count-based, etc.)
- Competitive mode to race against friends
- Advanced statistics and performance graphs

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.