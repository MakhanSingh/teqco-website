<?php
/**
 * Plugin Name: Teqco CMS (headless)
 * Description: Content model, read API, CORS and frontend redirect (enquiries go through Contact Form 7 + Flamingo) for teqco.com.au. Lives in mu-plugins so it cannot be deactivated by accident.
 * Version: 1.0.0
 * Author: Think Creative Agency
 */

if (!defined('ABSPATH')) exit;

define('TEQCO_FRONTEND', 'https://teqco.com.au');
define('TEQCO_ALLOWED_ORIGINS', [
  'https://teqco.com.au',
  'https://www.teqco.com.au',
  'https://teqco-redesign.vercel.app',
  'http://localhost:3000',
  'http://localhost:8765',
]);

/* -------------------------------------------------------------------------
 * 1. Post types
 * ---------------------------------------------------------------------- */
add_action('init', function () {
  $base = [
    'public' => false,
    'show_ui' => true,
    'show_in_rest' => true,
    'exclude_from_search' => true,
    'publicly_queryable' => false,
    'has_archive' => false,
    'rewrite' => false,
    'map_meta_cap' => true,
  ];

  register_post_type('range', $base + [
    'labels' => teqco_labels('Product Range', 'Product Ranges'),
    'menu_icon' => 'dashicons-screenoptions',
    'menu_position' => 5,
    'supports' => ['title', 'thumbnail', 'page-attributes'],
    'rest_base' => 'ranges',
  ]);

  register_post_type('brand', $base + [
    'labels' => teqco_labels('Brand', 'Brands'),
    'menu_icon' => 'dashicons-awards',
    'menu_position' => 6,
    'supports' => ['title', 'thumbnail', 'page-attributes'],
    'rest_base' => 'brands',
  ]);

  register_post_type('slide', $base + [
    'labels' => teqco_labels('Hero Slide', 'Hero Slides'),
    'menu_icon' => 'dashicons-images-alt2',
    'menu_position' => 7,
    'supports' => ['title', 'thumbnail', 'page-attributes'],
    'rest_base' => 'slides',
  ]);

  register_post_type('catalogue', $base + [
    'labels' => teqco_labels('Catalogue', 'Catalogues'),
    'menu_icon' => 'dashicons-media-document',
    'menu_position' => 8,
    'supports' => ['title', 'page-attributes'],
    'rest_base' => 'catalogues',
  ]);


  // Singleton that holds site-wide settings and page copy.
  register_post_type('teqco_settings', $base + [
    'labels' => teqco_labels('Site Settings', 'Site Settings'),
    'show_in_menu' => false,
    'supports' => ['title'],
    'rest_base' => 'site-settings', // not 'settings': that would shadow the core /wp/v2/settings route
    'capabilities' => ['create_posts' => 'do_not_allow'],
  ]);
});

function teqco_labels($singular, $plural) {
  return [
    'name' => $plural, 'singular_name' => $singular, 'menu_name' => $plural,
    'add_new' => "Add $singular", 'add_new_item' => "Add $singular", 'edit_item' => "Edit $singular",
    'new_item' => "New $singular", 'view_item' => "View $singular", 'all_items' => "All $plural",
    'search_items' => "Search $plural", 'not_found' => "No " . strtolower($plural) . " found",
    'featured_image' => 'Photo', 'set_featured_image' => 'Set photo', 'remove_featured_image' => 'Remove photo', 'use_featured_image' => 'Use as photo',
  ];
}

/** Return (and lazily create) the single settings post. */
function teqco_settings_id() {
  $id = (int) get_option('teqco_settings_id');
  if ($id && get_post_status($id)) return $id;
  $id = wp_insert_post(['post_type' => 'teqco_settings', 'post_title' => 'Site Settings', 'post_status' => 'publish']);
  update_option('teqco_settings_id', $id);
  return $id;
}

