
Discourse.Markdown.whiteListTag('span', 'class', 'spoiler');
Discourse.Markdown.whiteListTag('div', 'class', 'spoiler');


function rawBBCode(tag, emitter, opts) {
  opts = opts || {};
  opts = _.merge(opts, { start: "[" + tag + "]", stop: "[/" + tag + "]", emitter: emitter, rawContents: true });
  Discourse.Dialect.inlineBetween(opts);

  tag = tag.toUpperCase();
  opts = _.merge(opts, { start: "[" + tag + "]", stop: "[/" + tag + "]", emitter: emitter, rawContents: true });
  Discourse.Dialect.inlineBetween(opts);
}

rawBBCode("spoiler", function(contents) {
  if (/<img/i.test(contents)) {
    return ['div', { 'class': 'spoiler' }, contents];
  } else {
    return ['span', { 'class': 'spoiler' }, this.processInline(contents)];
  }
});
