-- 1. Create Grass Types Table
-- This stores the unique species information
CREATE TABLE grass_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,           -- e.g., 'Bermuda', 'Zoysia'
    description TEXT,                    -- General info about the grass
    sun_requirement TEXT,                -- 'Full Sun', 'Shade Tolerant', etc.
    image_url TEXT,                      -- Link to your Supabase Storage bucket
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Products Table
-- This stores the actual items for sale linked to a grass type
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grass_type_id UUID REFERENCES grass_types(id) ON DELETE CASCADE,
    format TEXT NOT NULL,                -- e.g., 'Full Pallet', 'Half Pallet', 'Roll'
    sq_ft_coverage NUMERIC NOT NULL,     -- e.g., 450
    price DECIMAL(10, 2) NOT NULL,       -- e.g., 250.00
    is_available BOOLEAN DEFAULT true,   -- Toggle for 'Out of Stock'
    created_at TIMESTAMPTZ DEFAULT NOW()
);