Color Altering for web pages
============================

Browsing web pages can be more pleasant when adapting their colors / contrast.

Here are some Chrome Extensions which produce such effects:
- "Care your Eyes" https://chrome.google.com/webstore/detail/care-your-eyes/fidmpnedniahpnkeomejhnepmbdamlhl )
- "Chromazing" https://chrome.google.com/webstore/detail/chromazing/icahieoamncmgmgkdmblponlgjggokhm )
- "High Contrast" https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph )
- "Hacker Vision" https://chrome.google.com/webstore/detail/hacker-vision/fommidcneendjonelhhhkmoekeicedej )

For different browsers, there are other extensions.


I was interested in this type of transformations before the appearance of the previous solutions.

At that time I've found these bookmarklets (https://www.squarefree.com/bookmarklets/color.html ) that were helpful.
A bookmarklet is a bookmark that contains a javascript function call instead of an URL.
When loading an unpleasant page for the eyes, the user just clicks the bookmark(let) and not long after the colors / contrast will change as instructed.

These bookmarklets work on most browsers and for web pages that don't make heavy use of images.
For very few sites like GMail they don't work. Besides, some unessential regions might remain unchanged.
Generally they perform great / excellent on most sites.


The transformation I've implemented (by adapting the bookmarklets mentioned above) shifts colors as follows:
* sets a target background color (RRGGBB hex format)
* determines the target foreground color (compared to the target background color: same hue, saturation, but complementary luminance)
* moves any background/foreground colors towards the corresponding target at 80% from the distance between the initial color and the target

The result is that the colors migrate proportionally towards their imposed targets while maintaining a glimpse of the designer's vision.

The implemented bookmarklet comes in 2 flavors:
- the first one uses the target background AAAB8A (moderately light gray),
- while the second one prompts for a target background color.

The 2 bookmarklets can be installed by dragging their links to the Bookmarks Bar from the 'ColorShift.html' file.


Since bookmarklets need to be URL-like, they should remain on a single line (URL don't usually contain carriage returns).
That's why they are difficult to follow. Therefore I've provided also a formatted version: 'DefaultColorsShift.js'.


Since I rarely use JavaScript it would be no surprise that some parts of the code could be improved.
Anyway, I hope some will find this bookmarklets useful.


Please address any comments / suggestions on ftulba{at}yahoo{dot}com.
