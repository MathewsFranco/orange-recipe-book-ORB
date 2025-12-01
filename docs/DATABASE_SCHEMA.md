# ORB Database Schema 🗄️

Complete PostgreSQL schema documentation for the Orange Recipe Book application.

## Table of Contents

1. [Overview](#overview)
2. [Schema Diagram](#schema-diagram)
3. [Detailed Table Definitions](#detailed-table-definitions)
4. [Relationships](#relationships)
5. [Indexes](#indexes)
6. [Row Level Security Policies](#row-level-security-policies)
7. [Database Functions](#database-functions)
8. [Migration Guide](#migration-guide)
9. [Performance Considerations](#performance-considerations)

---

## Overview

The ORB database is built on **PostgreSQL** hosted on **Supabase**. It consists of 8 main tables that manage users, recipes, ingredients, and shopping lists.

### Design Principles

- **Normalization**: Follows 3NF to reduce redundancy
- **Data Integrity**: Constraints and foreign keys ensure data consistency
- **Security**: Row Level Security (RLS) policies protect user data
- **Performance**: Strategic indexes for common queries
- **Scalability**: Design supports growth without major changes
- **Auditability**: Timestamps track data changes

---

## Schema Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS DOMAIN                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  auth.users (managed by Supabase Auth)                           │
│  ┌─────────────────────────────────────────────────┐             │
│  │ id (UUID) - PK                                  │             │
│  │ email (text) - unique                           │             │
│  │ email_confirmed_at (timestamp)                  │             │
│  │ password_hash (text)                            │             │
│  │ created_at (timestamp)                          │             │
│  │ updated_at (timestamp)                          │             │
│  └─────────────────────────────────────────────────┘             │
│                       ▲                                           │
│                       │ (1:1)                                    │
│                       │                                           │
│  public.users ◄───────┘                                           │
│  ┌─────────────────────────────────────────────────┐             │
│  │ id (UUID) - PK, FK to auth.users                │             │
│  │ email (text) - unique                           │             │
│  │ full_name (text)                                │             │
│  │ avatar_url (text)                               │             │
│  │ preferences (JSONB) - dietary, theme, etc.     │             │
│  │ created_at (timestamp)                          │             │
│  │ updated_at (timestamp)                          │             │
│  └─────────────────────────────────────────────────┘             │
│                       │                                           │
│        ┌──────────────┼──────────────┬───────────────┐           │
│        │              │              │               │           │
│        │ (1:N)        │ (1:N)        │ (1:N)         │           │
│        │              │              │               │           │
│        ▼              ▼              ▼               ▼           │
│                                                                   │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐            │
│  │ ingredients  │  │collections  │  │saved_recipes │            │
│  └──────────────┘  └─────────────┘  └──────────────┘            │
│                                                                   │
│  ┌───────────────────────┐                                       │
│  │ shopping_lists (1:N)  │                                       │
│  └───────────────────────┘                                       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                       RECIPES DOMAIN                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  recipes (Public - readable by all)                              │
│  ┌─────────────────────────────────────────────────┐             │
│  │ id (UUID) - PK                                  │             │
│  │ external_id (text) - nullable, from API         │             │
│  │ title (text)                                    │             │
│  │ description (text)                              │             │
│  │ image_url (text)                                │             │
│  │ source (text) - 'spoonacular', 'user', etc.    │             │
│  │ difficulty (text) - easy, medium, hard          │             │
│  │ cooking_time (integer) - minutes                │             │
│  │ servings (integer)                              │             │
│  │ cuisine (text)                                  │             │
│  │ instructions (text)                             │             │
│  │ created_at (timestamp)                          │             │
│  │ updated_at (timestamp)                          │             │
│  └─────────────────────────────────────────────────┘             │
│                       │                                           │
│                       │ (1:N)                                    │
│                       │                                           │
│                       ▼                                           │
│                                                                   │
│  recipe_ingredients (Junction Table)                             │
│  ┌─────────────────────────────────────────────────┐             │
│  │ id (UUID) - PK                                  │             │
│  │ recipe_id (UUID) - FK to recipes                │             │
│  │ ingredient_name (text)                          │             │
│  │ quantity (decimal)                              │             │
│  │ unit (text) - g, ml, cup, tbsp, etc.           │             │
│  │ is_optional (boolean)                           │             │
│  │ created_at (timestamp)                          │             │
│  └─────────────────────────────────────────────────┘             │
│                       │                                           │
│        ┌──────────────┼──────────────┐                           │
│        │              │              │                           │
│        │ (N:1)        │ (N:1)        │ (N:1)                     │
│        │              │              │                           │
│        ▼              ▼              ▼                           │
│                                                                   │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐            │
│  │saved_recipes │  │collections  │  │shopping_lists│            │
│  └──────────────┘  └─────────────┘  └──────────────┘            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Detailed Table Definitions

### 1. auth.users (Supabase Auth - Auto-Managed)

**Description**: Managed by Supabase Authentication. DO NOT modify directly.

```sql
CREATE TABLE auth.users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  email_confirmed_at TIMESTAMP WITH TIME ZONE,
  phone TEXT UNIQUE,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  password_hash TEXT NOT NULL,
  email_change_token_new TEXT,
  email_change TIMESTAMP WITH TIME ZONE,
  invited_at TIMESTAMP WITH TIME ZONE,
  action_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_sign_in_at TIMESTAMP WITH TIME ZONE,
  raw_app_meta_data JSONB,
  raw_user_meta_data JSONB,
  is_super_admin BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMP WITH TIME ZONE
);
```

---

### 2. users (Extended User Profile)

**Description**: Extends `auth.users` with additional user profile information.

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  preferences JSONB DEFAULT '{}' CHECK (
    jsonb_typeof(preferences) = 'object'
  ),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Fields**:
- `id`: UUID - Primary key, references auth.users
- `email`: TEXT - Unique email address (denormalized for easy access)
- `full_name`: TEXT - User's display name
- `avatar_url`: TEXT - URL to profile picture
- `bio`: TEXT - User biography (optional)
- `preferences`: JSONB - User settings:
  ```json
  {
    "theme": "light|dark|system",
    "language": "en|es|fr",
    "dietaryRestrictions": ["vegetarian", "vegan", "gluten-free"],
    "allergies": ["peanuts", "shellfish"],
    "notifications": {
      "email": true,
      "push": false
    },
    "default_servings": 4
  }
  ```
- `created_at`: TIMESTAMP - Account creation timestamp
- `updated_at`: TIMESTAMP - Last update timestamp

**Indexes**:
```sql
CREATE UNIQUE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_created_at ON public.users(created_at);
```

---

### 3. ingredients (User Inventory)

**Description**: Stores each user's personal ingredient inventory.

```sql
CREATE TABLE public.ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'unit' CHECK (
    unit IN ('g', 'kg', 'mg', 'ml', 'l', 'cup', 'tbsp', 'tsp', 
             'oz', 'lb', 'pt', 'qt', 'unit', 'pinch', 'handful')
  ),
  category TEXT NOT NULL DEFAULT 'pantry' CHECK (
    category IN ('pantry', 'fridge', 'freezer', 'other')
  ),
  expires_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, name)
);
```

**Fields**:
- `id`: UUID - Primary key
- `user_id`: UUID - Foreign key to users
- `name`: TEXT - Ingredient name (e.g., "Chicken Breast", "Olive Oil")
- `quantity`: DECIMAL - Amount available
- `unit`: TEXT - Unit of measurement
- `category`: TEXT - Storage location
- `expires_at`: TIMESTAMP - Optional expiration date
- `notes`: TEXT - User notes (e.g., "organic", "homemade")
- `created_at`: TIMESTAMP - Creation timestamp
- `updated_at`: TIMESTAMP - Last update timestamp

**Indexes**:
```sql
CREATE INDEX idx_ingredients_user_id ON public.ingredients(user_id);
CREATE INDEX idx_ingredients_name ON public.ingredients(name);
CREATE INDEX idx_ingredients_expires_at ON public.ingredients(expires_at);
CREATE INDEX idx_ingredients_user_category ON public.ingredients(user_id, category);
```

---

### 4. recipes (Recipe Database)

**Description**: Stores recipe information. Can be from external APIs or user-created.

```sql
CREATE TABLE public.recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  source TEXT DEFAULT 'manual' CHECK (
    source IN ('spoonacular', 'edamam', 'manual', 'user')
  ),
  difficulty TEXT DEFAULT 'medium' CHECK (
    difficulty IN ('easy', 'medium', 'hard')
  ),
  cooking_time INTEGER,
  prep_time INTEGER,
  servings INTEGER DEFAULT 4,
  cuisine TEXT,
  instructions TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Fields**:
- `id`: UUID - Primary key
- `external_id`: TEXT - ID from external API (unique if present)
- `title`: TEXT - Recipe name
- `description`: TEXT - Recipe description/summary
- `image_url`: TEXT - URL to recipe image
- `source`: TEXT - Where recipe came from
- `difficulty`: TEXT - Difficulty level
- `cooking_time`: INTEGER - Minutes to cook
- `prep_time`: INTEGER - Minutes to prepare
- `servings`: INTEGER - Number of servings
- `cuisine`: TEXT - Cuisine type (Italian, Mexican, Asian, etc.)
- `instructions`: TEXT - Cooking instructions (supports markdown)
- `created_at`: TIMESTAMP - Creation timestamp
- `updated_at`: TIMESTAMP - Last update timestamp

**Indexes**:
```sql
CREATE UNIQUE INDEX idx_recipes_external_id ON public.recipes(external_id);
CREATE INDEX idx_recipes_title ON public.recipes(title);
CREATE INDEX idx_recipes_title_fts ON public.recipes USING gin(
  to_tsvector('english', title)
);
CREATE INDEX idx_recipes_description_fts ON public.recipes USING gin(
  to_tsvector('english', description)
);
CREATE INDEX idx_recipes_cuisine ON public.recipes(cuisine);
CREATE INDEX idx_recipes_difficulty ON public.recipes(difficulty);
```

---

### 5. recipe_ingredients (Junction Table)

**Description**: Maps ingredients to recipes with quantities.

```sql
CREATE TABLE public.recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  ingredient_name TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit TEXT NOT NULL CHECK (
    unit IN ('g', 'kg', 'mg', 'ml', 'l', 'cup', 'tbsp', 'tsp',
             'oz', 'lb', 'pt', 'qt', 'unit', 'pinch', 'handful')
  ),
  is_optional BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(recipe_id, ingredient_name)
);
```

**Fields**:
- `id`: UUID - Primary key
- `recipe_id`: UUID - Foreign key to recipes
- `ingredient_name`: TEXT - Name of ingredient needed
- `quantity`: DECIMAL - Amount needed
- `unit`: TEXT - Unit of measurement
- `is_optional`: BOOLEAN - Whether ingredient is optional
- `notes`: TEXT - Notes about ingredient (e.g., "finely chopped")
- `created_at`: TIMESTAMP - Creation timestamp

**Indexes**:
```sql
CREATE INDEX idx_recipe_ingredients_recipe_id ON public.recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_ingredient_name ON public.recipe_ingredients(ingredient_name);
```

---

### 6. saved_recipes (User's Cookbook)

**Description**: Tracks which recipes users have saved.

```sql
CREATE TABLE public.saved_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
  notes TEXT,
  is_favorite BOOLEAN DEFAULT FALSE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);
```

**Fields**:
- `id`: UUID - Primary key
- `user_id`: UUID - Foreign key to users
- `recipe_id`: UUID - Foreign key to recipes
- `collection_id`: UUID - Optional foreign key to collections
- `notes`: TEXT - User's personal notes about recipe
- `is_favorite`: BOOLEAN - Marked as favorite
- `saved_at`: TIMESTAMP - When recipe was saved
- `updated_at`: TIMESTAMP - Last update timestamp

**Indexes**:
```sql
CREATE INDEX idx_saved_recipes_user_id ON public.saved_recipes(user_id);
CREATE INDEX idx_saved_recipes_recipe_id ON public.saved_recipes(recipe_id);
CREATE INDEX idx_saved_recipes_collection_id ON public.saved_recipes(collection_id);
CREATE INDEX idx_saved_recipes_is_favorite ON public.saved_recipes(is_favorite);
CREATE INDEX idx_saved_recipes_user_favorite ON public.saved_recipes(user_id, is_favorite);
```

---

### 7. collections (Recipe Collections/Folders)

**Description**: Allows users to organize recipes into collections.

```sql
CREATE TABLE public.collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3b82f6' CHECK (
    color ~ '^#[0-9A-Fa-f]{6}$'
  ),
  emoji TEXT DEFAULT '📁',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, name)
);
```

**Fields**:
- `id`: UUID - Primary key
- `user_id`: UUID - Foreign key to users
- `name`: TEXT - Collection name
- `description`: TEXT - Collection description
- `color`: TEXT - Hex color code for UI
- `emoji`: TEXT - Emoji for collection (optional)
- `created_at`: TIMESTAMP - Creation timestamp
- `updated_at`: TIMESTAMP - Last update timestamp

**Indexes**:
```sql
CREATE INDEX idx_collections_user_id ON public.collections(user_id);
CREATE INDEX idx_collections_created_at ON public.collections(created_at);
```

---

### 8. shopping_lists (Generated Shopping Lists)

**Description**: Stores shopping lists generated from recipes.

```sql
CREATE TABLE public.shopping_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE SET NULL,
  title TEXT,
  items JSONB NOT NULL DEFAULT '[]' CHECK (
    jsonb_typeof(items) = 'array'
  ),
  exported_to TEXT,
  export_format TEXT DEFAULT 'plain_text' CHECK (
    export_format IN ('plain_text', 'markdown', 'notion', 'json')
  ),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Fields**:
- `id`: UUID - Primary key
- `user_id`: UUID - Foreign key to users
- `recipe_id`: UUID - Optional reference to original recipe
- `title`: TEXT - Shopping list title
- `items`: JSONB - Array of shopping list items:
  ```json
  [
    {
      "id": "uuid",
      "ingredient": "Chicken Breast",
      "quantity": 2,
      "unit": "pieces",
      "category": "meat",
      "checked": false,
      "notes": "organic if possible"
    },
    {
      "id": "uuid",
      "ingredient": "Olive Oil",
      "quantity": 3,
      "unit": "tbsp",
      "category": "oils",
      "checked": true
    }
  ]
  ```
- `exported_to`: TEXT - Where list was exported (Notion, Notes, etc.)
- `export_format`: TEXT - Format used for export
- `created_at`: TIMESTAMP - Creation timestamp
- `updated_at`: TIMESTAMP - Last update timestamp

**Indexes**:
```sql
CREATE INDEX idx_shopping_lists_user_id ON public.shopping_lists(user_id);
CREATE INDEX idx_shopping_lists_recipe_id ON public.shopping_lists(recipe_id);
CREATE INDEX idx_shopping_lists_created_at ON public.shopping_lists(created_at);
```

---

## Relationships

### One-to-Many Relationships

1. **users → ingredients**
   - One user has many ingredients
   - Cascade delete: When user is deleted, their ingredients are deleted

2. **users → collections**
   - One user has many collections
   - Cascade delete: When user is deleted, their collections are deleted

3. **users → saved_recipes**
   - One user has many saved recipes
   - Cascade delete: When user is deleted, their saved recipes are deleted

4. **users → shopping_lists**
   - One user has many shopping lists
   - Cascade delete: When user is deleted, their shopping lists are deleted

5. **recipes → recipe_ingredients**
   - One recipe has many ingredients
   - Cascade delete: When recipe is deleted, its ingredients are deleted

6. **recipes → saved_recipes**
   - One recipe can be saved by many users
   - Set null: When recipe is deleted, saved_recipes row is deleted

7. **collections → saved_recipes**
   - One collection has many saved recipes
   - Set null: When collection is deleted, saved_recipes.collection_id becomes NULL

### Many-to-Many Relationships

1. **users ←→ recipes (through saved_recipes)**
   - Users can save many recipes
   - Recipes can be saved by many users

---

## Indexes

### Performance Optimization Indexes

```sql
-- Users
CREATE UNIQUE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_created_at ON public.users(created_at);

-- Ingredients
CREATE INDEX idx_ingredients_user_id ON public.ingredients(user_id);
CREATE INDEX idx_ingredients_name ON public.ingredients(name);
CREATE INDEX idx_ingredients_expires_at ON public.ingredients(expires_at);
CREATE INDEX idx_ingredients_category ON public.ingredients(category);
CREATE INDEX idx_ingredients_user_category ON public.ingredients(user_id, category);

-- Recipes
CREATE UNIQUE INDEX idx_recipes_external_id ON public.recipes(external_id);
CREATE INDEX idx_recipes_title ON public.recipes(title);
CREATE INDEX idx_recipes_cuisine ON public.recipes(cuisine);
CREATE INDEX idx_recipes_difficulty ON public.recipes(difficulty);
CREATE INDEX idx_recipes_source ON public.recipes(source);

-- Recipe Ingredients
CREATE INDEX idx_recipe_ingredients_recipe_id ON public.recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_ingredient_name ON public.recipe_ingredients(ingredient_name);

-- Saved Recipes
CREATE INDEX idx_saved_recipes_user_id ON public.saved_recipes(user_id);
CREATE INDEX idx_saved_recipes_recipe_id ON public.saved_recipes(recipe_id);
CREATE INDEX idx_saved_recipes_collection_id ON public.saved_recipes(collection_id);
CREATE INDEX idx_saved_recipes_user_favorite ON public.saved_recipes(user_id, is_favorite);

-- Collections
CREATE INDEX idx_collections_user_id ON public.collections(user_id);

-- Shopping Lists
CREATE INDEX idx_shopping_lists_user_id ON public.shopping_lists(user_id);
CREATE INDEX idx_shopping_lists_created_at ON public.shopping_lists(created_at);
```

### Full-Text Search Indexes

```sql
-- Recipe searching
CREATE INDEX idx_recipes_title_fts ON public.recipes USING gin(
  to_tsvector('english', title)
);
CREATE INDEX idx_recipes_description_fts ON public.recipes USING gin(
  to_tsvector('english', description)
);
```

---

## Row Level Security Policies

### Enable RLS on All Tables

```sql
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_lists ENABLE ROW LEVEL SECURITY;
```

### Users Table Policies

```sql
-- Users can only access their own profile
CREATE POLICY "Users can access own profile"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Enable service role to query users
CREATE POLICY "Service role can access all users"
  ON public.users
  FOR SELECT
  USING (auth.role() = 'service_role');
```

### Ingredients Table Policies

```sql
-- Users can only see their own ingredients
CREATE POLICY "Users can view own ingredients"
  ON public.ingredients
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert ingredients
CREATE POLICY "Users can insert own ingredients"
  ON public.ingredients
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own ingredients
CREATE POLICY "Users can update own ingredients"
  ON public.ingredients
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own ingredients
CREATE POLICY "Users can delete own ingredients"
  ON public.ingredients
  FOR DELETE
  USING (auth.uid() = user_id);
```

### Recipes Table Policies

```sql
-- Everyone can view recipes
CREATE POLICY "Recipes are publicly viewable"
  ON public.recipes
  FOR SELECT
  USING (true);

-- Only service role can modify recipes
CREATE POLICY "Service role can manage recipes"
  ON public.recipes
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
```

### Recipe Ingredients Table Policies

```sql
-- Everyone can view recipe ingredients
CREATE POLICY "Recipe ingredients are public"
  ON public.recipe_ingredients
  FOR SELECT
  USING (true);

-- Service role can manage
CREATE POLICY "Service role can manage recipe ingredients"
  ON public.recipe_ingredients
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
```

### Saved Recipes Table Policies

```sql
-- Users can view their own saved recipes
CREATE POLICY "Users can view own saved recipes"
  ON public.saved_recipes
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert saved recipes
CREATE POLICY "Users can save recipes"
  ON public.saved_recipes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their saved recipes
CREATE POLICY "Users can update own saved recipes"
  ON public.saved_recipes
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their saved recipes
CREATE POLICY "Users can unsave recipes"
  ON public.saved_recipes
  FOR DELETE
  USING (auth.uid() = user_id);
```

### Collections Table Policies

```sql
-- Users can view their own collections
CREATE POLICY "Users can view own collections"
  ON public.collections
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create collections
CREATE POLICY "Users can create collections"
  ON public.collections
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their collections
CREATE POLICY "Users can update own collections"
  ON public.collections
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their collections
CREATE POLICY "Users can delete own collections"
  ON public.collections
  FOR DELETE
  USING (auth.uid() = user_id);
```

### Shopping Lists Table Policies

```sql
-- Users can view their own shopping lists
CREATE POLICY "Users can view own shopping lists"
  ON public.shopping_lists
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create shopping lists
CREATE POLICY "Users can create shopping lists"
  ON public.shopping_lists
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their shopping lists
CREATE POLICY "Users can update own shopping lists"
  ON public.shopping_lists
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their shopping lists
CREATE POLICY "Users can delete own shopping lists"
  ON public.shopping_lists
  FOR DELETE
  USING (auth.uid() = user_id);
```

---

## Database Functions

### Calculate Recipe Availability

```sql
CREATE OR REPLACE FUNCTION calculate_recipe_availability(
  p_recipe_id UUID,
  p_user_id UUID
)
RETURNS TABLE (
  total_ingredients INT,
  available_ingredients INT,
  percentage DECIMAL,
  can_cook_now BOOLEAN,
  missing_ingredients JSONB
) AS $$
DECLARE
  v_total INT;
  v_available INT;
  v_percentage DECIMAL;
  v_missing JSONB;
BEGIN
  -- Get all ingredients for recipe
  SELECT COUNT(*) INTO v_total
  FROM recipe_ingredients
  WHERE recipe_id = p_recipe_id;

  -- Get matching user ingredients
  SELECT COUNT(*) INTO v_available
  FROM recipe_ingredients ri
  WHERE ri.recipe_id = p_recipe_id
    AND LOWER(ri.ingredient_name) IN (
      SELECT LOWER(i.name)
      FROM ingredients i
      WHERE i.user_id = p_user_id
    );

  -- Calculate percentage
  v_percentage := CASE
    WHEN v_total = 0 THEN 0
    ELSE (v_available::DECIMAL / v_total) * 100
  END;

  -- Get missing ingredients
  SELECT jsonb_agg(jsonb_build_object(
    'ingredient', ingredient_name,
    'quantity', quantity,
    'unit', unit,
    'is_optional', is_optional
  )) INTO v_missing
  FROM recipe_ingredients
  WHERE recipe_id = p_recipe_id
    AND LOWER(ingredient_name) NOT IN (
      SELECT LOWER(name)
      FROM ingredients
      WHERE user_id = p_user_id
    );

  RETURN QUERY
  SELECT
    v_total,
    v_available,
    v_percentage,
    v_percentage = 100,
    COALESCE(v_missing, '[]'::jsonb);
END;
$$ LANGUAGE plpgsql;
```

### Get Available Recipes

```sql
CREATE OR REPLACE FUNCTION get_available_recipes(
  p_user_id UUID,
  p_min_availability INT DEFAULT 0
)
RETURNS TABLE (
  recipe_id UUID,
  title TEXT,
  availability_percentage DECIMAL,
  can_cook_now BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.title,
    calculate_recipe_availability(r.id, p_user_id).percentage,
    calculate_recipe_availability(r.id, p_user_id).can_cook_now
  FROM recipes r
  WHERE calculate_recipe_availability(r.id, p_user_id).percentage >= p_min_availability
  ORDER BY calculate_recipe_availability(r.id, p_user_id).percentage DESC;
END;
$$ LANGUAGE plpgsql;
```

---

## Migration Guide

### Initial Setup

```sql
-- 1. Create users table
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create recipes table
CREATE TABLE public.recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  source TEXT DEFAULT 'manual',
  difficulty TEXT DEFAULT 'medium',
  cooking_time INTEGER,
  prep_time INTEGER,
  servings INTEGER DEFAULT 4,
  cuisine TEXT,
  instructions TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create remaining tables...
-- (Continue with each table definition above)

-- 4. Add indexes
-- (Add all indexes from Indexes section)

-- 5. Enable RLS
-- (Enable RLS on all tables)

-- 6. Add RLS policies
-- (Add all policies from RLS Policies section)

-- 7. Create functions
-- (Add all functions from Functions section)
```

### Seed Data

```sql
-- Insert sample recipes
INSERT INTO recipes (title, description, cuisine, difficulty, cooking_time, servings, instructions)
VALUES
  ('Classic Pasta Carbonara', 'Traditional Italian pasta with eggs and bacon', 'Italian', 'medium', 20, 4, 'Boil pasta. Fry bacon. Mix eggs with cheese. Combine all.'),
  ('Chicken Stir Fry', 'Quick and easy Asian-inspired dish', 'Asian', 'easy', 15, 2, 'Slice chicken. Cook with vegetables. Add sauce.');

-- Insert sample recipe ingredients
INSERT INTO recipe_ingredients (recipe_id, ingredient_name, quantity, unit, is_optional)
VALUES
  ((SELECT id FROM recipes WHERE title = 'Classic Pasta Carbonara'), 'Pasta', 400, 'g', FALSE),
  ((SELECT id FROM recipes WHERE title = 'Classic Pasta Carbonara'), 'Eggs', 4, 'unit', FALSE),
  ((SELECT id FROM recipes WHERE title = 'Classic Pasta Carbonara'), 'Bacon', 200, 'g', FALSE),
  ((SELECT id FROM recipes WHERE title = 'Chicken Stir Fry'), 'Chicken Breast', 2, 'pieces', FALSE),
  ((SELECT id FROM recipes WHERE title = 'Chicken Stir Fry'), 'Soy Sauce', 3, 'tbsp', FALSE);
```

---

## Performance Considerations

### Query Performance Tips

1. **Use Indexes**: Always filter by indexed columns
   ```sql
   SELECT * FROM ingredients WHERE user_id = $1 AND category = $2;
   -- Both user_id and category are indexed
   ```

2. **Avoid N+1 Queries**: Use JOINs instead of loops
   ```sql
   -- Bad: Multiple queries in application loop
   SELECT * FROM recipes WHERE id IN (recipe_ids);
   FOR EACH recipe_id:
     SELECT * FROM recipe_ingredients WHERE recipe_id = recipe_id;

   -- Good: Single query with JOIN
   SELECT r.*, ri.*
   FROM recipes r
   LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
   WHERE r.id IN (recipe_ids);
   ```

3. **Pagination**: Use LIMIT and OFFSET for large result sets
   ```sql
   SELECT * FROM recipes
   LIMIT 20 OFFSET (page - 1) * 20;
   ```

4. **Denormalization**: For frequently accessed data
   - User preferences stored as JSONB
   - Shopping list items stored as JSONB array

### Monitoring

Monitor these metrics in production:

- Slow queries (> 1 second)
- Query count per request
- Database connection pool usage
- Disk space and backup status
- Row counts per table

### Scaling Strategy

1. **Phase 1** (10K users): Current schema works fine
2. **Phase 2** (100K users): Add read replicas, implement caching
3. **Phase 3** (1M+ users): Shard by user_id, separate services

---

**Last Updated**: January 2025
**Version**: 1.0
**Status**: Ready for Implementation