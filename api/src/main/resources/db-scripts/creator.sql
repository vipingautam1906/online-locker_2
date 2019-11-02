
select * from app_user;


CREATE TABLE app_user (
  id INTEGER PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100)
);

CREATE TABLE security (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  access_token INTEGER
);

CREATE TABLE  uploaded_file (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    file_name VARCHAR(100) NOT NULL,
    relative_path VARCHAR(1000) NOT NULL
);

insert into app_user (id, email, password, first_name, last_name) values
    (22, 'shivam@gmail.com', 'whatsnew', 'shivam', 'sharma');