# Membership Management System

A comprehensive web application built with Next.js and MySQL for managing membership data with full CRUD operations.

## Features

### 🏠 Dashboard
- Overview of member statistics per category
- Quick action buttons for common tasks
- System overview with key metrics

### 👥 Members Management
- Add, edit, delete, and view member details
- Search and filter members
- Pagination for large datasets
- Category-based organization

### 🏷️ Categories Management
- Create and manage membership categories
- Edit category details and descriptions
- Delete categories (with safety checks)

### 📊 Reports
- Generate reports by different time periods (day, week, month, year)
- Custom date range filtering
- PDF export functionality (ready for implementation)
- Print-friendly layouts

## Technology Stack

- **Frontend**: Next.js 14 with React 18
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Styling**: Bootstrap 5, Custom CSS with blue/yellow theme
- **Icons**: Font Awesome
- **Font**: Segoe UI

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v5.7 or higher)
- XAMPP (recommended for local development)

### Step 1: Database Setup
1. Start XAMPP and ensure MySQL is running
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Create a new database called `membership_db`
4. Import the `database.sql` file or run the SQL commands manually

### Step 2: Project Setup
1. Navigate to your project directory:
   ```bash
   cd "C:\xampp\htdocs\web sistem membership"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update database configuration in `lib/db.js` if needed:
   ```javascript
   const dbConfig = {
     host: 'localhost',
     user: 'root',
     password: '', // Your MySQL password
     database: 'membership_db',
   };
   ```

### Step 3: Run the Application
```bash
npm run dev
```

The application will be available at: http://localhost:3000

## Project Structure

```
web sistem membership/
├── app/                   # Next.js App Router
│   ├── api/              # API Routes
│   │   ├── dashboard/
│   │   ├── members/
│   │   ├── categories/
│   │   └── reports/
│   ├── members/          # Members page
│   ├── categories/       # Categories page
│   ├── reports/          # Reports page
│   ├── layout.js         # Root layout
│   ├── page.js           # Dashboard page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── MemberModal.js    # Member modal component
│   └── CategoryModal.js  # Category modal component
├── lib/                  # Utilities
│   └── db.js            # Database connection
├── package.json          # Dependencies and scripts
├── next.config.js        # Next.js configuration
├── database.sql          # Database schema and sample data
└── README.md             # This file
```

## API Endpoints

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

### Members
- `GET /api/members` - List all members (with search and pagination)
- `POST /api/members` - Create new member
- `PUT /api/members/[id]` - Update member
- `DELETE /api/members/[id]` - Delete member

### Categories
- `GET /api/categories` - List all categories (with search and pagination)
- `POST /api/categories` - Create new category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category

### Reports
- `GET /api/reports` - Generate reports with filters

## Customization

### Theme Colors
The application uses a blue and yellow theme. To customize:

1. Edit `app/globals.css`
2. Update CSS variables in `:root`:
   ```css
   :root {
       --primary-blue: #007bff;
       --accent-yellow: #ffc107;
       /* ... other colors */
   }
   ```

### Font
The application uses Segoe UI font. To change:
1. Update the `@import` statement in `app/globals.css`
2. Update the `font-family` property in the body selector

## Features Implementation

### CRUD Operations
- ✅ Create: Add new members and categories
- ✅ Read: View, search, and filter data
- ✅ Update: Edit existing records
- ✅ Delete: Remove records with confirmation

### Additional Features
- ✅ Responsive design for mobile devices
- ✅ Pagination for large datasets
- ✅ Search and filtering
- ✅ Form validation
- ✅ Client-side state management
- ✅ Print-friendly layouts
- ✅ Font Awesome icons throughout

## Development

### Adding New Features
1. Create new API routes in `app/api/`
2. Add corresponding pages in `app/` directory
3. Create components in `components/` directory
4. Update navigation in `app/layout.js`

### Database Modifications
1. Update the schema in `database.sql`
2. Modify the corresponding API routes in `app/api/`
3. Update the components to reflect new fields

## Next.js Specific Features

### App Router
- Uses Next.js 14 App Router for modern routing
- Server and client components separation
- Built-in API routes

### Performance
- Automatic code splitting
- Image optimization
- Static generation where possible

### Development Experience
- Hot reloading
- TypeScript support (optional)
- Built-in ESLint configuration

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running in XAMPP
   - Check database credentials in `lib/db.js`
   - Verify database `membership_db` exists

2. **Port Already in Use**
   - Next.js runs on port 3000 by default
   - Use `npm run dev -- -p 3001` to run on different port

3. **Module Not Found**
   - Run `npm install` to install dependencies
   - Check if all dependencies are listed in `package.json`

4. **Build Errors**
   - Run `npm run build` to check for build errors
   - Check console for specific error messages

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is open source and available under the MIT License.

## Support

For support or questions, please check the documentation or create an issue in the project repository.

