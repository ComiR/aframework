/***
@title:
Code Block Toolbar

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/code-block-toolbar/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.codeBlockToolbar.css

@does:
If you post code-examples on your site you can use this plug-in to add some nifty buttons below each code-example that allows the user to, for example, switch to plain text or increase the font-size.

@howto:
jQuery('p.code-block').codeBlockToolbar(); Would add the toolbar to every paragraph with a class of 'code-block'.

@exampleHTML:
<p class="code">
	<code>
		I'm a piece of example-code<br />
		I should have some buttons beneath me if JS is enabled.
	</code>
</p>

@exampleJS:
jQuery('#jquery-code-block-toolbar-example p.code').codeBlockToolbar();
***/
jQuery.fn.codeBlockToolbar = function(conf) {
	var config = jQuery.extend({
		className:		'jquery-code-block-toolbar', 
		increaseText:	'Increase code font-size', 
		decreaseText:	'Decrease code font-size', 
		expandText:		'Expand code-block', 
		textareaText:	'Switch to textarea', 
		textareaText2:	'Switch back'
		
	}, conf);

	return this.each(function() {
		var codeBlock		= jQuery(this);
		var cbMaxHeight		= parseInt(codeBlock.css('max-height'), 10);
		var cbHeight		= codeBlock.outerHeight();
		var cbHTML			= codeBlock.html();
		var cbText			= codeBlock.html().replace(/\n/ig, '').replace(/<br.*?>/ig, '\n').replace(/<.*?>/ig, '');
		var ul				= jQuery('<ul class="' +config.className +'"></ul>').insertAfter(codeBlock);
		var textarea		= jQuery('<textarea rows="4" cols="60" class="' +config.className +'" style="height: ' +(cbHeight - 10) +'px;">' +cbText +'</textarea>').insertAfter(codeBlock).hide();

		jQuery('<li><a href="#">' +config.increaseText +'</a></li>').appendTo(ul).find('a').click(function() {
			codeBlock.css('font-size', parseFloat(codeBlock.css('font-size'), 10) * 1.2);
			return false;
		});
		jQuery('<li><a href="#">' +config.decreaseText +'</a></li>').appendTo(ul).find('a').click(function() {
			codeBlock.css('font-size', parseFloat(codeBlock.css('font-size'), 10) * .8);
			return false;
		});
		jQuery('<li><a href="#">' +config.textareaText +'</a></li>').appendTo(ul).find('a').toggle(function() {
			jQuery(this).text(config.textareaText2);
			codeBlock.hide();
			textarea.show();
			textarea[0].focus();
			textarea[0].select();
		}, function() {
			jQuery(this).text(config.textareaText);
			textarea.hide();
			codeBlock.show();
		});

		if(cbHeight > cbMaxHeight) {
			jQuery('<li><a href="#">' +config.expandText +'</a></li>').appendTo(ul).find('a').click(function() {
				codeBlock.css('max-height', 'none');
				jQuery(this).parent().remove();
				return false;
			});
		}
	});
};