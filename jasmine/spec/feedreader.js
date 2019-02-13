/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('tests valid url', function () {
            allFeeds.forEach(feed =>{
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(typeof feed.url).toBe('string');

                // check for valid url regex - source: stackoverflow
                var regexQuery = "^(http?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
                var url = new RegExp(regexQuery,"i");
                expect(url.test(feed.url)).toBe(true);
                // console.log(typeof feed.url);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('tests a valid name', function () {
            allFeeds.forEach(feed =>{
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
                expect(typeof feed.name).toBe('string');
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
        const body = document.querySelector('body');
        const menu = document.querySelector('.menu-icon-link');
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('hidden by default', function(){
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('toggles hide and show', function () {
            // clicks the menu icon pragmaticaly
            menu.click();
            // check if menu-hidden is not within the classList
            expect(body.classList.contains('menu-hidden')).toBe(false);
        })
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* TODO: Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */

        // async loading
        beforeEach(function(done){
            loadFeed(0, done);
        });

        // checks for any entries
        it('loads and complete at least 1 entry', function () {
            const feed = document.querySelector('.feed');
            expect(feed.children.length > 0).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        const feed = document.querySelector('.feed');
        const arrFeed = [];
        beforeEach(function(done){
            // load the first feed and save its children into array
            loadFeed(0);
            Array.from(feed.children).forEach(entry =>{
                arrFeed.push(entry.textContent);
            });
            // load the 2nd feed and finish
            loadFeed(1, done);
        });
        /* TODO: Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        it('loads a new feed with different entries',  function () {
            // check the in-equality of children of feed0 and feed1
            Array.from(feed.children).forEach( (entry, i) => {
                expect(entry.textContent === arrFeed[i]).toBe
                (false);
            });
        })
    });
}());
