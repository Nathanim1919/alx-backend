#!/usr/bin/env python3
"""Get locale from request"""
from flask import Flask, render_template, request
from flask_babel import Babel


app = Flask(__name__)


# configure class
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


# Apply configuration to the app
app.config.from_object(Config)

# Instantiate Babel
babel = Babel(app)


# Local selector function
# @babel.localeselector
def get_locale():
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index() -> str:
    """
    Renders the index.html template.

    Returns:
        The rendered index.html template.
    """
    return render_template("2-index.html")


babel.init_app(app, locale_selector=get_locale)


if __name__ == "__main__":
    app.run(debug=True)
