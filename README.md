# Spread the Word
![Logo](favicon-192x192.png)

> *Let the people share.*

This is multiple screen markdown reader in a single page application (SPA). It is written in Javascript to be portable, focused on being enjoyable by the reader and writer. It tries to acomplish this by giving the user many options to adjust its current display, while the creator  publish content easily with a [markdown](https://en.wikipedia.org/wiki/Markdown) text file. Internally, it uses [marked](https://marked.js.org) with two custom extension to render and a couple of [adwaita](https://gitlab.gnome.org/GNOME/adwaita-icon-theme) icons. Optionally, it will use [highlight](https://highlightjs.org) and/or [mermaid](https://mermaid.js.org). Thank you all projects!!!

## Published View (reader)
This same site seen as published: [Spread the Word](https://basile.ar/stw/)

Once there, you can experience with one of the many samples below. Remember to open the top left bar, set fullscreen, page width, font family, font size, background color and text color, they will give you oportunity to make the best of your current display. Settings are automatically saved.
* [books](example/books/README.md) Long pieces of text.  
* [comics](example/comics/README.md) A big strip of images.  
* [articles](docs/README.md) Combined text, images and code block.
    * [Using Spread the Word](docs/using_StW.md)
    * [Optionally Highlight](docs/using_highlight.md)
    * [Optionally Mermaid](docs/using_mermaid.md)

## Repository View (writer)
This same site seen from the GitHub repository view: [Github Repository](https://github.com/basilean/stw)

Using a free service as [GitHub](https://pages.github.com/) website, you just copy these 3 files in your own repository, customize them with your brand and style, then make README.md file home page. Style is barebones, imagine how pretty would you have your own site.  

Take a look to these 3 files:
* [index.html](index.html) UI Layout HTML (Needs some changes to reflect your site.).
* [stw.css](stw.css) UI Style CSS (Easily customizable by anyone).
* [stw.js](stw.js) Application Javascript (Easily extensible by a coder).

I use **README.md** for indexes, being Github repository browsing compatible, it is easy to edit online.
