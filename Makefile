#
#	Variables
#

JS_BUILD_HOME ?= /usr/lib/js-build-tools

JS_ROOT_DIR  = ./
JS_LEVEL = WHITESPACE_ONLY

MODULE_NAME = node-util
DEV_INSTALL_PREFIX ?= /usr/lib/node

DEPLOY_INSTALL_PREFIX = /tmp/deploy
DEPLOY_RELEASE = 

JS_DEPS_DIRS ?=

include $(JS_BUILD_HOME)/js-variables.mk

#
#	Rules
#

all: build

check: js-test-compile js-test-lint

build: js-externs js-export

install: install-dev

install-dev:
	mkdir -p $(DEV_INSTALL_PREFIX)/$(MODULE_NAME)/bin/;
	mkdir -p $(DEV_INSTALL_PREFIX)/$(MODULE_NAME)/externs/;
	cp package.json $(DEV_INSTALL_PREFIX)/$(MODULE_NAME)/;
	cp bin/index.js $(DEV_INSTALL_PREFIX)/$(MODULE_NAME)/bin/;
	cp externs/index.js $(DEV_INSTALL_PREFIX)/$(MODULE_NAME)/externs/;

uninstall: uninstall-dev

uninstall-dev:
	rm -rf $(DEV_INSTALL_PREFIX)/$(MODULE_NAME);

clean: js-clean

include $(JS_BUILD_HOME)/js-rules.mk
