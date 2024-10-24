from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__, static_folder='build', static_url_path='')

#Set default route to access react app
@app.route('/')
def home():
    return app.send_static_file('index.html')

#Set weather route, retrieves weather info from openweathermap
@app.route('/weather', methods=['GET'])
def get_weather():
    api_key = 'Your API Key'
    city = request.args.get('city')
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
