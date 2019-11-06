<?php

namespace Drupal\ckeditor_extras\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;
use Drupal\ckeditor_extras\Plugin\CKEditorPlugin\CKEditorCommon as CK;

/**
 * Defines the "CKEditor Extras" plugin.
 *
 * @CKEditorPlugin(
 *   id = "cssgrid",
 *   label = @Translation("CSS Grid"),
 *   module = "ckeditor_extras"
 * )
 * 
 */
class CKEditorCSSGrid extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return CK::getFile('cssgrid');
  }
  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return CK::getButtons('cssgrid','CSS Grid','icons/cssgrid.png');
  }


  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

}