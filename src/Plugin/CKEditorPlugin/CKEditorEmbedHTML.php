<?php

namespace Drupal\ckeditor_extras\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;
use Drupal\ckeditor_extras\Plugin\CKEditorPlugin\CKEditorCommon as CK;

/**
 * Defines the "CKEditor Extras" plugin.
 *
 * @CKEditorPlugin(
 *   id = "embed_html",
 *   label = @Translation("Embed Html"),
 *   module = "ckeditor_extras"
 * )
 * 
 * 
 */
class CKEditorEmbedHTML extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return CK::getFile('embed_html');
  }
  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return CK::getButtons('embed_html','Embed Html','icons/embed_html.png');
  }


  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

}