// "Site Settings" menu entry that opens the singleton.
add_action('admin_menu', function () {
  add_menu_page('Site Settings', 'Site Settings', 'edit_posts', 'teqco-settings', function () {}, 'dashicons-admin-generic', 4);
});
add_action('admin_init', function () {
  if (isset($_GET['page']) && $_GET['page'] === 'teqco-settings') {
    wp_safe_redirect(get_edit_post_link(teqco_settings_id(), 'raw'));
    exit;
  }
});
// Hide "Add New" / trash for the settings singleton and keep its title.
add_filter('wp_insert_post_data', function ($data, $postarr) {
  if ($data['post_type'] === 'teqco_settings') { $data['post_title'] = 'Site Settings'; $data['post_status'] = 'publish'; }
  return $data;
}, 10, 2);

// Sort these types by menu order in the admin lists.
add_action('pre_get_posts', function ($q) {
  if (is_admin() && $q->is_main_query() && in_array($q->get('post_type'), ['range', 'brand', 'slide', 'catalogue'], true) && !$q->get('orderby')) {
    $q->set('orderby', 'menu_order title'); $q->set('order', 'ASC');
  }
});

/* -------------------------------------------------------------------------
 * 2. ACF fields
 * ---------------------------------------------------------------------- */
add_action('acf/init', function () {
  if (!function_exists('acf_add_local_field_group')) return;

  $f = function ($key, $name, $label, $type = 'text', $extra = []) {
    return array_merge(['key' => "field_teqco_$key", 'name' => $name, 'label' => $label, 'type' => $type], $extra);
  };
  $tab = fn($key, $label) => ['key' => "field_teqco_tab_$key", 'label' => $label, 'type' => 'tab', 'placement' => 'top'];
  $ta = fn($key, $name, $label, $instr = '', $rows = 4) => $f($key, $name, $label, 'textarea', ['rows' => $rows, 'new_lines' => '', 'instructions' => $instr]);

  acf_add_local_field_group([
    'key' => 'group_teqco_range', 'title' => 'Range details', 'show_in_rest' => true, 'position' => 'acf_after_title',
    'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'range']]],
    'fields' => [
      $f('range_subtitle', 'subtitle', 'Subtitle', 'text', ['instructions' => 'Short line under the name on the home page grid, e.g. the main brands.']),
      $ta('range_description', 'description', 'Description', 'Shown on the Products page.', 5),
      $ta('range_brands', 'brands', 'Brands', 'One brand per line. Shown as tags on the Products page.', 4),
    ],
  ]);

  acf_add_local_field_group([
    'key' => 'group_teqco_brand', 'title' => 'Brand details', 'show_in_rest' => true, 'position' => 'acf_after_title',
    'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'brand']]],
    'fields' => [
      $f('brand_website', 'website', 'Website (optional)', 'url'),
      $f('brand_show', 'show_in_marquee', 'Show in the logo strip', 'true_false', ['ui' => 1, 'default_value' => 1]),
    ],
  ]);

  acf_add_local_field_group([
    'key' => 'group_teqco_slide', 'title' => 'Slide content', 'show_in_rest' => true, 'position' => 'acf_after_title',
    'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'slide']]],
    'fields' => [
      $ta('slide_text', 'text', 'Text', 'One or two sentences under the heading.', 3),
      $f('slide_btn1_label', 'button_label', 'Button label', 'text', ['default_value' => 'Browse Our Range']),
      $f('slide_btn1_link', 'button_link', 'Button link', 'text', ['default_value' => '/products/']),
      $f('slide_btn2_label', 'button2_label', 'Second button label', 'text', ['default_value' => 'Get a Quote']),
      $f('slide_btn2_link', 'button2_link', 'Second button link', 'text', ['default_value' => '/contact/#enquiry']),
    ],
  ]);

  acf_add_local_field_group([
    'key' => 'group_teqco_catalogue', 'title' => 'Catalogue', 'show_in_rest' => true, 'position' => 'acf_after_title',
    'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'catalogue']]],
    'fields' => [
      $f('cat_file', 'file', 'PDF file', 'file', ['return_format' => 'url', 'mime_types' => 'pdf', 'instructions' => 'Upload a PDF, or leave empty and use the link below.']),
      $f('cat_url', 'url', 'External link', 'url', ['instructions' => 'Used when no PDF is uploaded.']),
    ],
  ]);

  acf_add_local_field_group([
    'key' => 'group_teqco_settings', 'title' => 'Site settings and page copy', 'show_in_rest' => true, 'position' => 'acf_after_title',
    'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'teqco_settings']]],
    'fields' => [
      $tab('contact', 'Contact details'),
      $f('phone', 'phone', 'Phone (as displayed)'),
      $f('phone_tel', 'phone_tel', 'Phone (dial format)', 'text', ['instructions' => 'e.g. +61268954180']),
      $f('email', 'email', 'Email', 'email'),
      $f('address', 'address', 'Address'),
      $f('address_short', 'address_short', 'Address (short, for the top bar)'),
      $f('corner', 'corner', 'Landmark line', 'text', ['instructions' => 'e.g. Corner of Bathurst and Denison Streets']),
      $f('hours_summary', 'hours_summary', 'Opening hours (one line)', 'text', ['instructions' => 'e.g. Mon to Fri, 7am to 5pm']),
      $ta('hours', 'hours', 'Opening hours (table)', 'One line per row as "Day | Hours", e.g. Monday to Friday | 7:00am – 5:00pm', 4),
      $f('maps_url', 'maps_url', 'Google Maps link', 'url'),
      $f('facebook', 'facebook', 'Facebook URL', 'url'),
      $f('linkedin', 'linkedin', 'LinkedIn URL', 'url'),

      $tab('home', 'Home page'),
      $f('home_grid_eyebrow', 'home_grid_eyebrow', 'Products section: small label'),
      $f('home_grid_heading', 'home_grid_heading', 'Products section: heading', 'text', ['instructions' => 'Wrap the green words in *asterisks*, e.g. Everything for the *rural, trade and handyman* job']),
      $ta('home_grid_text', 'home_grid_text', 'Products section: text', '', 3),
      $f('home_quote_eyebrow', 'home_quote_eyebrow', 'Orange card: small label'),
      $f('home_quote_heading', 'home_quote_heading', 'Orange card: heading'),
      $ta('home_quote_text', 'home_quote_text', 'Orange card: text', '', 3),
      $f('home_quote_button', 'home_quote_button', 'Orange card: button label'),
      $ta('home_facts', 'home_facts', 'Fact strip', 'Three lines as "Title | Text". These are the three boxes under the product grid.', 4),
      $f('home_about_eyebrow', 'home_about_eyebrow', 'About section: small label'),
      $f('home_about_heading', 'home_about_heading', 'About section: heading', 'text', ['instructions' => 'Wrap the green words in *asterisks*.']),
      $ta('home_about_text', 'home_about_text', 'About section: paragraphs', 'Separate paragraphs with a blank line.', 6),
      $ta('home_about_points', 'home_about_points', 'About section: bullet points', 'One per line as "Bold lead | rest of the sentence".', 4),
      $f('home_about_button', 'home_about_button', 'About section: button label'),
      $f('home_contact_eyebrow', 'home_contact_eyebrow', 'Contact section: small label'),
      $f('home_contact_heading', 'home_contact_heading', 'Contact section: heading'),
      $ta('home_contact_text', 'home_contact_text', 'Contact section: text', '', 3),

      $tab('about', 'About page'),
      $f('about_hero_title', 'about_hero_title', 'Banner heading'),
      $ta('about_hero_text', 'about_hero_text', 'Banner text', '', 3),
      $f('about_story_eyebrow', 'about_story_eyebrow', 'Story: small label'),
      $f('about_story_heading', 'about_story_heading', 'Story: heading', 'text', ['instructions' => 'Wrap the green words in *asterisks*.']),
      $ta('about_story_text', 'about_story_text', 'Story: paragraphs', 'Separate paragraphs with a blank line.', 6),
      $ta('about_stats', 'about_stats', 'Story: stats', 'Two lines as "Value | Label", e.g. 3mm | Sheet metal cutting and folding in-store', 3),
      $f('about_services_eyebrow', 'about_services_eyebrow', 'Services: small label'),
      $f('about_services_heading', 'about_services_heading', 'Services: heading'),
      $ta('about_services', 'about_services', 'Services', 'Three blocks separated by a blank line. First line is the title, the rest is the text.', 8),
      $f('about_services_button', 'about_services_button', 'Services: button label'),
      $f('about_cta_heading', 'about_cta_heading', 'Bottom banner: heading'),
      $ta('about_cta_text', 'about_cta_text', 'Bottom banner: text', '', 3),

      $tab('products', 'Products page'),
      $f('products_hero_title', 'products_hero_title', 'Banner heading'),
      $ta('products_hero_text', 'products_hero_text', 'Banner text', '', 3),
      $f('products_jump_label', 'products_jump_label', 'Jump list label'),
      $f('products_catalogues_heading', 'products_catalogues_heading', 'Catalogues: heading'),
      $ta('products_catalogues_text', 'products_catalogues_text', 'Catalogues: text', '', 2),
      $f('products_cta_heading', 'products_cta_heading', 'Bottom banner: heading'),
      $ta('products_cta_text', 'products_cta_text', 'Bottom banner: text', '', 3),

      $tab('contactpage', 'Contact page'),
      $f('contact_hero_title', 'contact_hero_title', 'Banner heading'),
      $ta('contact_hero_text', 'contact_hero_text', 'Banner text', '', 3),
      $f('contact_eyebrow', 'contact_eyebrow', 'Details: small label'),
      $f('contact_heading', 'contact_heading', 'Details: heading'),
      $ta('contact_text', 'contact_text', 'Details: text', '', 3),
      $f('contact_map_heading', 'contact_map_heading', 'Map: heading'),
      $f('contact_map_text', 'contact_map_text', 'Map: text'),

      $tab('footer', 'Footer and SEO'),
      $ta('footer_blurb', 'footer_blurb', 'Footer blurb', '', 3),
      $f('seo_title', 'seo_title', 'Home page browser title'),
      $ta('seo_description', 'seo_description', 'Home page meta description', 'Around 150 characters.', 3),
    ],
  ]);
});

