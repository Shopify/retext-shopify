/* eslint-env node */

var retext = require('retext');
var shopify = require('./index');
var test = require('tape');

var output = {};

/**
 * process.
 *
 * @param {string} str - string to process
 * @return {Object} - results
 */

function process(str) {
    output = {};
    retext().use(shopify).process(str, function (err, file) {
        output = file;
    });
    return output;
}

test('once the', function (t) {
    var actual;

    t.plan(3);

    actual = process('I love using Liquid once the.');
    t.equal(
        actual.messages[0].ruleId,
        'once the',
        '“once the” violates ruleId “once the”'
    );
    t.equal(
        actual.messages[0].source,
        'retext-shopify',
        'source is “retext-shopify”'
    );

    actual = process('I love using Liquid when.');
    t.equal(actual.messages.length, 0, '“when” is ok');
});

test('unlimited plan', function (t) {
    var actual;

    t.plan(5);

    actual = process('I’m on the Shopify unlimited Plan');
    t.equal(
        actual.messages[0].ruleId,
        'unlimited plan',
        '“unlimited Plan” violates ruleId “unlimited plan”'
    );
    t.equal(
        actual.messages[0].source,
        'retext-shopify',
        'source is “retext-shopify”'
    );

    actual = process('I’m on the Shopify UnLimited plan');
    t.equal(
        actual.messages[0].ruleId,
        'unlimited plan',
        '“UnLimited plan” violates ruleId “unlimited plan”'
    );
    t.equal(
        actual.messages[0].source,
        'retext-shopify',
        'source is “retext-shopify”'
    );

    actual = process('I’m on the Shopify Unlimited plan');
    t.equal(
        actual.messages.length, 0,
        '“Unlimited plan” is ok'
    );
});

test('drop-down menu', function (t) {
    var actual;

    t.plan(5);

    actual = process('I love the dropdown menu.');
    t.equal(
        actual.messages[0].ruleId,
        'dropdown menu',
        '“dropdown menu” violates ruleId “drop down menu”'
    );
    t.equal(
        actual.messages[0].source,
        'retext-shopify',
        'source is “retext-shopify”'
    );

    actual = process('I love the drop down menu.');
    t.equal(
        actual.messages[0].ruleId,
        'drop down menu',
        '“drop down menu” violates ruleId “drop down menu”'
    );
    t.equal(
        actual.messages[0].source,
        'retext-shopify',
        'source is “retext-shopify”'
    );

    actual = process('I love the drop-down menu.');
    t.equal(
        actual.messages.length, 0,
        '“drop-down menu” is ok'
    );
});

test('shopify pos', function (t) {
    var actual;

    t.plan(3);

    actual = process('I love Shopify point of sale.');
    t.equal(
        actual.messages[0].ruleId,
        'shopify point of sale',
        '“Shopify point of sale” violates ruleId “shopify point of sale”'
    );
    t.equal(
        actual.messages[0].source,
        'retext-shopify',
        'source is “retext-shopify”'
    );

    actual = process('I love Shopify POS.');
    t.equal(
        actual.messages.length, 0,
        '“Shopify POS” is ok'
    );
});

test('unfortunately', function (t) {
    var actual;

    t.plan(2);

    actual = process('Unfortunately, an error occurred.');
    t.equal(
        actual.messages[0].ruleId,
        'unfortunately',
        '“Unfortunately” violates ruleId “unfortunately”'
    );
    t.equal(
        actual.messages[0].source,
        'retext-shopify',
        'source is “retext-shopify”'
    );
});

test('oops', function (t) {
    var actual;

    t.plan(2);

    actual = process('Oops, an error occurred.');
    t.equal(
        actual.messages[0].ruleId,
        'oops',
        '“Oops” violates ruleId “oops”'
    );
    t.equal(
        actual.messages[0].source,
        'retext-shopify',
        'source is “retext-shopify”'
    );
});

test('close down', function (t) {
    var actual;

    t.plan(3);

    actual = process('I need to close down my shop.');
    t.equal(
        actual.messages[0].ruleId,
        'close down',
        '“close down” violates ruleId “close down”'
    );
    t.equal(
        actual.messages[0].source,
        'retext-shopify',
        'source is “retext-shopify”'
    );

    actual = process('I need to close my shop.');
    t.equal(
        actual.messages.length, 0,
        '“close” is ok'
    );
});

test('customise', function (t) {
    var actual;

    t.plan(3);

    actual = process('I’d like to customise my drink.');
    t.equal(
        actual.messages[0].ruleId,
        'customise',
        '“customise” violates ruleId “customise”'
    );
    t.equal(
        actual.messages[0].source,
        'retext-shopify',
        'source is “retext-shopify”'
    );

    actual = process('I’d like to customize my drink.');
    t.equal(
        actual.messages.length, 0,
        '“customize” is ok'
    );
});

test('shopify help center', function (t) {
    var actual;

    t.plan(7);

    actual = process('Go to the Shopify manual.');
    t.equal(
        actual.messages[0].ruleId,
        'shopify manual',
        '“Shopify manual” violates ruleId “shopify manual”'
    );
    t.equal(
        actual.messages[0].source,
        'retext-shopify',
        'source is “retext-shopify”'
    );

    actual = process('Go to the Shopify docs.');
    t.equal(
        actual.messages[0].ruleId,
        'shopify docs',
        '“Shopify docs” violates ruleId “shopify docs”'
    );
    t.equal(
        actual.messages[0].source,
        'retext-shopify',
        'source is “retext-shopify”'
    );

    actual = process('Go to the Shopify Help Centre.');
    t.equal(
        actual.messages[0].ruleId,
        'help centre',
        '“Shopify Help Centre” violates ruleId “help centre”'
    );
    t.equal(
        actual.messages[0].source,
        'retext-shopify',
        'source is “retext-shopify”'
    );

    actual = process('Go to the Shopify Help Center.');
    t.equal(
        actual.messages.length, 0,
        '“Shopify Help Center” is ok'
    );
});
