# Feed Reader Testing

## Project Overview

Using [Jasmine](http://jasmine.github.io/) testing framework to apply tests to a feed reader web app.

## Content

- RSS Feeds test suite
    - tests if allFeeds array is defined, and that both name and url, are defined, not empty and valid.

- The menu suite
    - this test verifies the css functionality of the slide-menu, if it's hidden by default, and if toggles hide and show.

- Initial Entries
    - checks if the asynchronous function loadFeed is loaded successfully, and when it completes it has more than 0 entries.

- New Feed Selection
    - loads feed0, collects its entries, then loads feed1.
    - next, if checks the inequality of each feed's content.