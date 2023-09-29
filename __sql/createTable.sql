CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    createdAt DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL    
);