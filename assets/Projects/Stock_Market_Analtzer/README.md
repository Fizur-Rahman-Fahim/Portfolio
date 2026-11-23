# Stock Market Analyzer

A Django-based real-time stock analysis tool with technical indicators, automated trading signals, and Telegram notifications.

## Features
- Real-time stock data from Yahoo Finance
- Technical analysis indicators (RSI, MACD, SMA, Bollinger Bands)
- Automated trading signals with Telegram notifications
- Interactive charts with Matplotlib
- RESTful API with Swagger documentation
- Data caching with Redis
- Mobile-responsive UI with Tailwind CSS

## Prerequisites
- Python 3.8+
- Redis (optional, for caching)
- Telegram Bot Token (for notifications)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Stock-Market-Analyzer
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:
Create `.env` file:
```
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Start development server:
```bash
python manage.py runserver
```

## Usage

### Stock Data View
- Access real-time and historical stock data
- View price charts with technical indicators
- URL: `/stocks/`

### Technical Analysis
- RSI (Relative Strength Index)
- Moving Averages (50 & 200 day)
- MACD (Moving Average Convergence Divergence)
- Bollinger Bands
- URL: `/stocks/chart/`

### Trading Signals
- Automated signal generation
- Telegram notifications
- Multiple technical indicator combinations
- URL: `/stocks/signals/`

### API Access
- RESTful API endpoints
- Swagger documentation
- URL: `/stocks/api/stocks/`

## Development

### Project Structure
```
stockAnalysis/
├── stockAnalysis/
├── stocks/
│   ├── templates/
│   ├── static/
│   ├── models.py
│   ├── views.py
│   └── utils.py
├── templates/
└── manage.py
```

### Adding New Features
1. Define models in `stocks/models.py`
2. Add views in `stocks/views.py`
3. Create templates in `stocks/templates/`
4. Update URLs in `stocks/urls.py`

### Running Tests
```bash
pytest
```

## API Documentation
Access API documentation at `/swagger/` after starting the server.

## Contributing
1. Fork the repository
2. Create feature branch
3. Make changes and test
4. Submit pull request

## License
MIT License
