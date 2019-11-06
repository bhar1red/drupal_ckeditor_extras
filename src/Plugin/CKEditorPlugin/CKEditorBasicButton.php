<?php

namespace Drupal\ckeditor_extras\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;
use Drupal\ckeditor_extras\Plugin\CKEditorPlugin\CKEditorCommon as CK;

/**
 * Defines the "CKEditor Extras" plugin.
 *
 * @CKEditorPlugin(
 *   id = "basic_button",
 *   label = @Translation("Basic Button"),
 *   module = "ckeditor_extras"
 * )
 * 
 */
class CKEditorBasicButton extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return CK::getFile('basic_button');
  }
  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return CK::getButtons('basic_button','Basic Button','icons/basic_button.png');
  }


  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    $basicbutton_template = CK::getTemplate('solidButton','atoms','basic-button');
    return [
        'basicbutton_template' => $basicbutton_template
    ];
  }

}