# Business Directory Platform - Full Stack Application

## 🚀 Features

### Frontend

- ✅ React 18 with Vite
- ✅ Tailwind CSS for styling
- ✅ React Router for navigation
- ✅ User authentication (Login/Signup)
- ✅ Admin authentication
- ✅ Business registration (Business owners only)
- ✅ Business search and filtering
- ✅ Lead generation system
- ✅ Admin dashboard with analytics
- ✅ Responsive design

### Backend

- ✅ Node.js & Express.js
- ✅ MongoDB with Mongoose
- ✅ JWT authentication
- ✅ Role-based access control (User, Business Owner, Admin)
- ✅ RESTful API design
- ✅ Password hashing with bcryptjs
- ✅ CORS enabled

## 📋 Prerequisites

Before running this project, make sure you have:

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
3. **Git** (optional)

## 🛠️ Installation & Setup

### Step 1: Install MongoDB

#### Windows:

1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install it with default settings
3. MongoDB will run as a Windows service automatically
4. To verify: Open Command Prompt and run:
   ```bash
   mongod --version
   ```

#### Mac (using Homebrew):

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian):

```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### Step 2: Start the Backend Server

1. Open a terminal and navigate to the backend folder:

   ```bash
   cd "c:\Alok project\business-directory\backend"
   ```

2. Start the backend server:

   ```bash
   npm run dev
   ```

3. You should see:
   ```
   Server running on port 5000
   MongoDB Connected: localhost
   Admin user created successfully
   ```

### Step 3: Start the Frontend

1. Open another terminal and navigate to the project root:

   ```bash
   cd "c:\Alok project\business-directory"
   ```

2. Start the frontend development server:

   ```bash
   npm run dev
   ```

3. Open your browser and go to: `http://localhost:5173`

## 🔐 Default Admin Credentials

```
Email: admin@bizconnect.com
Password: admin123
```

## 📱 User Flow

### For Customers:

1. Visit the homepage
2. Browse businesses or search by category/keyword
3. Click on a business to view details
4. Click "Request Contact" to generate a lead
5. Fill in your details (name, phone, email, message)
6. Submit - business owner will receive the lead

### For Business Owners:

1. Click "Sign Up" and choose "Business Owner" account type
2. After signup, login with your credentials
3. Click "Register Business" in the navbar
4. Fill in business details (name, category, location, etc.)
5. Submit to register your business on the platform
6. Your business will now be searchable by customers

### For Admin:

1. Go to `/admin/login` or click "Admin Login" on the login page
2. Login with admin credentials
3. View dashboard with:
   - Total businesses registered
   - Total leads generated
   - Detailed leads table
   - List of all registered businesses

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/me` - Get current user (Protected)

### Businesses

- `GET /api/businesses` - Get all businesses (Public)
- `GET /api/businesses/:id` - Get single business (Public)
- `POST /api/businesses` - Create business (Business Owner only)
- `PUT /api/businesses/:id` - Update business (Owner/Admin only)
- `DELETE /api/businesses/:id` - Delete business (Owner/Admin only)
- `GET /api/businesses/user/my-businesses` - Get user's businesses (Protected)

### Leads

- `POST /api/leads` - Create lead (Public)
- `GET /api/leads` - Get all leads (Admin only)
- `GET /api/leads/business/:businessId` - Get leads for a business (Owner/Admin)
- `PUT /api/leads/:id` - Update lead status (Owner/Admin)

## 🗂️ Project Structure

```
business-directory/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Business.js           # Business model
│   │   └── Lead.js               # Lead model
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── businesses.js         # Business routes
│   │   └── leads.js              # Lead routes
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server
│   └── package.json
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── Footer.jsx            # Footer
│   │   ├── BusinessCard.jsx      # Business card component
│   │   └── ProtectedRoute.jsx    # Route protection
│   ├── context/
│   │   ├── AuthContext.jsx       # Authentication context
│   │   └── BusinessContext.jsx   # Business data context
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── Login.jsx             # User login
│   │   ├── Signup.jsx            # User registration
│   │   ├── AdminLogin.jsx        # Admin login
│   │   ├── BusinessRegistration.jsx  # Register business
│   │   ├── SearchResults.jsx     # Search businesses
│   │   ├── BusinessProfile.jsx   # Business details
│   │   └── AdminDashboard.jsx    # Admin panel
│   ├── utils/
│   │   └── api.js                # Axios configuration
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # App entry point
├── package.json
└── README.md
```

## 🔧 Environment Variables

Backend `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/business-directory
JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345
ADMIN_EMAIL=admin@bizconnect.com
ADMIN_PASSWORD=admin123
```

## 🐛 Troubleshooting

### MongoDB Connection Error

- **Error**: `MongooseServerSelectionError: connect ECONNREFUSED`
- **Solution**: Make sure MongoDB is running:

  ```bash
  # Windows (check if service is running)
  net start MongoDB

  # Mac
  brew services start mongodb-community

  # Linux
  sudo systemctl start mongodb
  ```

### Port Already in Use

- **Error**: `Port 5000 is already in use`
- **Solution**: Change PORT in backend `.env` file or kill the process using that port

### CORS Error

- **Error**: `Access to fetch blocked by CORS policy`
- **Solution**: Make sure backend is running and CORS is configured correctly (already done)

## 📈 Future Enhancements

- [ ] Email notifications for new leads
- [ ] Payment integration for subscriptions
- [ ] Business analytics dashboard
- [ ] Image upload for businesses
- [ ] Reviews and ratings system
- [ ] Google Maps integration
- [ ] Mobile app
- [ ] SMS notifications

## 🙋‍♂️ Support

For issues or questions:

1. Check if MongoDB is running
2. Check if both frontend and backend servers are running
3. Check browser console for errors
4. Check backend terminal for errors

## 📄 License

MIT License - Feel free to use this project for learning or commercial purposes.

---

**Built with ❤️ using React, Node.js, Express, and MongoDB**
