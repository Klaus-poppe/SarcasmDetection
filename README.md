
## Project dependencies
* node
* npm
* angular
* python
* pip
* tensorflow
* Flask
* pandas
* Docker

## How to run the app
* Start server by
```
cd backend/
docker build . -t backend
docker run -p 80:80 backend
``` 
*  To run frontend
```
cd frontend/
docker build . -t frontend
docker run -p 3000:80 frontend
```

* Go to `http://localhost:3000` in your browser


