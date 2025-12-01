# ORB 🍊 - Orange Recipe Book

A smart recipe discovery and management application that helps you cook with what you have at home.

## Vision

ORB is a modern recipe discovery platform that bridges the gap between your available ingredients and delicious meals. Instead of scrolling through endless recipes you can't make, ORB shows you exactly what you can cook with what's in your pantry, fridge, and freezer.

## Core Features

### Phase 1: MVP (Weeks 1-4)
- **Ingredient Management**: Input and manage your available ingredients
- **Recipe Discovery**: Browse recipes based on available ingredients
- **Smart Filtering**: Filter recipes by ingredients you have/need
- **Recipe Details**: View complete recipe information with ingredient availability status
- **Recipe Saving**: Save favorite recipes to a personal recipe book
- **Missing Ingredients List**: Generate shopping lists for recipes you want to cook

### Phase 2: Enhanced (Weeks 5-8)
- **Recipe Suggestions**: AI-powered suggestions based on your ingredients
- **Shopping Integration**: Connect with Mathom or other shopping apps
- **Notes Export**: Export missing ingredients to Notes, Notion, or other apps
- **Advanced Filtering**: Filter by cuisine, difficulty, cooking time, dietary restrictions
- **Recipe Collections**: Organize recipes into custom collections

### Phase 3: Social & Analytics (Future)
- **Community Recipes**: Share custom recipes with other users
- **Cooking History**: Track what you've cooked
- **Analytics**: Ingredient usage patterns and recommendations
- **Social Features**: Follow friends, share meal plans

## Tech Stack

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Theme**: next-themes (Light/Dark mode)

### Backend & Database
- **Backend**: Next.js API Routes & Server Actions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email/Password)
- **Real-time**: Supabase Real-time (if needed for future features)

### External APIs
- **Recipe Database**: Spoonacular API or similar
- **Shopping Apps**: Mathom API (to be integrated)
- **Note Apps**: Notion API (optional)

### Deployment
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions

## Project Structure

```
orb/
├── app/                           # Next.js app directory
│   ├── (auth)/                    # Authentication routes
│   │   ├── login/
│   │   ├── signup/
│   │   └── logout/
│   ├── (dashboard)/               # Protected dashboard routes
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Home/Dashboard
│   │   ├── recipes/
│   │   │   ├── page.tsx           # Recipe browser
│   │   │   └── [id]/              # Recipe details
│   │   ├── my-recipes/            # Saved recipes
│   │   ├── ingredients/           # Ingredient management
│   │   ├── shopping-list/
│   │   └── settings/
│   ├── api/                       # API routes
│   │   ├── recipes/
│   │   ├── ingredients/
│   │   ├── user/
│   │   └── shopping-list/
│   └── layout.tsx                 # Root layout
│
├── components/                    # Reusable React components
│   ├── auth/                      # Authentication components
│   ├── recipes/                   # Recipe-related components
│   ├── ingredients/               # Ingredient components
│   ├── ui/                        # shadcn/ui components
│   ├── layout/                    # Layout components (Header, Sidebar, etc.)
│   └── common/                    # Common utilities (Buttons, modals, etc.)
│
├── lib/                           # Utility functions
│   ├── supabase/                  # Supabase client & helpers
│   ├── api-clients/               # External API clients
│   ├── types.ts                   # TypeScript interfaces
│   ├── constants.ts               # App constants
│   └── utils.ts                   # Helper functions
│
├── hooks/                         # Custom React hooks
│   ├── useAuth.ts
│   ├── useRecipes.ts
│   ├── useIngredients.ts
│   └── useShoppingList.ts
│
├── public/                        # Static assets
│   ├── images/
│   └── icons/
│
├── styles/                        # Global styles
│   └── globals.css
│
├── docs/                          # Documentation
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_DOCUMENTATION.md
│   ├── WIREFRAMES.md
│   ├── IMPLEMENTATION_PHASES.md
│   └── DEPLOYMENT_GUIDE.md
│
├── .env.local.example             # Environment variables template
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Database Schema (Supabase PostgreSQL)

### Tables Overview

**users**
- id (UUID, PK)
- email (text, unique)
- full_name (text)
- created_at (timestamp)
- updated_at (timestamp)

**ingredients**
- id (UUID, PK)
- user_id (UUID, FK -> users)
- name (text)
- quantity (decimal)
- unit (text: "g", "ml", "cup", "tbsp", etc.)
- category (text: "pantry", "fridge", "freezer")
- expires_at (timestamp, nullable)
- created_at (timestamp)

**recipes** (from external API or user-created)
- id (UUID, PK)
- external_id (text, for API recipes)
- title (text)
- description (text)
- image_url (text)
- source (text: "spoonacular", "user", etc.)
- difficulty (text: "easy", "medium", "hard")
- cooking_time (integer, minutes)
- servings (integer)
- instructions (text)
- created_at (timestamp)

**recipe_ingredients** (junction table)
- id (UUID, PK)
- recipe_id (UUID, FK -> recipes)
- ingredient_name (text)
- quantity (decimal)
- unit (text)
- is_optional (boolean)

**saved_recipes** (user's recipe book)
- id (UUID, PK)
- user_id (UUID, FK -> users)
- recipe_id (UUID, FK -> recipes)
- collection_id (UUID, FK -> collections, nullable)
- notes (text)
- saved_at (timestamp)

**collections** (recipe collections/folders)
- id (UUID, PK)
- user_id (UUID, FK -> users)
- name (text)
- description (text)
- color (text, hex code)
- created_at (timestamp)

**shopping_lists** (exported shopping lists)
- id (UUID, PK)
- user_id (UUID, FK -> users)
- recipe_id (UUID, FK -> recipes)
- items (jsonb: [{ingredient, quantity, unit, bought}])
- exported_to (text: "notes", "notion", "mathom")
- created_at (timestamp)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A Supabase project
- Environment variables configured

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd orb
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
```

4. Configure your `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_RECIPE_API_KEY=your_recipe_api_key (optional)
```

5. Run database migrations
```bash
npm run db:migrate
```

6. Start development server
```bash
npm run dev
```

Visit `http://localhost:3000`

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run Biome linter
npm run format       # Run Biome formatter
npm run db:migrate   # Run database migrations
npm run db:reset     # Reset database (dev only)
```

## Implementation Phases

See [IMPLEMENTATION_PHASES.md](./docs/IMPLEMENTATION_PHASES.md) for detailed week-by-week breakdown.

## Architecture

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed technical architecture.

## Wireframes & Design

See [WIREFRAMES.md](./docs/WIREFRAMES.md) for UI/UX mockups.

## Database Schema Details

See [DATABASE_SCHEMA.md](./docs/DATABASE_SCHEMA.md) for comprehensive schema documentation.

## API Documentation

See [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) for API endpoint specifications.

## Deployment

See [DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md) for deployment instructions.

## Contributing

1. Create a feature branch
2. Commit changes with descriptive messages
3. Push to the branch
4. Create a Pull Request

## Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Barcode scanner for ingredient input
- [ ] AI-powered meal planning
- [ ] Nutrition information display
- [ ] Community recipe sharing
- [ ] Video recipe instructions
- [ ] Multi-language support
- [ ] Offline mode

## License

MIT

## Support

For issues and feature requests, please use the GitHub Issues page.

---

**Made with 🍊 for home cooks everywhere**