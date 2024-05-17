#!/usr/bin/env python3
"""Parametrzize templates"""
from flask_babel import Babel, _
from flask import Flask, render_template

# Intialize a flask app and integrate with babel
app = Flask(__name__)
babel = Babel(app)


@app.route('/')
def index():
    """render the 3-index.html template"""
    return render_template('3-index.html',
                           title=_('home_title'),
                           header=_('home_header'))


if __name__ == '__main__':
    app.run(debug=True)
