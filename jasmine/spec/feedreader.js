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

        // checks if feed has child nodes with .entry descendant
        it('loads and complete at least 1 entry', function () {
            var entries = $(".entry");
            expect(entries.length).toBeGreaterThan(0);
            // console.log(entries.length);
        });
    });

    /* test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        var feed = document.querySelector('.feed');
        var txt0, txt1;
        beforeEach(function(done){
            // load the first feed and save its children into array
            loadFeed(0, function () {
                txt0 = feed.textContent;   //storing the content
                // console.log(feed0.trim().substr(0,20));

                // load the 2nd feed and finish
                loadFeed(1, done);
            });
        });

        it('loads a new feed with different entries',  function () {
            // check the in-equality of children of feed0 and feed1
            txt1 = feed.textContent;
            // console.log(feed1.trim().substr(0,20));
            expect(txt0 == txt1).toBe(false);
        });
    });
}());
