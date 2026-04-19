-- ORB — Supabase schema setup
-- Run manually in the Supabase Dashboard SQL editor (Settings → SQL Editor)
-- Scope: users, ingredients, recipes, recipe_ingredients, saved_recipes
-- Collections and shopping_lists are Phase 3+

-- ─────────────────────────────────────────────────────────────────────────────
-- 0. WIPE existing public schema objects (safe reset)
-- ─────────────────────────────────────────────────────────────────────────────
-- WARNING: DESTROYS ALL DATA IN LISTED TABLES.
-- Only run this on a fresh/dev environment.
-- Comment out the block below to skip the wipe.

DROP TABLE IF EXISTS public.saved_recipes     CASCADE;
DROP TABLE IF EXISTS public.ingredients        CASCADE;
DROP TABLE IF EXISTS public.recipe_ingredients CASCADE;
DROP TABLE IF EXISTS public.recipes            CASCADE;
DROP TABLE IF EXISTS public.users              CASCADE;

DROP FUNCTION IF EXISTS public.handle_new_user()  CASCADE;
DROP FUNCTION IF EXISTS public.set_updated_at()   CASCADE;

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. TABLES
-- ─────────────────────────────────────────────────────────────────────────────

-- 1a. users — mirrors auth.users, auto-populated by trigger
CREATE TABLE public.users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT UNIQUE NOT NULL,
  full_name   TEXT,
  avatar_url  TEXT,
  bio         TEXT,
  preferences JSONB DEFAULT '{}' CHECK (jsonb_typeof(preferences) = 'object'),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1b. recipes — public, read-only for anon; all writes via service role
--     source 'user' removed: user-created recipes not supported in Phase 0
CREATE TABLE public.recipes (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id  TEXT UNIQUE,
  title        TEXT NOT NULL,
  description  TEXT,
  image_url    TEXT,
  source       TEXT DEFAULT 'manual' CHECK (source IN ('spoonacular', 'edamam', 'manual')),
  difficulty   TEXT DEFAULT 'medium'  CHECK (difficulty IN ('easy', 'medium', 'hard')),
  cooking_time INTEGER,
  prep_time    INTEGER,
  servings     INTEGER DEFAULT 4,
  cuisine      TEXT,
  instructions TEXT NOT NULL,
  -- generated tsvector for reliable FTS (avoids expression-index client mismatch)
  search_tsv   tsvector GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, ''))
  ) STORED,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1c. recipe_ingredients — public, read-only for anon
CREATE TABLE public.recipe_ingredients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id       UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  ingredient_name TEXT NOT NULL,
  quantity        DECIMAL(10, 2) NOT NULL,
  unit            TEXT NOT NULL CHECK (unit IN (
    'g', 'kg', 'mg', 'ml', 'l', 'cup', 'tbsp', 'tsp',
    'oz', 'lb', 'pt', 'qt', 'unit', 'pinch', 'handful'
  )),
  is_optional     BOOLEAN DEFAULT FALSE,
  notes           TEXT,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(recipe_id, ingredient_name)
);

-- 1d. ingredients — owner-only
CREATE TABLE public.ingredients (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  quantity   DECIMAL(10, 2) NOT NULL DEFAULT 1,
  unit       TEXT NOT NULL DEFAULT 'unit' CHECK (unit IN (
    'g', 'kg', 'mg', 'ml', 'l', 'cup', 'tbsp', 'tsp',
    'oz', 'lb', 'pt', 'qt', 'unit', 'pinch', 'handful'
  )),
  category   TEXT NOT NULL DEFAULT 'pantry' CHECK (category IN ('pantry', 'fridge', 'freezer', 'other')),
  expires_at TIMESTAMP WITH TIME ZONE,
  notes      TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  -- case-insensitive uniqueness enforced by functional index below
);

-- 1e. saved_recipes — owner-only
--     collection_id FK deferred until collections table exists (Phase 3)
CREATE TABLE public.saved_recipes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  recipe_id     UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  collection_id UUID,
  notes         TEXT,
  is_favorite   BOOLEAN DEFAULT FALSE,
  saved_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. INDEXES
-- ─────────────────────────────────────────────────────────────────────────────

-- users
CREATE UNIQUE INDEX idx_users_email      ON public.users(email);
CREATE        INDEX idx_users_created_at ON public.users(created_at);

