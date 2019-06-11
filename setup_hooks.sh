#!/usr/bin/env bash

echo "******************************installing hooks***********************************************"
cd ../.git/
rm -rf hooks
ln -s ../client/hooks
echo "***************************installation successful*******************************************"
