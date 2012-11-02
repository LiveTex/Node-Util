

#
#	Variables
#

DESTDIR = 

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
	mkdir -p $(DESTDIR)$(INSTALL_PREFIX)/node/$(MODULE_NAME)/bin/;
	mkdir -p $(DESTDIR)$(INSTALL_PREFIX)/node/$(MODULE_NAME)/externs/;
	cp package.json $(DESTDIR)$(INSTALL_PREFIX)/node/$(MODULE_NAME)/;
	cp bin/index.js $(DESTDIR)$(INSTALL_PREFIX)/node/$(MODULE_NAME)/bin/;
	cp externs/index.js $(DESTDIR)$(INSTALL_PREFIX)/node/$(MODULE_NAME)/externs/;


uninstall :
	rm -rf $(DESTDIR)$(INSTALL_PREFIX)/node/$(MODULE_NAME);


clean : js-clean

include build/js-rules.mk
