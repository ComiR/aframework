/***
@title:
TODO: Captcha Refresh

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/captcha-refresh/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
Refreshes so called CAPTCHA-images when you click them - provided your CAPTHA-script generates a random image every time it is called.

@howto:
jQuery(document.body).captchaRefresh('/captcha.png'); Would make all links with '/captcha.png' as their src-attribute inside the document.body-element clickable.

@exampleHTML:
<img src="/aFramework/Lib/Captcha.php" alt="" />

@exampleJS:
jQuery('#jquery-captcha-refresh-example').captchaRefresh('/aFramework/Lib/Captcha.php');
***/