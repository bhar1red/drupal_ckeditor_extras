<?php

namespace Drupal\ckeditor_extras\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;
use Drupal\ckeditor_extras\Plugin\CKEditorPlugin\CKEditorCommon as CK;

/**
 * Defines the "CKEditor Extras" plugin.
 *
 * @CKEditorPlugin(
 *   id = "extend_table",
 *   label = @Translation("Extend Table"),
 *   module = "ckeditor_extras"
 * )
 * 
 * 
 */
class CKEditorExtendTable extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return CK::getFile('extend_table');
  }
  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return CK::getButtons('extend_table','Extend Table','');
  }


  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

}