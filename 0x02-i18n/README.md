# 0x02. i18n
## Resources:books:
Read or watch:
* [Flask-Babel](https://flask-babel.tkte.ch/)
* [Flask i18n tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xiii-i18n-and-l10n)
* [pytz](http://pytz.sourceforge.net/)

---
## Learning Objectives:bulb:
What you should learn from this project:

* Learn how to parametrize Flask templates to display different languages
* Learn how to infer the correct locale based on URL parameters, user settings or request headers
* Learn how to localize timestamps


---
# Requirements:

- All your files will be interpreted/compiled on Ubuntu 18.04 LTS using python3 (version 3.7)
- All your files should end with a new line
- A README.md file, at the root of the folder of the project, is mandatory
- Your code should use the `pycodestyle` style (version 2.5)
- The first line of all your files should be exactly `#!/usr/bin/env python3`
- All your *.py files should be executable
- All your modules should have a documentation `(python3 -c 'print(__import__("my_module").__doc__)')`
- All your classes should have a documentation `(python3 -c 'print(__import__("my_module").MyClass.__doc__)')`
- All your functions and methods should have a documentation `(python3 -c 'print(__import__("my_module").my_function.__doc__)' and python3 -c 'print- - (__import__("my_module").MyClass.my_function.__doc__)')`
- A documentation is not a simple word, it’s a real sentence explaining what’s the purpose of the module, class or method (the length of it will be verified)
- All your functions and coroutines must be type-annotated.

---

# Tasks
---
0. Basic Flask app
1. Basic Babel setup
2. Get locale from request
3. Parametrize templates
4. Force locale with URL parameter
5. Mock logging in
6. Use user locale
7. Infer appropriate time zone
---
### [0. Basic Flask app](./0-app.py)
First you will setup a basic Flask app in 0-app.py. Create a single / route and an index.html template that simply outputs “Welcome to Holberton” as page title (<title>) and “Hello world” as header (<h1>).

#### Repo:
* GitHub repository: `alx-backend`
* Directory: `0x02-i18n`
* File: `0-app.py, templates/index.html`
---
### [1. Basic Babel setup](./1-app.py)
Install the Babel Flask extension:

`$ pip3 install flask_babel==2.0.0`
Then instantiate the `Babel` object in your app. Store it in a module-level variable named `babel`.

In order to configure available languages in our app, you will create a Config class that has a `LANGUAGES` class attribute equal to `["en", "fr"].`

Use `Config` to set Babel’s default locale (`"en"`) and timezone (`"UTC"`).

Use that class as config for your Flask app.

#### Repo:
* GitHub repository: `alx-backend`
* Directory: `0x02-i18n`
* File: `1-app.py, templates/index.html`
---
### [2. Get locale from request](./2-app.py)
Create a `get_locale` function with the `babel.localeselector `decorator. Use `request.accept_languages` to determine the best match with our supported languages.

#### Repo:
* GitHub repository: `alx-backend`
* Directory: `0x02-i18n`
* File: `2-app.py, templates/index.html`
---
### [3. Parametrize templates](./3-app.py)
Use the _ or `gettext` function to parametrize your templates. Use the message IDs home_title and `home_header.`

Create a `babel.cfg` file containing:

```
python: **.py]
[jinja2: **/templates/**.html]
extensions=jinja2.ext.autoescape,jinja2.ext.with_
```
Then initialize your translations with

`$ pybabel extract -F babel.cfg -o messages.pot .`

and your two dictionaries with

```
$ pybabel init -i messages.pot -d translations -l en
$ pybabel init -i messages.pot -d translations -l fr
```

Then edit files `translations/[en|fr]/LC_MESSAGES/messages.po` to provide the correct value for each message ID for each language. Use the following translations:

| ID | English | French |
| --- | --- | --- |
| `home_title` | `Welcome to Holberton` | `Bienvenue chez Holberton` |
| `home_header` | `Hello world` | `Bonjour, le monde` |
Then compile your dictionaries with

`$ pybabel compile -d translations`
Reload the home page of your app and make sure that the correct messages show up.

#### Repo:
* GitHub repository: `alx-backend`
* Directory: `0x02-i18n`
* File: `3-app.py, babel.cfg, templates/3-index.html, translations/en/LC_MESSAGES/messages.po, translations/fr/LC_MESSAGES/messages.po, translations/en/LC_MESSAGES/messages.mo, translations/fr/LC_MESSAGES/messages.mo`
---
### [4. Force locale with URL parameter](./4-app.py)
In this task, you will implement a way to force a particular locale by passing the `locale=fr` parameter to your app’s URLs.

In your `get_locale` function, detect if the incoming request contains locale argument and ifs value is a supported `locale`, return it. If not or if the parameter is not present, resort to the previous default behavior.

Now you should be able to test different translations by visiting `http://127.0.0.1:5000?locale=[fr|en].`
![image](https://s3.amazonaws.com/alx-intranet.hbtn.io/uploads/medias/2020/3/f958f4a1529b535027ce.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDDGGGOUSBVO6H7D%2F20240517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240517T074051Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=9b20e138e5e6ede1264b6dff96070616c5ead4606850f417dde97c41f79c11ec)

**Visiting `http://127.0.0.1:5000/?locale=fr` should display this level 1 heading:**

#### Repo:
* GitHub repository: `alx-backend`
* Directory: `0x02-i18n`
* File: `4-app.py, templates/4-index.html`

```




## Author
* **Nathanim Tadele**