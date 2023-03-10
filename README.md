# SmugMug album image rater
A _very_ simple php-based site for rating images in a given album using the SmugMug API v2 and phpSmug wrapper. This was written as simple one-time use site for a very specific purpose, hence its simplicity.

The user is presented with images from a given album one at a time and can rate the images using a simple star rating system. Ratings are stored in a json file along with the image's filename, thumbnail, and key. Each rating is tied to an anonymized user (stored via a cookie on the user's browser) to maintain ratings. Information is saved to the json file each time a new image is loaded.

A genrealized ratings dashboard is available at `./check_ratings.php` which displays a simple table including the individual image's thumbnails, filenames, and serial/key as well as the total votes and average rating for the respective image. This table can be sorted (asc/desc) by filename or ratings.

## Dependencies
* PHP >= 7.3.0 (per phpSmug)
* SmugMug API Key - Currently only set up to use a public API key for public albums.
* [phpSmug by lildude](https://github.com/lildude/phpSmug) - A simple object orientated wrapper for the new SmugMug API v2, written in PHP. See the phpSmug docs for more info on usage.

## Setup
After cloning the repo, install phpSmug via composer (recommended, see phpSmug documentation for other installation options):

```bash
$ composer require lildude/phpsmug
```

Rename the `template/config.php.example` file to `config.php` and add your SmugMug API Key and album key to the file where appropriate.

```php
<?php

$appName = 'SmugMug gallery image rater/1.0';
$pubKey = '';
$albumKey = '';
```

Rename the `data/ratings-empty.json` file to `ratings.json` or creating the file with empty contents:

```json
{"images":[]}
```

## TO-DO
* Remove jQuery dependency - jQuery was used for its quick and dirty object access and ajax functions. Not a terrible option, but looking to streamline and use vanilla javascript.
* Automatic `ratings.json` file creation
* Add more info to `check_ratings.php` - Aside from more data (hidden or otherwise), add possible functions to trim/clear json file. This would also creating basic authentication to access file.
