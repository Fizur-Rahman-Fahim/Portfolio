# Leave Management System

A comprehensive Django-based web application for managing employee leave requests, approvals, and tracking. This system streamlines the leave management process with an intuitive interface for both employees and administrators.

## Features

- **User Authentication**: Secure login and registration system
- **Leave Application**: Employees can apply for various types of leave
- **Leave History**: Track and view complete leave records
- **Dashboard**: Overview of leave balance and recent requests
- **Admin Panel**: Administrators can manage users and approve/reject leave requests
- **Profile Management**: Users can view and edit their personal information
- **Password Reset**: Secure password recovery via email
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Backend**: Django 5.2
- **Database**: SQLite (development) / PostgreSQL (production-ready)
- **Frontend**: HTML5, CSS3, Bootstrap
- **Form Styling**: Django Crispy Forms with Bootstrap 5
- **Python Version**: 3.8+

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- pip (Python package manager)
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fizur-Rahman-Fahim/Leave-Management-System.git
   cd Leave-Management-System/leave_mgt
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv leaveenv
   ```

3. **Activate the virtual environment**
   - On Windows:
     ```bash
     leaveenv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source leaveenv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Apply database migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser (admin account)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Collect static files (optional, for production)**
   ```bash
   python manage.py collectstatic
   ```

8. **Run the development server**
   ```bash
   python manage.py runserver
   ```

9. **Access the application**
   - Main application: `http://localhost:8000`
   - Admin panel: `http://localhost:8000/admin`

## Project Structure

```
leave_mgt/
├── core/                          # Main application for leave management
│   ├── models.py                  # Database models for leave, profile, etc.
│   ├── views.py                   # View logic for leave operations
│   ├── forms.py                   # Django forms for user input
│   ├── urls.py                    # URL routing for core app
│   ├── templates/                 # HTML templates
│   │   ├── base.html              # Base template
│   │   ├── dashboard.html         # User dashboard
│   │   ├── apply_leave.html       # Leave application form
│   │   ├── leave_history.html     # Leave history view
│   │   ├── my_leaves.html         # User's leave records
│   │   ├── profile.html           # User profile
│   │   └── registration/          # Authentication templates
│   └── migrations/                # Database migrations
│
├── customAdmin/                   # Admin panel application
│   ├── models.py                  # Admin-specific models
│   ├── views.py                   # Admin panel views
│   ├── urls.py                    # Admin routing
│   └── templates/                 # Admin templates
│       ├── admin_dashboard.html   # Admin overview
│       ├── manage_leaves.html     # Manage leave requests
│       └── manage_user.html       # User management
│
├── leave_mgt/                     # Project settings
│   ├── settings.py                # Django configuration
│   ├── urls.py                    # Main URL configuration
│   ├── asgi.py                    # ASGI configuration
│   └── wsgi.py                    # WSGI configuration
│
├── static/                        # Static files (CSS, JavaScript)
├── leaveenv/                      # Virtual environment
├── manage.py                      # Django management script
├── db.sqlite3                     # Development database
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## Usage

### For Employees

1. **Register**: Create a new account on the registration page
2. **Login**: Sign in with your credentials
3. **Apply for Leave**: Navigate to "Apply Leave" and fill in the form
4. **View History**: Check your leave history and status in "My Leaves" section
5. **Profile Management**: Update your personal information in the profile section

### For Administrators

1. **Login**: Use admin credentials to access the system
2. **Admin Dashboard**: View overall leave statistics and pending requests
3. **Manage Leaves**: Approve or reject pending leave requests
4. **Manage Users**: Add, edit, or remove user accounts
5. **View History**: Track all leave activities in the system

## Configuration

### Environment Variables

Create a `.env` file in the project root and add:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

**Note**: Never commit `.env` to version control. It's already in `.gitignore`.

### Settings

Key settings in `leave_mgt/settings.py`:
- `INSTALLED_APPS`: Configure Django apps
- `DATABASES`: Database configuration
- `TEMPLATES`: Template directories
- `STATIC_URL`: Static files location

## Development

### Run Tests
```bash
python manage.py test
```

### Create Migrations
```bash
python manage.py makemigrations
```

### Apply Migrations
```bash
python manage.py migrate
```

## Deployment

For production deployment, consider:

1. Using PostgreSQL instead of SQLite
2. Setting `DEBUG=False` in settings
3. Using a proper web server (Gunicorn, uWSGI)
4. Reverse proxy with Nginx or Apache
5. SSL/TLS certificate configuration
6. Environment variable management with python-dotenv

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

**Port 8000 already in use:**
```bash
python manage.py runserver 8001
```

**Database errors:**
```bash
python manage.py migrate --run-syncdb
```

**Static files not loading:**
```bash
python manage.py collectstatic --noinput
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/Fizur-Rahman-Fahim/Leave-Management-System/issues).

## Author

**Fizur Rahman Fahim**

- GitHub: [@Fizur-Rahman-Fahim](https://github.com/Fizur-Rahman-Fahim)

---

Happy coding! 🚀
