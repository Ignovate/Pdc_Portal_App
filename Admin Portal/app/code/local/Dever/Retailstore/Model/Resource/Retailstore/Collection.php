<?php

class Dever_Retailstore_Model_Resource_Retailstore_Collection extends Mage_Core_Model_Mysql4_Collection_Abstract
{
    protected function _construct()
    {
        $this->_init('dever_retailstore/retailstore');
    }
}