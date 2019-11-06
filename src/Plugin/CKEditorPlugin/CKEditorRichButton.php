<?php

namespace Drupal\ckeditor_extras\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;
use Drupal\ckeditor_extras\Plugin\CKEditorPlugin\CKEditorCommon as CK;

/**
 * Defines the "CKEditor Extras" plugin.
 *
 * @CKEditorPlugin(
 *   id = "rich_button",
 *   label = @Translation("Rich Button"),
 *   module = "ckeditor_extras"
 * )
 * 
 */
class CKEditorRichButton extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return CK::getFile('rich_button');
  }
  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return CK::getButtons('rich_button','Rich Button','icons/rich_button.png');
  }


  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    $richbutton_template = CK::getTemplate('text_button','atoms','rich-button');
    $basicbutton_template = CK::getTemplate('text_button','atoms','basic-button');
    return [
        'richbutton_template' => $richbutton_template,
        'basicbutton_template' => $basicbutton_template
    ];
  }

}