/* -------------------------------------------------------------------------
 * 3. Read API: GET /wp-json/teqco/v1/content  (everything the site needs)
 * ---------------------------------------------------------------------- */
function teqco_image($post_id) {
  $id = get_post_thumbnail_id($post_id);
  if (!$id) return null;
  $src = wp_get_attachment_image_src($id, 'full');
  if (!$src) return null;
  return [
    'id' => $id,
    'url' => $src[0], 'width' => $src[1], 'height' => $src[2],
    'alt' => (string) get_post_meta($id, '_wp_attachment_image_alt', true),
    'file' => basename(get_attached_file($id)),
    'modified' => get_post_modified_time('c', true, $id),
  ];
}
function teqco_lines($text) {
  return array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', (string) $text)), 'strlen'));
}
function teqco_pairs($text) {
  return array_map(function ($l) { $p = array_map('trim', explode('|', $l, 2)); return ['a' => $p[0], 'b' => $p[1] ?? '']; }, teqco_lines($text));
}
function teqco_paras($text) {
  return array_values(array_filter(array_map('trim', preg_split('/\n\s*\n/', str_replace("\r", '', (string) $text))), 'strlen'));
}
function teqco_posts($type) {
  return get_posts(['post_type' => $type, 'post_status' => 'publish', 'numberposts' => -1, 'orderby' => 'menu_order title', 'order' => 'ASC']);
}

