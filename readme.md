# Retext-shopify

Warn about Shopify style guide violations with
[**retext**](https://github.com/wooorm/retext).

**Retext-shopify** is a ruleset for
[**rorybot**](https://github.com/Shopify/rorybot), a command-line linter that
can be added into your text editor. See
[**linter-rorybot**](https://github.com/Shopify/linter-rorybot) if you use Atom
or [**sublimelinter-rorybot**](https://github.com/Shopify/sublimelinter-rorybot)
if you use Sublime Text.

## Installing and updating

This package is automatically installed and updated as a dependency of
[**rorybot**](https://github.com/Shopify/rorybot).

## Contributing

Content rules are written in `data/index.json`.

### Content rules

The rule set is a list of simple phrase matches written in JSON with the
following format:

```json
"[incorrect phrase]": {
  "note": "[reason for the warning]",
  "replace": "[replacement phrase(s)]"
},
```

For example:

```json
"customise": {
  "replace": "customize",
  "note": "Use American spelling."
},
```

This rule would flag the phrase `Customise` with the following message:

```bash
<stdin>
  9:17-9:26  warning  “Customise” is not Shopify style.
    Use “customize” instead. (Use American spelling.)
```

### Note guidelines

When you enter the `note`, use a short, imperative sentence explaining the
warning. Be sure to capitalize and add punctuation at the end.

#### No replacement

If you don't define a replacement, just put two square brackets (`[]`) before
the comma instead. When **rorybot** runs it will tell you to avoid using that
term and print the explanatory note.

For example:

```json
    "oops": {
    "replace": [],
    "note": "Just don't."
  },
```

This rule would flag the phrase `Oops` with the following message:

```bash
<stdin>
  9:1-9:5  warning  “Oops” is not Shopify style.
    Avoid using it. (Just don't.)
```

#### Multiple replacements

If you want **rorybot** to suggest multiple possible replacements for an
incorrect phrase, separate the replacement phrases with a comma and place them
within square brackets, like this:

```json
    "e.g.": {
    "replace": ["like", "for example"],
    "note": "Avoid Latin abbreviations."
  },
```

```bash
<stdin>
  8:26-8:30  warning  “e.g.” is not Shopify style.
    Use “like”,“for example” instead. (Avoid Latin abbreviations.)
```

##### Capitalization

Enter the incorrect phrase as lowercase, but use the correct casing for the
replacement phrase. The linter will flag any matching string if it doesn't have
the same casing as the replacement phrase.

If `Shopify POS` and `Unlimited plan` are the only ways you want to style these
two phrases, the rules would look like this:

```json
  "shopify point of sale": {
    "note": "Incorrect branded name.",
    "replace": "Shopify POS"
  },
  "unlimited plan": {
    "note": "Incorrect capitalization.",
    "replace": "Unlimited plan"
  },
```

For instance, based on the above rules, if you ran **rorybot** on a document
containing the phrases `unlimited Plan`, `UnLimited plan`,
`Shopify point of sale`, `shopify point of sale`, you'd get the following
warnings:

```bash
<stdin>
  3:20-3:34  warning  “unlimited Plan” is not Shopify style.
    Use “Unlimited plan” instead. (Incorrect capitalization.)
  5:20-5:34  warning  “UnLimited plan” is not Shopify style.
    Use “Unlimited plan” instead. (Incorrect capitalization.)
  6:8-6:29  warning  “Shopify point of sale” is not Shopify style.
    Use “Shopify POS” instead. (Incorrect branded name.)
  7:8-7:29  warning  “shopify point of sale” is not Shopify style.
    Use “Shopify POS” instead. (Incorrect branded name.)
```

### Updating rules

1.  Clone this repo to your local machine and `cd` into its folder.

2.  Create a branch for your changes (`git checkout -b your-branch-name`).

3.  Open `data/index.json` in a text editor.

4.  Make your changes to the rule list.

5.  Save `index.json`.

6.  Test your rules (see _Testing rules_).

7.  Commit your changes (`git commit -am "Your commit message"`). The changed
    files should be `index.json` and `test.js`.

8.  Run `git push origin your-branch-name` to create a pull request with your
    changes.

### Testing rules

1.  `cd` into your local copy of the repo.

2.  Open `test.js` in a text editor.

3.  Add the strings you want to test to the list, in single quotes and separated
    by commas:

    ```js
    retext()
        .use(shopify)
        .process([
            'I love using Liquid.',
            'I love using liquid.',
            'I\'m on the Shopify unlimited Plan',
            'I\'m on the Shopify Unlimited plan',
            'I\'m on the Shopify UnLimited plan',
            'Check out Shopify point of sale',
            'Check out shopify point of sale',
            '!'
        ].join('\n'), function (err, file) {
            console.log(report(file));
        });
    ```

4.  Save `test.js`.

5.  In your terminal, run `node test.js` to see the results of running
    **rorybot** on those strings using the **retext-shopify** library. If you
    want to output the result to a file in the same directory, run
    `node test.js | tee output.txt` (but you can call `output.txt` whatever you
    want).

6.  Check your JSON in a [JSON validator](http://jsonlint.com/) if you run
    into issues.

In the future we'll define more rules about when and where to add test
strings, but for now before you commit and push to your remote branch, save
`test.js` with whatever test strings you think are important.
