<div id="page-navigation">

	<?php
		# Make sure we're on a page
		if (is_page($post)) {
			if ($post->post_parent) {
				$parent_page = get_page($post->post_parent);
				$parent = $post->post_parent;

				if ($parent_page->post_parent) {
					$parent = $parent_page->post_parent;
				}

				$children = wp_list_pages('title_li=&child_of=' . $parent . '&echo=0&link_before=<span>&link_after=</span>');
			}
			else {
				$children = wp_list_pages('title_li=&child_of=' . $post->ID . '&echo=0&link_before=<span>&link_after=</span>');
			}
		}
		# Not on a page, we're in the archive - display the about page's nav (HACK)
		else {
			$children = wp_list_pages('title_li=&child_of=2&echo=0&link_before=<span>&link_after=</span>');
		}
	?>

	<?php if ($children) { ?>
		<ul>
			<?php echo $children; ?>
		</ul>
	<?php } ?>

	<p>
		<span class="inner">
			<span class="inner-inner">
				<strong>Got questions?</strong><br/>
				Check our our new FAQ and service page<br/>
				<a href="<?php echo get_page_link(103); ?>">Click here</a>
			</span>
		</span>
	</p>

</div>

<script>
	(function () {
		// Insert dashes in front of sub pages
		var uls = document.getElementById('page-navigation').getElementsByTagName('ul');

		if (uls.length) {
			uls = uls[0].getElementsByTagName('ul');

			var ulsLen	= uls.length;

			for (var i = 0; i < ulsLen; i++) {
				var spans		= uls[i].getElementsByTagName('span');
				var spansLen	= spans.length;

				for (var j = 0; j < spansLen; j++) {
					spans[j].innerHTML = '- ' + spans[j].innerHTML;
				}
			}

			// Mark news page as selected on archives-page
			if (document.getElementById('archives-page')) {
				var lis		= document.getElementById('page-navigation').getElementsByTagName('li');
				var lisLen	= lis.length;

				for (var i = 0; i < lisLen; i++) {
					if (lis[i].className.indexOf('page-item-154') != -1) {
						lis[i].className += ' current_page_item';

						break;
					}
				}

				// Also select top-level-menu About
				document.getElementById('menu-item-13').className += ' current-page-ancestor';
			}
		}
	})();
</script>
