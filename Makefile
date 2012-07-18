

#
#	Variables
#

JS_ROOT_DIR  = ./
JS_DEPS_DIRS =

include build/js-variables.mk



#
#	Rules
#

all : js-export

include build/js-rules.mk
