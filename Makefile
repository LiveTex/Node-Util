

#
#	Variables
#

JS_ROOT_DIR  = ./
JS_DEPS_DIRS =

include build/js-variables.mk

MODULE_NAME ?= cli
INSTALL_PREFIX ?= /usr/lib/


#
#	Rules
#

all : js-export


install :
	mkdir -p $(INSTALL_PREFIX)/node/$(MODULE_NAME)/bin/;
	mkdir -p $(INSTALL_PREFIX)/node/$(MODULE_NAME)/externs/;
	cp package.json $(INSTALL_PREFIX)/node/$(MODULE_NAME)/;
	cp bin/index.js $(INSTALL_PREFIX)/node/$(MODULE_NAME)/bin/;
	cp externs/index.js $(INSTALL_PREFIX)/node/$(MODULE_NAME)/externs/;


uninstall :
	rm -rf $(INSTALL_PREFIX)/node/$(MODULE_NAME);


clean : js-clean

include build/js-rules.mk
