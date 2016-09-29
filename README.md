# Cryptojam

Cryptojam is a small web site where you can solve cryptograms, created for the [10K Apart](https://a-k-apart.com/) contest in 2016.  The challenge was to build a web site for which an initial usable page could be delivered in 10 kilobytes or less.

The database contains over 100 puzzles of varying lengths and difficulties.  The site should be usable without JavaScript, but is much better with it.

Tip: use the left and right arrow buttons to navigate between letter fields.

For the longest puzzle in the database, the HTML, CSS, and JavaScript files for the initial page total about 12.5 KB uncompressed, but less than 4 KB when gzipped.  Even after you read the instructions and check the solution, the total amount of data sent is under 7 KB.

In addition to the contest site, you can see this project in action at [http://crypto.triskaideka.net](http://crypto.triskaideka.net).

To see the longest puzzle, use ID `thoE` (add `?p=thoE` to the end of the URL).  If you're not big on cryptograms, I'd suggest trying `PMnS` or `jcpO`.

## Disclaimer

Hopefully it goes without saying, but just in case: the use of any quotations in this web site does not imply that the quoted person endorses this project, nor that the author of this project, nor the administrators of the 10K Apart contest, endorse the person being quoted or the sentiment expressed by the quotation.

## Acknowledgements

I am grateful to (among others) the following resources which helped me build this site:

* [You Might Not Need jQuery](http://youmightnotneedjquery.com/)
* [Mozilla Developer Network](https://developer.mozilla.org/)
* [FAV Rocks](https://a-k-apart.com/gallery/FAV-Rocks), an entry by fellow competitor Bill Boga, which I used to create my favicon
* [Apps for All](https://shop.smashingmagazine.com/products/apps-for-all) by Heydon Pickering
* [Wikiquote](https://en.wikiquote.org/wiki/Main_Page), the source of all the quotations
* Various people who shared knowledge on [Stack Overflow](http://stackoverflow.com/) and other web sites