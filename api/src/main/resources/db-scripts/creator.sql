

CREATE TABLE app_user (
  id INTEGER PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100)
)

CREATE TABLE security (

  user_id INTEGER PRIMARY KEY,
  access_token INTEGER PRIMARY KEY,
  expiry_timestamp TIMESTAMP

)

CREATE TABLE  uploaded_file (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    file_name VARCHAR(100) NOT NULL,
    relative_path VARCHAR(1000) NOT NULL
)
