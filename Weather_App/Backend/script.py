from flask import Flask, request, jsonify, send_from_directory
import requests

app = Flask(__name__, static_folder='build', static_url_path='')

@app.route('/')
def root():
    return send_from_directory('build', 'index.html')

@app.route('/home.html')
def home():
    return send_from_directory('public', 'home.html')

@app.route('/weather.html')
def weather():
    return send_from_directory('public', 'weather.html')

@app.route('/weather', methods=['GET'])
def get_weather():
    api_key = 'Insert API Key'
    city = request.args.get('city')
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)