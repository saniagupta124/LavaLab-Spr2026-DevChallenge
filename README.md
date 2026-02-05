# LavaLab Dev Challenge - E-commerce Website Prototype
A responsive e-commerce web application built with React, featuring user authentication and persistent shopping cart functionality.

## Overview

Full-featured shopping experience with product browsing, cart management, secure user authentication, and checkout flow.

## Technical Stack

- **Frontend:** React, JavaScript (ES6+)
- **Styling:** CSS3, Flexbox/Grid
- **State Management:** React hooks (useState, useContext)
- **Authentication:** bcrypt for password hashing
- **Data Persistence:** localStorage for cart and user session management

## Features

- User registration and login with encrypted passwords
- Product catalog with filtering/sorting
- Shopping cart with quantity management
- Persistent cart state across sessions
- Responsive design for mobile/desktop
- Secure password storage using bcrypt

## Implementation Highlights

- Component-based architecture
- Client-side routing
- Form validation with password encryption
- localStorage API for cart persistence and session management
- Protected routes requiring authentication

## Security

- **Password Hashing:** bcrypt implementation for secure credential storage
- **Session Management:** Token-based authentication with localStorage
- **Input Validation:** Client-side form validation and sanitization

## localStorage Implementation

- **Cart Data:** Persists shopping cart items across browser sessions
- **User Session:** Stores authentication tokens and user preferences
- **Auto-sync:** Cart updates sync in real-time with localStorage
