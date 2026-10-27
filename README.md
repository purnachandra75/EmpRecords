# EmpRecords

Full-stack employee records app with CRUD operations.

- Frontend: React (Vite) on `http://localhost:5173`
- Backend: Spring Boot REST API on `http://localhost:8080`
- Database: in-memory H2 (`jdbc:h2:mem:empdb`)

## Run the backend

```bash
cd backend
mvn spring-boot:run
```

API base path: `/api/employees`

H2 console: `http://localhost:8080/h2-console`  
JDBC URL: `jdbc:h2:mem:empdb`  
Username: `sa`  
Password: (empty)

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api` to the Spring Boot app.

## API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/employees` | List employees |
| GET | `/api/employees/{id}` | Get one employee |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |
