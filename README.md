# Luxego Auto Spa

A premium mobile car detailing website built with the MERN stack, featuring luxury aesthetics and comprehensive booking functionality.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with luxury aesthetics
- **Service Booking**: Complete booking system with form validation
- **Package Management**: Three-tier service packages with add-ons
- **Customer Reviews**: Dynamic review carousel with rating system
- **Contact System**: Multiple contact methods (Call, Email, TikTok)
- **Sustainability Section**: Highlighting eco-friendly practices
- **SEO Optimized**: Meta tags, semantic HTML, and structured data

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router, Styled-jsx
- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Deployment**: Vercel (Frontend), Render (Backend), MongoDB Atlas

## 📦 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/luxego-autospa.git
   cd luxego-autospa
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create `server/.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE=mongodb://localhost:27017/luxego-autospa
   EMAIL_HOST=smtp.gmail.com
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CLIENT_URL=http://localhost:3000
   ```

   Create `client/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📱 Available Scripts

- `npm run dev` - Run both client and server
- `npm run client` - Start React dev server
- `npm run server` - Start Node server
- `npm run build` - Build for production
- `npm start` - Start production server

## 🌐 Deployment

### Frontend (Vercel)
1. Connect repo to Vercel
2. Set root directory to `client`
3. Add `REACT_APP_API_URL` environment variable

### Backend (Render)
1. Connect repo to Render
2. Set root directory to `server`
3. Add environment variables from `server/.env`

### Database (MongoDB Atlas)
1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `DATABASE` in server `.env`


## 📝 License

ISC License - see [LICENSE](LICENSE) for details.

---

**Note**: This is a premium car detailing service website. For production deployment, ensure all environment variables are properly configured and security best practices are followed.
