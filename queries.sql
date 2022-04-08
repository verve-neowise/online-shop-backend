CREATE TABLE users (
    id       SERIAL       PRIMARY KEY,
    username VARCHAR (128),
    password VARCHAR (128),
    name     VARCHAR (128),
    surname  VARCHAR (128),
    role    VARCHAR (64) 
);

CREATE TABLE magazines (
    id       SERIAL       PRIMARY KEY,
    name     VARCHAR (128),
    category VARCHAR (128),
    color    VARCHAR (128),
);


CREATE TABLE products (
    id       SERIAL       PRIMARY KEY,
    mid      INTEGER,
    name     VARCHAR (128),
    photo    VARCHAR (256),
    price    REAL
);
