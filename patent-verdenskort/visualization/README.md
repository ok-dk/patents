Accepted Patents
----------------
Displays the accepted patents worldwide from 2012 in logarithmic figures.

![Example image][thumbnail]

Installation
------------
```sh
git clone git@github.com:ok-dk/patents.git
cd patents
python -m SimpleHTTPServer 8000
```

After that, go to <http://localhost:8000/patent-verdenskort/visualization>.

To Do
-----
- Error-catching for unparsed countries
- Use TopoJSON instead
- Include working threshold legend
- Tooltip
- Responsive layout


[thumbnail]: https://github.com/ok-dk/patents/raw/master/patent-verdenskort/visualization/thumbnail.png
