from flask_babel import Babel, _
from flask import Flask, render_template

app = Flask(__name__)
babel = Babel(app)


@app.route('/')
def index():
    return render_template('3-index.html',
                           title=_('home_title'),
                           header=_('home_header'))


if __name__ == '__main__':
    app.run(debug=True)
