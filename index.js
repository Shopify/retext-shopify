/**
 * @author Adam Hollett and Jeremy Hanson-Finger
 * @copyright 2016 Shopify
 * @license ISC
 * @module retext:shopify
 * @fileoverview Check phrases for simpler alternatives.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var keys = require('object-keys');
var difference = require('array-differ');
var nlcstToString = require('nlcst-to-string');
var quotation = require('quotation');
var search = require('nlcst-search');
var patterns = require('./data/index.json');

/*
 * List of all phrases.
 */

var list = keys(patterns);

/**
 * Attacher.
 *
 * @param {Retext} processor
 *   - Instance.
 * @param {Object?} [options]
 *   - Configuration.
 * @param {Array.<string>?} [options.ignore]
 *   - List of phrases to *not* warn about.
 * @return {Function} - `transformer`.
 */

function attacher(processor, options) {
    var ignore = (options || {}).ignore || [];
    var phrases = difference(list, ignore);

    /**
     * Search `tree` for validations.
     *
     * @param {Node} tree - NLCST node.
     * @param {VFile} file - Virtual file.
     */
    function transformer(tree, file) {
        search(tree, phrases, function (match, position, parent, phrase) {
            var pattern = patterns[phrase];
            var replace = pattern.replace;
            var note = pattern.note;
            var matchedString = nlcstToString(match);
            var value = quotation(nlcstToString(match), '“', '”');
            var newvalue = quotation(replace, '“', '”');
            var message = undefined;

            if (!replace.length) {
                message = value + ' is not Shopify style. Avoid using it.';

                if (note) {
                    message += ' (' + note + ')';
                }
            } else if (matchedString !== replace){
                message = value + ' is not Shopify style. Use ' + newvalue +
                    ' instead.';

                if (note) {
                    message += ' (' + note + ')';
                }
            } else if (matchedString === replace){
                return transformer;
            }

            if (message) {
                message = file.warn(message, {
                    'start': match[0].position.start,
                    'end': match[match.length - 1].position.end
                });
            }
            message.ruleId = phrase;
            message.source = 'retext-shopify';
        }, {'allowApostrophes': false, 'allowDashes': true});
    }

    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;
