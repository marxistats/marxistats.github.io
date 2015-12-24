$(document).ready(function() {

    var converter = new Markdown.Converter();
    Markdown.Extra.init(converter,{"extensions": ["fenced_code_gfm"]});

    $(".markdown").each(function() {
            var md = $(this).text();
            var html = converter.makeHtml(md);
            $(this).empty();
            $(this).append(html);

        })
    $("code").before('<p class="code_toggle">Code:</p>');
    $(".code_toggle").click(function(){$(this).next().toggle()});
    setTimeout(function(){$(".code_toggle").next().toggle();},1);

        hljs.initHighlighting();
        MathJax.Hub.Typeset();
})
