<?php
$finder = PhpCsFixer\Finder::create()
  ->exclude(['node_modules', 'vendor','tools'])
  ->in([
    __DIR__ . "/app",
    __DIR__ . "/config",
    __DIR__ . "/database",
    __DIR__ . "/routes",
    __DIR__ . "/tests",
  ]);

$config = new PhpCsFixer\Config();
return $config->setFinder($finder);
