<?php

namespace Drupal\ckeditor_extras\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;


class CKEditorCommon {
      /**
   * {@inheritdoc}
   */
  public static function getTemplate($variant, $type, $component) {
    $app = \Drupal::service('dcf.act_app');
    $appConfig = $app->getAppConfig();
    $expr = '{{ YAMLModel('.$variant.',bio-master.'.$type.'.'.$component.'.data.wysiwyg) }}';
    $nullSource = \Drupal::service('plugin.manager.dcf_adapter_source')->createInstance('generic', ['source' => [], 'context' => []]);      
    $data = \Drupal::service('dcf.wysiwyg_exec')->runExpr($expr, $nullSource, $appConfig); 
    $html = empty($data['body']) ? '' : $app->renderComponent($data['body']);

    $html = preg_replace(
      array(
          '/ {2,}/',
          '/<!--.*?-->|\t|(?:\r?\n[ \t]*)+/s'
      ),
      array(
          '',
          ''
      ),
      $html 
  );

    return $html;
  }

  public static function getFile($filename){
    $path = '/plugins/';
    $module_path = drupal_get_path('module', 'ckeditor_extras');
    $plugin = $module_path . $path . $filename.'.js';
    return $plugin;
  }

  public static function getButtons($module, $label, $image){
    $path = '/plugins/';
    $module_path = drupal_get_path('module', 'ckeditor_extras');
    $btn = [];
    if($label)
    $label ? $btn[$module]['label'] = t($label) : '';
    $image ? $btn[$module]['image'] = $module_path . $path . $image : '';
    return $btn;
  }

  
}