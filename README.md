# Ray's Championship Evaluator

Test my implementation of the "Championship" evaluator at [http://championship.raythx.com](http://championship.raythx.com) (no HTTPS/SSL yet)

Server status: Deployed & Running

---

## Features
- Styled (...? very minimalistic...)
- Data persistence with MySQL
- Deployed on AWS
- Some [unit/integration testing]() - work in progress...

---

## Design Considerations
- "Clearing history" is a soft delete, the entries will still be available in the database
- Used MySQL (RDBMS) which helps with complex joins and complex queries
- I have tried to catch as much invalid inputs as possible, you can try:
  - putting less/more than 12 teams
  - putting repeated teams
  - put an alphabet in the integer fields
  - making teams play against themself
  - making 2 teams play each other more/less than once
  - and more...

---

## If my server crashes

In the unfortunate event that my server crashes during evaluation, the first alternative is to contact me at [hongxian@comp.nus.edu.sg](mailto:hongxian@comp.nus.edu.sg) or through my mobile phone and I will fix it asap.

Alternative, here are the steps to run my url shortener service on local.

- ### Client
1. Ensure that node is installed
2. Install dependencies
```
npm i
```
3. Create `.env` file in the root directory, put in API url
```
REACT_APP_BASE_URL=localhost:3001/
```
4. Start react app
```
npm start
```
Client will be available at localhost:3000

- ### Database
1. Ensure that a MySQL server is setup properly on your machine
2. Create database & tables
```
CREATE SCHEMA championship;

CREATE TABLE results (
result_id INT NOT NULL AUTO_INCREMENT,
is_visible TINYINT NOT NULL DEFAULT 1,
INDEX `is_visible_idx` (`is_visible` DESC) VISIBLE,
PRIMARY KEY (`result_id`));

CREATE TABLE teamresult (
tname VARCHAR(100) NOT NULL,
result_id INT NOT NULL,
gnum INT NOT NULL,
tpoint INT NOT NULL,
tgoal INT NOT NULL,
apoint INT NOT NULL,
rdate DATE NOT NULL,
INDEX `result_id_idx` (`result_id` DESC) VISIBLE,
PRIMARY KEY (`result_id`, `tname`),
CONSTRAINT `result_id`
  FOREIGN KEY (`result_id`)
  REFERENCES `championship`.`results` (`result_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);

```
3. Create user and grant privileges
```
CREATE USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL ON championship.* TO 'root'@'localhost';
```
Database will be available (by default) at localhost:3306

- ### Server
1. Install dependencies
```
npm i
```
2. Create `.env` file in the root directory, put in database credentials and port number. Assuming that we use port `3001` and the credentials setup in the previous section
```
MYSQL_USER='root'
MYSQL_HOST='localhost'
MYSQL_PASSWORD='password'
MYSQL_DATABASE='championship'

PORT=3001
```
3. Start server
```
npm run devStart
```
Server will be available at localhost:3001