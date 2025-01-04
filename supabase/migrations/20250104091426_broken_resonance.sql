/*
  # Consolidated Employee Management Schema

  1. Schema Setup
    - Create department enum type
    - Create employees table with proper constraints
    - Create available_skills table
    - Set up RLS policies
    - Create triggers
*/

-- Create department enum type if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'department_type') THEN
    CREATE TYPE department_type AS ENUM (
      'Engineering',
      'Product Design',
      'Data Science',
      'Product Management',
      'Marketing'
    );
  END IF;
END $$;

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  photo_url text,
  department department_type NOT NULL DEFAULT 'Engineering',
  skills jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create available_skills table
CREATE TABLE IF NOT EXISTS available_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE available_skills ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
DO $$ 
BEGIN
  -- Employees policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'employees' AND policyname = 'Allow read access'
  ) THEN
    CREATE POLICY "Allow read access" ON employees FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'employees' AND policyname = 'Allow insert'
  ) THEN
    CREATE POLICY "Allow insert" ON employees FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'employees' AND policyname = 'Allow update'
  ) THEN
    CREATE POLICY "Allow update" ON employees FOR UPDATE USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'employees' AND policyname = 'Allow delete'
  ) THEN
    CREATE POLICY "Allow delete" ON employees FOR DELETE USING (true);
  END IF;

  -- Available skills policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'available_skills' AND policyname = 'Allow public read access'
  ) THEN
    CREATE POLICY "Allow public read access" ON available_skills FOR SELECT USING (true);
  END IF;
END $$;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_employees_updated_at ON employees;
CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert sample employees if they don't exist
INSERT INTO employees (name, email, photo_url, department, skills)
SELECT
  '田中 優',
  'yu.tanaka@example.com',
  'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop',
  'Engineering',
  '[
    {"name": "React", "isFavorite": true},
    {"name": "TypeScript", "isFavorite": true},
    {"name": "Node.js", "isFavorite": false}
  ]'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM employees WHERE email = 'yu.tanaka@example.com'
);

-- Insert available skills if they don't exist
INSERT INTO available_skills (name, category)
VALUES
  -- Frontend
  ('React', 'Frontend'),
  ('TypeScript', 'Frontend'),
  ('Vue.js', 'Frontend'),
  ('Angular', 'Frontend'),

  -- Backend
  ('Node.js', 'Backend'),
  ('Python', 'Backend'),
  ('Java', 'Backend'),
  ('GraphQL', 'Backend'),
  ('REST API', 'Backend'),

  -- Cloud & DevOps
  ('AWS', 'Cloud & DevOps'),
  ('Azure', 'Cloud & DevOps'),
  ('Docker', 'Cloud & DevOps'),
  ('Kubernetes', 'Cloud & DevOps'),

  -- Databases
  ('MongoDB', 'Databases'),
  ('PostgreSQL', 'Databases'),
  ('Redis', 'Databases'),

  -- Design
  ('Figma', 'Design'),
  ('Adobe XD', 'Design'),
  ('Sketch', 'Design'),
  ('UI/UX Design', 'Design'),

  -- Management
  ('Product Management', 'Management'),
  ('Agile', 'Management'),
  ('Scrum', 'Management'),

  -- Data Science
  ('Machine Learning', 'Data Science'),
  ('Deep Learning', 'Data Science'),
  ('TensorFlow', 'Data Science'),
  ('Computer Vision', 'Data Science'),
  ('NLP', 'Data Science'),
  ('Data Analytics', 'Data Science'),

  -- Other
  ('System Design', 'Other'),
  ('Microservices', 'Other'),
  ('Design Systems', 'Other'),
  ('Motion Design', 'Other'),
  ('User Testing', 'Other'),
  ('Digital Marketing', 'Other'),
  ('Content Strategy', 'Other')
ON CONFLICT (name) DO NOTHING;