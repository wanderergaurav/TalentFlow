# TalentFlow - Talent Management System

## Overview

TalentFlow is a comprehensive talent management system designed to streamline the hiring process. It provides tools for managing job postings, candidate profiles, and skill assessments through an intuitive web interface. The application follows a modern full-stack architecture with a React frontend and Express backend, utilizing PostgreSQL for data persistence and featuring a clean, accessible UI built with shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built with React 18+ and TypeScript, leveraging modern development practices:
- **Component Library**: Uses shadcn/ui components built on Radix UI primitives for consistent, accessible UI elements
- **Styling**: Tailwind CSS with a dark theme configuration and custom CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation schemas
- **Build Tool**: Vite for fast development and optimized builds

The frontend follows a modular structure with separate directories for components, pages, hooks, and utilities. Custom hooks manage mobile detection and toast notifications.

### Backend Architecture
The server-side uses Express.js with TypeScript for type safety:
- **API Design**: RESTful API endpoints with consistent error handling and response formatting
- **Request Processing**: Express middleware for JSON parsing, URL encoding, and request logging
- **Development Setup**: Custom Vite integration for hot module replacement in development
- **Storage Abstraction**: Interface-based storage layer allowing for different implementations (currently in-memory for development)

### Data Storage Solutions
The application uses a dual storage approach:
- **Development**: In-memory storage with seeded sample data for rapid development
- **Production**: PostgreSQL database with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for database migrations and schema synchronization
- **Connection**: Neon serverless PostgreSQL for cloud deployment

### Data Models
The system manages four core entities:
- **Users**: Authentication and user management
- **Jobs**: Job postings with status tracking (Open, Closed, Archived)
- **Candidates**: Candidate profiles with skills and contact information
- **Assessments**: Evaluation records linking candidates to jobs with scoring

### Authentication and Authorization
The application includes user management infrastructure with:
- Password-based authentication system
- Session-based user state management
- User registration and login capabilities

### Development and Build Process
The project uses modern tooling for development efficiency:
- **TypeScript**: Full type safety across frontend and backend with shared types
- **Hot Reloading**: Vite's fast refresh for instant development feedback
- **Code Quality**: ESLint configuration for consistent code standards
- **Path Aliases**: Configured for clean import statements and better code organization

### External Dependencies

- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle ORM for type-safe database operations with PostgreSQL dialect
- **UI Components**: Radix UI primitives for accessible component foundations
- **Styling**: Tailwind CSS for utility-first styling approach
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation and formatting
- **Build Tools**: Vite for development server and build optimization
- **Development**: Replit-specific plugins for enhanced development experience