add_action('rest_api_init', function () {
  register_rest_route('teqco/v1', '/content', [
    'methods' => 'GET', 'permission_callback' => '__return_true',
    'callback' => function () {
      $sid = teqco_settings_id();
      $s = function_exists('get_fields') ? (get_fields($sid) ?: []) : [];
      $settings = $s;
      $settings['cf7_form_id'] = (int) get_option('teqco_cf7_form_id');
      $settings['hours_table'] = teqco_pairs($s['hours'] ?? '');
      $settings['home_facts'] = teqco_pairs($s['home_facts'] ?? '');
      $settings['home_about_paragraphs'] = teqco_paras($s['home_about_text'] ?? '');
      $settings['home_about_points'] = teqco_pairs($s['home_about_points'] ?? '');
      $settings['about_story_paragraphs'] = teqco_paras($s['about_story_text'] ?? '');
      $settings['about_stats'] = teqco_pairs($s['about_stats'] ?? '');
      $settings['about_services'] = array_map(function ($block) {
        $lines = teqco_lines($block); return ['title' => array_shift($lines), 'text' => implode(' ', $lines)];
      }, teqco_paras($s['about_services'] ?? ''));

      $ranges = array_map(function ($p) {
        $a = get_fields($p->ID) ?: [];
        return [
          'id' => $p->ID, 'slug' => $p->post_name, 'title' => $p->post_title, 'order' => (int) $p->menu_order,
          'subtitle' => $a['subtitle'] ?? '', 'description' => $a['description'] ?? '',
          'brands' => teqco_lines($a['brands'] ?? ''), 'image' => teqco_image($p->ID),
          'modified' => get_post_modified_time('c', true, $p),
        ];
      }, teqco_posts('range'));

      $brands = array_map(function ($p) {
        $a = get_fields($p->ID) ?: [];
        return ['id' => $p->ID, 'slug' => $p->post_name, 'title' => $p->post_title, 'order' => (int) $p->menu_order,
          'website' => $a['website'] ?? '', 'show' => !isset($a['show_in_marquee']) || (bool) $a['show_in_marquee'], 'image' => teqco_image($p->ID)];
      }, teqco_posts('brand'));

      $slides = array_map(function ($p) {
        $a = get_fields($p->ID) ?: [];
        return ['id' => $p->ID, 'heading' => $p->post_title, 'order' => (int) $p->menu_order, 'text' => $a['text'] ?? '',
          'button' => ['label' => $a['button_label'] ?? '', 'link' => $a['button_link'] ?? ''],
          'button2' => ['label' => $a['button2_label'] ?? '', 'link' => $a['button2_link'] ?? ''],
          'image' => teqco_image($p->ID)];
      }, teqco_posts('slide'));

      $catalogues = array_map(function ($p) {
        $a = get_fields($p->ID) ?: [];
        return ['id' => $p->ID, 'title' => $p->post_title, 'order' => (int) $p->menu_order, 'url' => $a['file'] ?: ($a['url'] ?? '')];
      }, teqco_posts('catalogue'));

      $res = new WP_REST_Response([
        'generated' => gmdate('c'), 'settings' => $settings, 'ranges' => $ranges, 'brands' => $brands, 'slides' => $slides, 'catalogues' => $catalogues,
      ]);
      $res->header('Cache-Control', 'no-cache');
      return $res;
    },
  ]);
});

