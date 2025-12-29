-- ================================================================================
-- ADIFlix - Script de creación de tablas para Supabase
-- Ejecutar en: Dashboard de Supabase > SQL Editor
-- ================================================================================

-- Tabla movies
CREATE TABLE movies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  genero TEXT NOT NULL,
  anio INTEGER NOT NULL CHECK (anio >= 1900 AND anio <= 2030),
  valoracion DECIMAL(3,1) CHECK (valoracion >= 0 AND valoracion <= 10),
  duracion INTEGER CHECK (duracion >= 1),
  director TEXT,
  poster TEXT,
  trailer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla series
CREATE TABLE series (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  genero TEXT NOT NULL,
  anio INTEGER NOT NULL CHECK (anio >= 1900 AND anio <= 2030),
  valoracion DECIMAL(3,1) CHECK (valoracion >= 0 AND valoracion <= 10),
  creador TEXT,
  poster TEXT,
  trailer TEXT,
  estado TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================================
-- Row Level Security (RLS) - Solo usuarios autenticados pueden acceder
-- ================================================================================

-- Habilitar RLS
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE series ENABLE ROW LEVEL SECURITY;

-- Políticas para movies
CREATE POLICY "Authenticated users can read movies" 
  ON movies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert movies" 
  ON movies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update movies" 
  ON movies FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete movies" 
  ON movies FOR DELETE TO authenticated USING (true);

-- Políticas para series
CREATE POLICY "Authenticated users can read series" 
  ON series FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert series" 
  ON series FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update series" 
  ON series FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete series" 
  ON series FOR DELETE TO authenticated USING (true);

-- ================================================================================
-- Habilitar Realtime para las tablas
-- ================================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE movies;
ALTER PUBLICATION supabase_realtime ADD TABLE series;

-- ================================================================================
-- Datos de ejemplo (opcional)
-- ================================================================================
INSERT INTO movies (titulo, descripcion, genero, anio, valoracion, duracion, director, poster) VALUES
('Inception', 'Un ladrón que roba secretos corporativos a través del uso de la tecnología de sueños compartidos.', 'Ciencia Ficción', 2010, 8.8, 148, 'Christopher Nolan', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg'),
('The Dark Knight', 'Batman se enfrenta a un nuevo enemigo: el Joker, un criminal caótico que busca destruir Gotham.', 'Acción', 2008, 9.0, 152, 'Christopher Nolan', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'),
('Pulp Fiction', 'Las vidas de dos mafiosos, un boxeador y otros personajes se entrelazan en historias de violencia y redención.', 'Crimen', 1994, 8.9, 154, 'Quentin Tarantino', 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg');

INSERT INTO series (titulo, descripcion, genero, anio, valoracion, creador, estado, poster) VALUES
('Breaking Bad', 'Un profesor de química con cáncer terminal se asocia con un ex alumno para fabricar metanfetamina.', 'Drama', 2008, 9.5, 'Vince Gilligan', 'Finalizada', 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg'),
('Stranger Things', 'Un grupo de niños en una pequeña ciudad descubre experimentos secretos del gobierno y dimensiones alternas.', 'Ciencia Ficción', 2016, 8.7, 'Duffer Brothers', 'En emisión', 'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg'),
('The Office', 'Un mockumentary sobre la vida cotidiana de los empleados de una oficina en Scranton, Pennsylvania.', 'Comedia', 2005, 8.9, 'Greg Daniels', 'Finalizada', 'https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg');
