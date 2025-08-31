Backend:

GET /animals
limit: number
offset: number

returns:

{
data: [
{ id: string, name: string, image: string, likes: number, dislikes: number }
],
total: number
}

POST /animal
image: image
name: string

POST /animal/:id/like
POST /animal/:id/dislike
POST /animal/:id/

CREATE TABLE animals (
id INTEGER PRIMARY KEY AUTOINCREMENT
name TEXT NOT NULL
image_url TEXT NOT NULL
likes INTEGER NOT NULL DEFAULT 0
dislikes INTEGER NOT NULL DEFAULT 0
reports INTEGER NOT NULL DEFAULT 0
)

CREATE TABLE votes (
animal_id INTEGER NOT NULL,
ip_address TEXT NOT NULL,
vote_type TEXT NOT NULL CHECK(vote_type IN ('like', 'dislike', 'report')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,

PRIMARY KEY (animal_id, ip_address)
);
