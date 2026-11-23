# Smart Attendance System

> **Django-based smart classroom attendance system** combining RFID identification, ESP32-CAM face verification, an admin dashboard, and automatic attendance reporting.


## Project Overview

Smart Attendance System is an IoT and AI-assisted attendance platform. A student scans an RFID card; the ESP32-CAM captures a live image; Django verifies the face against the registered profile and records the attendance status.

### Key Features

- RFID-based student identification
- Live face capture and verification
- Duplicate attendance prevention for the same day
- Present and late status calculation using configurable class time
- Admin dashboard and Django admin panel
- Failed verification logging
- ESP32-CAM and NodeMCU hardware integration
- Supabase PostgreSQL/storage support
- SQLite fallback for local development


## Demo Media

### Physical Device Video

**[Watch the physical device demo](./docx/Video/Video_Project.mp4)**

> GitHub README pages do not support the HTML `<video>` player. Click the link above to open and play the MP4 in GitHub's built-in video viewer.


## Physical IoT Device

The following photos show the prototype wiring and hardware assembly. Add more clear, well-lit photos here for the final project report.

| **Front device view** | **Side device view** |
|---|---|
| [![Front View](./docx/Image/WhatsApp%20Image%202026-11-21%20at%2010.53.23%20AM.jpeg)](./docx/Image/WhatsApp%20Image%202026-11-21%20at%2010.53.23%20AM.jpeg) | [![Side View](./docx/Image/WhatsApp%20Image%202026-11-21%20at%2010.53.24%20AM.jpeg)](./docx/Image/WhatsApp%20Image%202026-11-21%20at%2010.53.24%20AM.jpeg) |


| **Side device view** | **Back device view** |
|---|---|
| [![Back View](./docx/Image/WhatsApp%20Image%202026-11-21%20at%2010.53.24%20AM%20(1).jpeg)](./docx/Image/WhatsApp%20Image%202026-11-21%20at%2010.53.24%20AM%20(1).jpeg) | [![Hardware Assembly](./docx/Image/WhatsApp%20Image%202026-11-21%20at%2010.53.24%20AM%20(2).jpeg)](./docx/Image/WhatsApp%20Image%202026-11-21%20at%2010.53.24%20AM%20(2).jpeg) |


## System Workflow

```text
RFID Card
   |
   v
RDM6300 Reader --> NodeMCU ESP32 --> ESP32-CAM captures image
                                             |
                                             v
                                  Django Verify Attendance API
                                             |
                                  Face encoding comparison
                                             |
                             Present / Late / Already Marked / Failed
                                             |
                                             v
                                      Dashboard + DB
```

### Verification Results

| Result Code | Meaning |
|---|---|
| `SUCCESS_PRESENT` | Attendance marked within class start and grace period |
| `SUCCESS_LATE` | Attendance marked after the allowed grace period |
| `ALREADY_MARKED` | The student is already marked for today |
| `FACE_MISMATCH` | Captured face does not match the registered student |
| `NO_FACE_DETECTED` | No face was detected in the captured image |
| `NOT_REGISTERED` | RFID tag is not linked to an active student |
| `BAD_REQUEST` | Invalid or incomplete API request |
| `NETWORK_ERROR` | ESP32-CAM could not reach the server |


## Hardware Components

| Component | Purpose |
|---|---|
| NodeMCU ESP32 | Main controller and RFID processing |
| ESP32-CAM AI-Thinker | Captures live student images |
| RDM6300 RFID Reader | Reads 10-character RFID tags |
| RFID Card/Tag | Identifies individual students |
| Buzzer | Gives attendance success/error feedback |
| Breadboard and jumper wires | Prototyping and component connections |
| Power supply / USB | Powers the microcontroller hardware |


## Firmware

| Firmware | File |
|---|---|
| Main RFID Controller | [NodeMCU_MainController.ino](./firmware/NodeMCU_MainController/NodeMCU_MainController.ino) |
| Camera and API Client | [ESP32_CAM_Module.ino](./firmware/ESP32_CAM_Module/ESP32_CAM_Module.ino) |

