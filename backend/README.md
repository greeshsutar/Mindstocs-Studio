# Mindstocs Studio Backend Architecture (MC / MVC Pattern)

This folder contains the backend architecture for Mindstocs Studio organized according to the Model-Controller (MC) architectural pattern.

## Directory Structure

```
backend/
├── config/                  # Configuration (Database, Supabase, Environment)
│   ├── env.ts
│   └── supabase.ts
├── controllers/             # Controllers (Handles HTTP request/response flow)
│   ├── customer.controller.ts
│   └── index.ts
├── models/                  # Models & Data Schemas (DB queries & interfaces)
│   ├── customer.model.ts
│   └── index.ts
├── routes/                  # API Route Definitions & Endpoints
│   ├── customer.routes.ts
│   └── index.ts
├── services/                # Business Logic Layer
│   ├── customer.service.ts
│   └── index.ts
├── middlewares/             # Request & Error Middlewares
│   ├── error.middleware.ts
│   ├── validate.middleware.ts
│   └── index.ts
├── utils/                   # Helpers and formatters
│   ├── response.ts
│   └── index.ts
├── app.ts                   # Application instance & middleware wiring
├── server.ts                # Server startup & listener
└── README.md
```

## Architectural Flow
1. **Route** receives the incoming HTTP request.
2. **Middleware** handles authentication, validation, and parsing.
3. **Controller** orchestrates request parameters and invokes the Service/Model layer.
4. **Service / Model** executes business logic and interacts with Supabase / PostgreSQL.
5. **Controller** returns standardized responses via the **Utils** response helper.
