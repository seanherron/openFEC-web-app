var events = require('./events.js');
var Handlebars = require('handlebars');
var candidateHelpers = require('../../../shared/candidate-helpers.js');
var templates = {};

var renderBrowse = function(e) {
    var tmplName = e.category,
        promise = loadTemplate('views/' + tmplName + '.handlebars');

        promise.done(function(data) {
            var context = {},
            page = e.data[1].pagination.page;
            context.candidates = candidateHelpers.buildCandidateContext(e.data[2].results);
            context.resultsCount = e.data[1].pagination.count;
            templates[tmplName] = Handlebars.compile(data);
            $('#main').html(templates[tmplName](context));
            events.emit('bind:browse');
        }.bind(e));
};

var loadTemplate = function(url) {
    return $.ajax({
        url: url,
        dataType: 'text'
    });
};

module.exports = {
    init: function() {
        events.on('render:browse', renderBrowse);
    }
};