### Hardware Pin Summary

| Connection | NodeMCU ESP32 |
|---|---|
| RDM6300 TX -> NodeMCU RX2 | GPIO16 |
| CAM TX -> NodeMCU RX1 | GPIO5 |
| NodeMCU TX1 -> CAM RX | GPIO17 |
| Buzzer | GPIO18 |
| ESP32-CAM UART RX | GPIO14 |
| ESP32-CAM UART TX | GPIO15 |

> GPIO16 is not used on the ESP32-CAM side because it is associated with the AI-Thinker board's PSRAM.


## Technology Stack

| Area | Technology |
|---|---|
| Backend | Django 5, Django REST Framework |
| Database | PostgreSQL / Supabase; SQLite for local use |
| Face Recognition | `face_recognition`, `dlib`, OpenCV-compatible image processing |
| Storage | Django media storage and Supabase S3 storage |
| IoT Hardware | ESP32-CAM, NodeMCU ESP32 |
| RFID | RDM6300 125 kHz RFID reader |
| Deployment | Render, Gunicorn, WhiteNoise |


## Project Structure

```text
smart_attendance/
├── attendance_app/
│   ├── migrations/
│   ├── templates/dashboard/
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── dashboard_views.py
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── firmware/
│   ├── ESP32_CAM_Module/
│   └── NodeMCU_MainController/
├── docx/
│   ├── Image/
│   └── Video/
├── manage.py
├── requirements.txt
└── build.sh
```


## Local Setup

### 1. Create a virtual environment

```bash
python -m venv venv
```

Activate it:

```bash
# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
pip install --no-deps face_recognition==1.3.0
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DJANGO_SECRET_KEY=replace-with-a-secret-key
DEBUG=True
DATABASE_URL=
DEVICE_API_KEY=replace-with-a-device-api-key
```

Optional Supabase storage settings:

```env
SUPABASE_S3_ENDPOINT_URL=
SUPABASE_S3_BUCKET=
SUPABASE_S3_ACCESS_KEY=
SUPABASE_S3_SECRET_KEY=
SUPABASE_S3_REGION=
```

### 4. Initialize and run the application

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Open:

- Application: `http://127.0.0.1:8000/`
- Admin panel: `http://127.0.0.1:8000/admin/`
- Health check: `http://127.0.0.1:8000/api/health/`


## API Endpoint

### Verify Attendance

```http
POST /api/verify-attendance/
X-API-KEY: <DEVICE_API_KEY>
Content-Type: multipart/form-data
```

Request fields:

| Field | Type | Description |
|---|---|---|
| `rfid_tag` | Text | RFID tag read by RDM6300 |
| `image` | JPEG file | Live face image captured by ESP32-CAM |

Example response:

```json
{
  "result_code": "SUCCESS_PRESENT",
  "student": "Student Name",
  "attendance": "PRESENT"
}
```


## Deployment

The project is suitable for deployment on Render with Supabase PostgreSQL/storage.

```bash
./build.sh
gunicorn config.wsgi:application
```

Before deployment:

1. Set all required environment variables.
2. Use a production database and secure storage.
3. Rotate the ESP32 and Django API credentials.
4. Replace insecure firmware certificate settings before public deployment.
5. Enable HTTPS for camera-device communication.


## Security Notes

- Keep `.env` values and API keys outside source control.
- Do not commit real device credentials or database passwords.
- Rotate credentials that have already been committed or shared.
- Use a valid TLS certificate in production instead of disabling certificate verification.


## Media Folder Guide

Keep future project screenshots and demonstrations organized here:

```text
docx/
├── Image/
│   ├── front-view.jpg
│   ├── side-view.jpg
│   ├── back-view.jpg
│   ├── hardware-assembly.jpg
│   └── dashboard-screenshot.png
└── Video/
    ├── device-demo.mp4
    └── project-presentation.mp4
```

## License

This project is provided as-is for educational and internal use.