/* -------------------------------------------------------------------------
 * 4. CORS for the frontend, REST hardening
 * ---------------------------------------------------------------------- */
add_action('rest_api_init', function () {
  remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
  add_filter('rest_pre_serve_request', function ($value) {
    $origin = get_http_origin();
    if ($origin && in_array($origin, TEQCO_ALLOWED_ORIGINS, true)) {
      header('Access-Control-Allow-Origin: ' . $origin);
      header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
      header('Access-Control-Allow-Headers: Content-Type, Accept');
      header('Vary: Origin');
    }
    return $value;
  });
}, 15);

// No public user listing, no XML-RPC, no comments.
add_filter('rest_endpoints', function ($e) {
  if (!is_user_logged_in()) { unset($e['/wp/v2/users'], $e['/wp/v2/users/(?P<id>[\d]+)']); }
  return $e;
});
add_filter('xmlrpc_enabled', '__return_false');
add_action('admin_init', function () { remove_menu_page('edit-comments.php'); });

/* -------------------------------------------------------------------------
 * 5. Headless: send visitors of the CMS domain to the real website
 * ---------------------------------------------------------------------- */
add_action('template_redirect', function () {
  if (is_admin() || defined('REST_REQUEST') || defined('DOING_CRON') || defined('DOING_AJAX')) return;
  if (is_user_logged_in() && isset($_GET['preview'])) return;
  $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
  if (strpos($path, '/wp-') === 0 || strpos($path, '/novamira') !== false) return;
  wp_redirect(TEQCO_FRONTEND . ($path === '/' ? '/' : $path), 302);
  exit;
});

