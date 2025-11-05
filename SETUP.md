# NoteSolver - Setup and Troubleshooting Guide

## Issues Found and Fixed

### 1. Backend Server Crash
**Problem**: The server was crashing on startup with error: `Parameter "key" is required`

**Cause**: Missing `MAILGUN_API_KEY` in the `.env` file

**Solution**: 
- Modified `mainbackend.js` to make Mailgun optional
- Backend now runs even without Mailgun API key
- Feedback feature logs to console when Mailgun is not configured

### 2. Frontend Dependencies Missing
**Problem**: All frontend npm packages were missing from `node_modules`

**Cause**: Dependencies not installed in the `AiCalc` directory

**Solution**: 
- Ran `npm install` in the `AiCalc` directory
- Added proper `.gitignore` to exclude `node_modules`

### 3. Frontend-Backend Configuration
**Problem**: Frontend was hardcoded to use remote production backend URL

**Solution**:
- Added environment variable support using Vite
- Created `.env` file in `AiCalc` directory with `VITE_BACKEND_URL`
- Updated `Canvas.jsx` and `Footer.jsx` to use environment variable
- Falls back to production URL if environment variable not set

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup

1. Navigate to the project root directory:
```bash
cd Mini-Project
```

2. Install backend dependencies (already installed):
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your API keys:
```
GEMINI_API_KEY=your_actual_gemini_api_key
MAILGUN_API_KEY=your_mailgun_api_key_optional
PORT=8000
```

5. Start the backend server:
```bash
node mainbackend.js
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the AiCalc directory:
```bash
cd AiCalc
```

2. Install frontend dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. For local development, `.env` should contain:
```
VITE_BACKEND_URL=http://localhost:8000
```

5. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### Production Build

To create a production build of the frontend:
```bash
cd AiCalc
npm run build
```

Built files will be in the `dist` directory.

## Environment Variables

### Backend (.env in root directory)
- `GEMINI_API_KEY` - **Required** - Your Google Gemini API key for AI image processing
- `MAILGUN_API_KEY` - **Optional** - Your Mailgun API key for email feedback
- `PORT` - **Optional** - Server port (defaults to 8000)

### Frontend (.env in AiCalc directory)
- `VITE_BACKEND_URL` - **Optional** - Backend API URL (defaults to production: https://notesolver-backend.onrender.com)

## Testing

### Test Backend
```bash
# Check if backend is running
curl http://localhost:8000

# Test feedback endpoint
curl -X POST http://localhost:8000/feedback \
  -H "Content-Type: application/json" \
  -d '{"feedbackMessage":"Test feedback"}'
```

### Test Frontend
1. Open browser to `http://localhost:5173`
2. Try drawing on the canvas
3. Test the Solve button to analyze drawings
4. Test the feedback form

## Common Issues

### Backend won't start
- Check if port 8000 is already in use
- Verify `GEMINI_API_KEY` is set in `.env`
- Check Node.js version (should be v14+)

### Frontend build fails
- Run `npm install` in the `AiCalc` directory
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for any syntax errors in modified files

### Frontend can't connect to backend
- Ensure backend is running on port 8000
- Check `VITE_BACKEND_URL` in `AiCalc/.env`
- Verify CORS is enabled in backend (already configured)

## Notes

- Mailgun is optional. If not configured, feedback will be logged to console
- Frontend defaults to production backend if `VITE_BACKEND_URL` is not set
- Both `.env` files are ignored by git for security
