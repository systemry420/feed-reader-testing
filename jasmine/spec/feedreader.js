$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

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

        it('tests a valid name', function () {
            allFeeds.forEach(feed =>{
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
                expect(typeof feed.name).toBe('string');
            });
        });
    });


    /* test suite named "The menu" */
    describe('The menu', function () {
        const body = document.querySelector('body');
        const menu = document.querySelector('.menu-icon-link');

        it('hidden by default', function(){
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        it('toggles hide and show', function () {
            // clicks the menu icon pragmaticaly
            menu.click();
            // check if menu-hidden is not within the classList
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        })
    });

    /* test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        // async loading
        beforeEach(function(done){
            loadFeed(0, done);
        });

        // checks for feed has child nodes with .entry-link
        it('loads and complete at least 1 entry', function () {
            const feed = document.querySelector('.feed');
            expect(feed.hasChildNodes('.entry-link')).toBe(true);
            // console.log(feed.hasChildNodes('.entry'));
        });
    });

    /* test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        const feed = document.querySelector('.feed');
        const arrFeed = [];
        beforeEach(function(done){
            // load the first feed and save its children into array
            loadFeed(0, function () {
                Array.from(feed.children).forEach(entry =>{
                    arrFeed.push(entry.textContent);
                });
                // load the 2nd feed and finish
                loadFeed(1, done);
            });
        });

        it('loads a new feed with different entries',  function () {
            // check the in-equality of children of feed0 and feed1
            Array.from(feed.children).forEach( (entry, i) => {
                expect(entry.textContent === arrFeed[i]).toBe(false);
            });
        });
    });
}());