// Point "View site" links at the frontend.
add_filter('admin_bar_menu', function ($bar) {
  $node = $bar->get_node('site-name');
  if ($node) { $node->href = TEQCO_FRONTEND; $bar->add_node($node); }
  $bar->remove_node('view-site');
}, 100);

/* -------------------------------------------------------------------------
 * 6. Auto-rebuild: tell GitHub to rebuild and redeploy the website after content changes
 * ---------------------------------------------------------------------- */
define('TEQCO_GITHUB_REPO', 'MakhanSingh/teqco-website');
define('TEQCO_CONTENT_TYPES', ['range', 'brand', 'slide', 'catalogue', 'teqco_settings']);

/**
 * Mark that this request changed content. One rebuild request is sent to GitHub when the
 * request finishes, however many hooks fired. GitHub queues it behind a build that is still
 * running, so quick successive edits end up in the next build without cutting one off.
 */
function teqco_queue_rebuild($reason) {
  $GLOBALS['teqco_rebuild_reason'] = $reason;
  update_option('teqco_rebuild_reason', $reason, false);
}
add_action('shutdown', function () {
  if (empty($GLOBALS['teqco_rebuild_reason']) || !empty($GLOBALS['teqco_rebuild_sent'])) return;
  $GLOBALS['teqco_rebuild_sent'] = true;
  if (function_exists('fastcgi_finish_request')) fastcgi_finish_request(); // don't make the editor wait
  teqco_send_rebuild();
});

add_action('transition_post_status', function ($new, $old, $post) {
  if (!in_array($post->post_type, TEQCO_CONTENT_TYPES, true)) return;
  if (wp_is_post_revision($post) || wp_is_post_autosave($post)) return;
  if ($new === 'publish' || $old === 'publish') teqco_queue_rebuild($post->post_type . ': ' . $post->post_title);
}, 10, 3);
// ACF saves fields after the post itself, so also queue on acf/save_post.
add_action('acf/save_post', function ($id) {
  $p = is_numeric($id) ? get_post($id) : null;
  if ($p && in_array($p->post_type, TEQCO_CONTENT_TYPES, true) && $p->post_status === 'publish') teqco_queue_rebuild($p->post_type . ': ' . $p->post_title);
}, 20);
// Photo alt text or replacement on an image the site uses.
add_action('edit_attachment', function ($id) {
  if (get_posts(['post_type' => TEQCO_CONTENT_TYPES, 'meta_key' => '_thumbnail_id', 'meta_value' => $id, 'numberposts' => 1, 'fields' => 'ids'])) teqco_queue_rebuild('photo: ' . get_the_title($id));
});
add_action('before_delete_post', function ($id) {
  $p = get_post($id);
  if ($p && in_array($p->post_type, TEQCO_CONTENT_TYPES, true) && $p->post_status === 'publish') teqco_queue_rebuild('deleted ' . $p->post_type . ': ' . $p->post_title);
});

