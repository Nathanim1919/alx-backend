#!/usr/bin/env python3
from flask import Flask, render_template
from flask_babel import Babel


app = Flask(__name__)


class Config:
    """
    Configuration class for the application.

    Attributes:
        LANGUAGES (list): List of supported languages for the application.
        BABEL_DEFAULT_LOCALE (str): Default locale for the application.
        BABEL_DEFAULT_TIMEZONE (str): Default timezone for the application.
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


# apply configuration to the app
app.config.from_object(Config)


# Instantiate Babel
babel = Babel(app)


@app.route('/')
def index():
    return render_template('1-index.html')


if __name__ == "__main__":
    app.run(debug=True)