-- recipes
CREATE UNIQUE INDEX idx_recipes_external_id  ON public.recipes(external_id) WHERE external_id IS NOT NULL;
CREATE        INDEX idx_recipes_title        ON public.recipes(title);
CREATE        INDEX idx_recipes_cuisine      ON public.recipes(cuisine);
CREATE        INDEX idx_recipes_difficulty   ON public.recipes(difficulty);
CREATE        INDEX idx_recipes_search_tsv   ON public.recipes USING gin(search_tsv);

-- recipe_ingredients
CREATE INDEX idx_recipe_ingredients_recipe_id       ON public.recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_ingredient_name ON public.recipe_ingredients(ingredient_name);

-- ingredients — case-insensitive unique constraint + standard indexes
CREATE UNIQUE INDEX idx_ingredients_user_name_lower ON public.ingredients (user_id, lower(name));
CREATE        INDEX idx_ingredients_user_id         ON public.ingredients(user_id);
CREATE        INDEX idx_ingredients_expires_at      ON public.ingredients(expires_at);
CREATE        INDEX idx_ingredients_user_category   ON public.ingredients(user_id, category);

-- saved_recipes
CREATE INDEX idx_saved_recipes_user_id        ON public.saved_recipes(user_id);
CREATE INDEX idx_saved_recipes_recipe_id      ON public.saved_recipes(recipe_id);
CREATE INDEX idx_saved_recipes_user_favorite  ON public.saved_recipes(user_id, is_favorite);
CREATE INDEX idx_saved_recipes_collection_id  ON public.saved_recipes(collection_id) WHERE collection_id IS NOT NULL;

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.users              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredients        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_recipes      ENABLE ROW LEVEL SECURITY;

-- users: owner-only
CREATE POLICY "users: owner select"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "users: owner update"
  ON public.users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- recipes: public read, service role write
CREATE POLICY "recipes: public read"
  ON public.recipes FOR SELECT
  USING (true);

CREATE POLICY "recipes: service role write"
  ON public.recipes FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- recipe_ingredients: public read, service role write
CREATE POLICY "recipe_ingredients: public read"
  ON public.recipe_ingredients FOR SELECT
  USING (true);

CREATE POLICY "recipe_ingredients: service role write"
  ON public.recipe_ingredients FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ingredients: owner CRUD
CREATE POLICY "ingredients: owner select"
  ON public.ingredients FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "ingredients: owner insert"
  ON public.ingredients FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ingredients: owner update"
  ON public.ingredients FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ingredients: owner delete"
  ON public.ingredients FOR DELETE
  USING (auth.uid() = user_id);

-- saved_recipes: owner CRUD
CREATE POLICY "saved_recipes: owner select"
  ON public.saved_recipes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "saved_recipes: owner insert"
  ON public.saved_recipes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "saved_recipes: owner update"
  ON public.saved_recipes FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "saved_recipes: owner delete"
  ON public.saved_recipes FOR DELETE
  USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. TRIGGERS
-- ─────────────────────────────────────────────────────────────────────────────

-- 4a. updated_at auto-refresh
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_recipes_updated_at
  BEFORE UPDATE ON public.recipes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_ingredients_updated_at
  BEFORE UPDATE ON public.ingredients
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_saved_recipes_updated_at
  BEFORE UPDATE ON public.saved_recipes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4b. Auto-create public.users row on Google OAuth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Skip non-email signups (phone-only, anonymous) to avoid NOT NULL violation
  IF NEW.email IS NULL THEN
    RETURN NEW;
  END IF;

  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. SMOKE TEST QUERIES (run after setup to verify)
-- ─────────────────────────────────────────────────────────────────────────────

-- Verify tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('users', 'ingredients', 'recipes', 'recipe_ingredients', 'saved_recipes')
ORDER BY table_name;

-- Verify RLS is enabled on all 5 tables
SELECT relname, relrowsecurity
FROM pg_class
WHERE relnamespace = 'public'::regnamespace
  AND relname IN ('users', 'ingredients', 'recipes', 'recipe_ingredients', 'saved_recipes')
ORDER BY relname;

-- Verify RLS policies exist per table (RLS enabled with 0 policies locks everyone out)
SELECT tablename, count(*) AS policy_count
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('users', 'ingredients', 'recipes', 'recipe_ingredients', 'saved_recipes')
GROUP BY tablename
ORDER BY tablename;

-- Verify trigger exists on auth.users
SELECT trigger_name, event_object_schema, event_object_table, action_timing, event_manipulation
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created'
  AND event_object_schema = 'auth'
  AND event_object_table = 'users';