add_action('teqco_rebuild', 'teqco_send_rebuild'); // legacy scheduled event, if one is still queued
function teqco_send_rebuild() {
  $token = get_option('teqco_github_token');
  if (!$token) { update_option('teqco_rebuild_last', ['time' => time(), 'ok' => false, 'msg' => 'No GitHub token set'], false); return false; }
  $user = wp_get_current_user();
  $res = wp_remote_post('https://api.github.com/repos/' . TEQCO_GITHUB_REPO . '/dispatches', [
    'timeout' => 15,
    'headers' => ['Authorization' => 'Bearer ' . $token, 'Accept' => 'application/vnd.github+json', 'User-Agent' => 'teqco-cms', 'X-GitHub-Api-Version' => '2022-11-28'],
    'body' => wp_json_encode(['event_type' => 'cms-update', 'client_payload' => ['reason' => get_option('teqco_rebuild_reason', ''), 'by' => $user->exists() ? $user->user_login : 'cron']]),
  ]);
  $code = is_wp_error($res) ? 0 : wp_remote_retrieve_response_code($res);
  $ok = $code === 204;
  update_option('teqco_rebuild_last', ['time' => time(), 'ok' => $ok, 'msg' => $ok ? 'Rebuild started' : ('GitHub said ' . ($code ?: $res->get_error_message()) . ' ' . wp_remote_retrieve_body($res))], false);
  return $ok;
}

// Settings page: Settings > Website deploy (token is stored in options, never exposed by the API).
add_action('admin_menu', function () {
  add_options_page('Website deploy', 'Website deploy', 'manage_options', 'teqco-deploy', 'teqco_deploy_page');
});
function teqco_deploy_page() {
  if (!current_user_can('manage_options')) return;
  if (isset($_POST['teqco_deploy_nonce']) && wp_verify_nonce($_POST['teqco_deploy_nonce'], 'teqco_deploy')) {
    if (!empty($_POST['teqco_github_token'])) { update_option('teqco_github_token', trim(sanitize_text_field(wp_unslash($_POST['teqco_github_token']))), false); echo '<div class="notice notice-success"><p>Token saved.</p></div>'; }
    if (!empty($_POST['teqco_rebuild_now'])) { update_option('teqco_rebuild_reason', 'manual rebuild', false); wp_clear_scheduled_hook('teqco_rebuild'); $ok = teqco_send_rebuild(); echo '<div class="notice ' . ($ok ? 'notice-success' : 'notice-error') . '"><p>' . esc_html(get_option('teqco_rebuild_last')['msg']) . '</p></div>'; }
  }
  $last = get_option('teqco_rebuild_last'); $next = wp_next_scheduled('teqco_rebuild'); $has = (bool) get_option('teqco_github_token');
  echo '<div class="wrap"><h1>Website deploy</h1>';
  echo '<p>When content is published or updated, the website at <a href="' . esc_url(TEQCO_FRONTEND) . '" target="_blank">teqco.com.au</a> rebuilds automatically and goes live about 2 minutes later.</p>';
  echo '<table class="form-table"><tr><th>Last rebuild request</th><td>' . ($last ? esc_html(wp_date('j M Y, g:i a', $last['time']) . ' – ' . $last['msg']) : 'None yet') . '</td></tr>';
  echo '<tr><th>Build log</th><td><a href="https://github.com/' . TEQCO_GITHUB_REPO . '/actions" target="_blank">GitHub Actions</a></td></tr></table>';
  echo '<form method="post">'; wp_nonce_field('teqco_deploy', 'teqco_deploy_nonce');
  echo '<h2>GitHub token</h2><p>' . ($has ? 'A token is saved. Paste a new one only to replace it.' : '<strong>No token saved yet, so automatic rebuilds are off.</strong>') . '</p>';
  echo '<input type="password" name="teqco_github_token" class="regular-text" autocomplete="off" placeholder="github_pat_…"> ';
  submit_button('Save token', 'secondary', 'save', false);
  echo '<h2>Rebuild now</h2><p>Use this after changes the automatic trigger does not cover.</p>';
  submit_button('Rebuild website now', 'primary', 'teqco_rebuild_now', false);
  echo '</form></div>';
}

// Admin bar shortcut.
add_action('admin_bar_menu', function ($bar) {
  if (!current_user_can('edit_posts')) return;
  $next = wp_next_scheduled('teqco_rebuild');
  $bar->add_node(['id' => 'teqco-deploy', 'title' => 'Website deploy', 'href' => admin_url('options-general.php?page=teqco-deploy')]);
}, 90);

/* -------------------------------------------------------------------------
 * 7. Hardening
 * ---------------------------------------------------------------------- */
