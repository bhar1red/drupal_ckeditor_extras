<?php

namespace Drupal\ckeditor_extras\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;
use Drupal\ckeditor_extras\Plugin\CKEditorPlugin\CKEditorCommon as CK;
/**
 * Defines the "CKEditor Extras" plugin.
 *
 * @CKEditorPlugin(
 *   id = "floatbox",
 *   label = @Translation("Floatbox"),
 *   module = "ckeditor_extras"
 * )
 * 
 * 
 */
class CKEditorFloatbox extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return CK::getFile('floatbox');
  }
  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return CK::getButtons('floatbox','Floatbox','icons/floatbox.png');
  }


  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    $html = CK::getTemplate('basic','atoms','floatbox');
    return ['floatbox_template' => $html];
  }

}