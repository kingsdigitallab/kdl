# Attribution and cookie policy for legacy sites under SLA

This is a set of scripts and styles to inject a footer, with attribution information, into legacy projects which are no longer active, but are currently being maintained by [King's Digital Lab](https://kdl.kcl.ac.uk).

To add to a site, add the `script` declaration as the last element of `body`.

For the stable version of the script add:

```
<script defer="defer" src="https://kdl.kcl.ac.uk/sla-acpp/js/sla.js" type="text/javascript"></script>
```

For the development version of the script:

```
<script defer="defer" src="https://rawgit.com/kingsdigitallab/sla-acpp/develop/js/sla.js" type="text/javascript"></script>
```

The shell script `bin/add.sh` simplifies the process of adding the `<script>` to any files that might need it. Run `bin/add.sh FILENAME` to add it to a file. The shell script has three optional arguments, `-d`, `-s` and `-x`. Use `-d` to add the development version of a script. Use `-s` to add the script to a static site. Use `-x` when adding to an XML file to prevent the `<script>` tag from self-closing, which would prevent the script from executing because it wouldn't be valid HTML.