// No theme/plugin file editor in wp-admin.
if (!defined('DISALLOW_FILE_EDIT')) define('DISALLOW_FILE_EDIT', true);

// Security headers on every CMS response (admin, login and API).
add_action('send_headers', 'teqco_security_headers');
add_action('admin_init', 'teqco_security_headers');
add_action('login_init', 'teqco_security_headers');
add_filter('rest_pre_serve_request', function ($v) { teqco_security_headers(); return $v; });
function teqco_security_headers() {
  if (headers_sent()) return;
  header('Strict-Transport-Security: max-age=31536000');
  header('X-Content-Type-Options: nosniff');
  header('X-Frame-Options: SAMEORIGIN');
  header('Referrer-Policy: strict-origin-when-cross-origin');
  header_remove('X-Powered-By');
}

// Hide usernames: no author archives or ?author= lookups, no author data in oEmbed.
add_action('template_redirect', function () {
  if (isset($_GET['author']) || is_author()) { wp_redirect(TEQCO_FRONTEND . '/', 301); exit; }
}, 1);
add_filter('redirect_canonical', function ($url, $req) { return preg_match('/[?&]author=/i', (string) $req) ? false : $url; }, 10, 2);
add_filter('oembed_response_data', function ($d) { unset($d['author_name'], $d['author_url']); return $d; });
add_filter('the_generator', '__return_empty_string');
// Same message for a wrong username and a wrong password.
add_filter('login_errors', fn($msg) => strpos((string) $msg, 'Too many failed logins') !== false ? $msg : 'Incorrect login details.');

// Login lockout: 5 failed attempts from one IP within 15 minutes locks that IP for 15 minutes;
// 20 failures on one username within an hour lock that username for 15 minutes.
function teqco_client_ip() {
  $remote = $_SERVER['REMOTE_ADDR'] ?? '';
  if (filter_var($remote, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) return $remote;
  // Behind the Cloudways proxy: the last X-Forwarded-For entry is the one the proxy added.
  $xff = array_filter(array_map('trim', explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '')));
  $last = end($xff);
  if ($last && filter_var($last, FILTER_VALIDATE_IP)) return $last;
  return $_SERVER['HTTP_X_REAL_IP'] ?? $remote;
}
function teqco_ip_is_public($ip) { return (bool) filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE); }

add_filter('authenticate', function ($user, $username) {
  $ip = teqco_client_ip();
  if (teqco_ip_is_public($ip) && get_transient('teqco_lock_ip_' . md5($ip))) {
    return new WP_Error('teqco_locked', 'Too many failed logins. Please try again in 15 minutes.');
  }
  if ($username && get_transient('teqco_lock_user_' . md5(strtolower($username)))) {
    return new WP_Error('teqco_locked', 'Too many failed logins. Please try again in 15 minutes.');
  }
  return $user;
}, 30, 2);

add_action('wp_login_failed', function ($username) {
  $ip = teqco_client_ip();
  if (teqco_ip_is_public($ip)) {
    $k = 'teqco_fail_ip_' . md5($ip); $n = (int) get_transient($k) + 1;
    set_transient($k, $n, 15 * MINUTE_IN_SECONDS);
    if ($n >= 5) set_transient('teqco_lock_ip_' . md5($ip), $ip, 15 * MINUTE_IN_SECONDS);
  }
  $k = 'teqco_fail_user_' . md5(strtolower((string) $username)); $n = (int) get_transient($k) + 1;
  set_transient($k, $n, HOUR_IN_SECONDS);
  if ($n >= 20) set_transient('teqco_lock_user_' . md5(strtolower((string) $username)), 1, 15 * MINUTE_IN_SECONDS);
  update_option('teqco_last_failed_login', ['ip' => $ip, 'time' => time()], false);
});
add_action('wp_login', function ($login) {
  delete_transient('teqco_fail_ip_' . md5(teqco_client_ip()));
  delete_transient('teqco_fail_user_' . md5(strtolower($login)));
});
