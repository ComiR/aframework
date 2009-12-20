// -------------------------------------------------------------------
// markItUp!
// -------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// -------------------------------------------------------------------
// MarkDown tags example
// http://en.wikipedia.org/wiki/Markdown
// http://daringfireball.net/projects/markdown/
// -------------------------------------------------------------------
// Feel free to add more tags
// -------------------------------------------------------------------
mySettings = {
	resizeHandle:		true, 
	previewParserPath:	'',
	onShiftEnter:		{keepDefault:false, openWith:'\n\n'},
	onTab:    			{keepDefault:false, replaceWith:'    '},
	markupSet: [
	//	{name:'First Level Heading', key:'1', placeHolder:'Your title here...', closeWith:function(markItUp) { return miu.markdownTitle(markItUp, '=') } },
	//	{name:'Second Level Heading', key:'2', placeHolder:'Your title here...', closeWith:function(markItUp) { return miu.markdownTitle(markItUp, '-') } },
		{name:'Heading 1', key:'1', openWith:'# ', placeHolder:'Your title here...' },
		{name:'Heading 2', key:'2', openWith:'## ', placeHolder:'Your title here...' },
		{name:'Heading 3', key:'3', openWith:'### ', placeHolder:'Your title here...' },
		{name:'Heading 4', key:'4', openWith:'#### ', placeHolder:'Your title here...' },
		{name:'Heading 5', key:'5', openWith:'##### ', placeHolder:'Your title here...' },
		{name:'Heading 6', key:'6', openWith:'###### ', placeHolder:'Your title here...' },
		{separator:'---------------' },		
		{name:'Bold', key:'B', openWith:'**', closeWith:'**'},
		{name:'Italic', key:'I', openWith:'_', closeWith:'_'},
		{separator:'---------------' },
		{name:'Bulleted List', openWith:'- ' },
		{name:'Numeric List', openWith:function(markItUp) {
			return markItUp.line+'. ';
		}},
		{separator:'---------------' },
		{name:'Picture', key:'P', replaceWith:'![[![Alternative text]!]]([![Url:!:http://]!])'},
		{name:'Link', key:'L', openWith:'[', closeWith:']([![Url:!:http://]!])', placeHolder:'Your text to link here...' },
		{name:'YouTube', key:'Y', replaceWith:'[youtube=[![YouTube Clip ID]!]]'},
		{separator:'---------------'},	
		{name:'Quotes', openWith:'> '},
	//	{name:'Code Block / Code', openWith:'(!(\t|!|`)!)', closeWith:'(!(`)!)'},
		{name:'Code Block / Code', openWith:'[code]', closeWith:'[/code]'},
		{separator:'---------------'},
		{name:'Preview', call:function (textarea) {
			var editor	= textarea.parents('div.markItUp').eq(0).parent();
			var preview	= editor.next('div.markItUpPreview');

			if (!preview.length) {
				preview = $('<div class="markItUpPreview"></div>').insertAfter(editor);
			}

			preview.html('<p>Loading...</p>');

			$.post(Router.urlForUtil('NiceStringPreview'), {
				data:	textarea.val(), 
				mhl:	false, 
				html:	false
			}, function (data) {
				preview.html(data);
			});
		}, className:"preview"}
	]
};

// mIu nameSpace to avoid conflict.
miu = {
	markdownTitle: function(markItUp, char) {
		heading = '';
		n = $.trim(markItUp.selection||markItUp.placeHolder).length;
		for(i = 0; i < n; i++) {
			heading += char;
		}
		return '\n'+heading;
	}
};
