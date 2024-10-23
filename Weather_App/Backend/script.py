from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

#Set default route to access react app
@app.route('/')
def home():
    return app.send_static_file('index.html')

#Set weather route, retrieves weather info from openweathermap
@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    api_key = '873dbf28df7658a02a6bc76a3e948efa '
    url = f'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={api_key}'
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
