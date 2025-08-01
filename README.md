# Admin Analytics Dashboard

A comprehensive, modern admin dashboard template built with React, TypeScript, and Tailwind CSS. Features real-time analytics, data visualization, user management, and a complete authentication system.

![Dashboard Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop)

## ✨ Features

### 🎯 Core Features
- **Real-time Analytics** - Interactive charts and KPI monitoring
- **Data Visualization** - Beautiful charts with Chart.js integration
- **User Management** - Complete user administration system
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode** - Theme switching with system preference detection
- **Advanced Search** - Global search with keyboard shortcuts (Ctrl+K)
- **Notifications** - Real-time notification system
- **Export Functionality** - Export data to CSV, PDF, and Excel

### 🔐 Authentication System
- **Demo Mode** - Pre-configured with mock authentication for testing
- **Multiple Login Options** - Email/password, Google, and GitHub OAuth
- **Password Reset** - Complete password recovery flow
- **Profile Management** - User profile editing with avatar upload
- **Role-based Access** - Admin, Manager, and User roles

### 📊 Dashboard Pages
- **Overview Dashboard** - Key metrics and performance indicators
- **Analytics** - Detailed analytics with interactive charts
- **Users Management** - User administration and role management
- **Orders** - Order tracking and management
- **Payments** - Payment processing and transaction history
- **Reports** - Comprehensive reporting system
- **Settings** - Application configuration and preferences

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admin-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials

The template comes with pre-configured demo accounts:

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | password123 | Admin |
| demo@example.com | demo123 | Manager |
| user@example.com | user123 | User |

You can also:
- Create new accounts through the registration form
- Use the "Continue with Google/GitHub" demo buttons
- Test the password reset functionality

## 🔧 Customization

### Replacing Mock Authentication

The template uses a mock authentication system for demo purposes. To integrate with a real backend:

#### Option 1: Supabase Integration

1. **Install Supabase**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Replace mock auth context**
   - Update `src/App.tsx` to use `AuthProvider` instead of `MockAuthProvider`
   - Replace `MockProtectedRoute` with `ProtectedRoute`
   - Update components to import from `contexts/AuthContext`

4. **Set up Supabase tables**
   ```sql
   -- Create profiles table
   create table profiles (
     id uuid references auth.users on delete cascade,
     full_name text,
     avatar_url text,
     role text default 'User',
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
     primary key (id)
   );
   ```

#### Option 2: Firebase Integration

1. **Install Firebase**
   ```bash
   npm install firebase
   ```

2. **Configure Firebase**
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```

3. **Create Firebase auth context**
   ```typescript
   // src/contexts/FirebaseAuthContext.tsx
   import { initializeApp } from 'firebase/app'
   import { getAuth } from 'firebase/auth'
   
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
   }
   
   const app = initializeApp(firebaseConfig)
   export const auth = getAuth(app)
   ```

#### Option 3: NextAuth.js Integration

1. **Install NextAuth.js** (for Next.js projects)
   ```bash
   npm install next-auth
   ```

2. **Configure providers**
   ```typescript
   // pages/api/auth/[...nextauth].ts
   import NextAuth from 'next-auth'
   import GoogleProvider from 'next-auth/providers/google'
   
   export default NextAuth({
     providers: [
       GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
       }),
     ],
   })
   ```

### Customizing the Theme

1. **Update colors in `tailwind.config.cjs`**
   ```javascript
   module.exports = {
     theme: {
       extend: {
         colors: {
           primary: {
             50: '#eff6ff',
             500: '#3b82f6',
             900: '#1e3a8a',
           },
         },
       },
     },
   }
   ```

2. **Modify CSS variables in `src/index.css`**
   ```css
   :root {
     --primary: 221 83% 53%;
     --accent: 142 76% 36%;
   }
   ```

### Adding New Pages

1. **Create page component**
   ```typescript
   // src/components/dashboard/NewPage.tsx
   import React from 'react'
   
   const NewPage: React.FC = () => {
     return (
       <div className="space-y-6">
         <h1 className="text-3xl font-bold">New Page</h1>
         {/* Your content */}
       </div>
     )
   }
   
   export default NewPage
   ```

2. **Add route in `src/App.tsx`**
   ```typescript
   <Route path="new-page" element={<NewPage />} />
   ```

3. **Update sidebar navigation**
   ```typescript
   // src/components/dashboard/Sidebar.tsx
   const navigation = [
     // ... existing items
     { name: 'New Page', href: '/new-page', icon: YourIcon },
   ]
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/                 # Authentication components
│   │   ├── MockAuthFlow.tsx     # Demo auth flow
│   │   ├── MockLoginPage.tsx    # Demo login page
│   │   └── MockProtectedRoute.tsx # Route protection
│   ├── dashboard/            # Dashboard pages and components
│   │   ├── Dashboard.tsx        # Main dashboard
│   │   ├── Header.tsx          # Top navigation
│   │   ├── Sidebar.tsx         # Side navigation
│   │   └── ...                 # Other dashboard pages
│   └── ui/                   # Reusable UI components
├── contexts/                 # React contexts
│   ├── MockAuthContext.tsx     # Demo authentication
│   └── ThemeContext.tsx        # Theme management
├── hooks/                    # Custom React hooks
├── lib/                      # Utility libraries
└── data/                     # Mock data and constants
```

## 🛠 Built With

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Shadcn/ui** - UI component library
- **Framer Motion** - Animations
- **Chart.js** - Data visualization
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icons

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🔒 Security Features

- **Input Validation** - All forms use Zod schema validation
- **XSS Protection** - Sanitized user inputs
- **CSRF Protection** - Built-in CSRF token handling
- **Secure Headers** - Security headers configuration
- **Role-based Access** - Route-level permission checking

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop** - Full-featured layout with sidebar
- **Tablet** - Collapsible sidebar with touch-friendly controls
- **Mobile** - Bottom navigation and optimized layouts

## 🎨 Design System

The template follows a consistent design system:
- **Typography** - Inter font family with proper hierarchy
- **Colors** - Carefully chosen color palette with dark mode support
- **Spacing** - Consistent spacing scale using Tailwind
- **Components** - Reusable components with proper variants

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the demo implementation

## 🎯 Roadmap

- [ ] Real-time WebSocket integration
- [ ] Advanced filtering and search
- [ ] Multi-language support (i18n)
- [ ] Advanced role permissions
- [ ] API documentation
- [ ] Mobile app version
- [ ] Advanced analytics features
- [ ] Integration with popular services

---

**Made with ❤️ for the developer community**