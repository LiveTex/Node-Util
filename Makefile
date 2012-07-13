

#
#	Directories
#

BUILD_DIR = bin/
EXT_DIR   = externs/
LIB_DIR   = lib/


JS_SOURCE_DIRS  = ./



#
#	Includes
#

include $(EXT_DIR)/js-compile-variables.mk



#
#	Sources
#

JS_SOURCES = $(foreach dir, $(JS_SOURCE_DIRS), \
                            $(addprefix $(dir), $(shell cat $(dir)src.d)))

JS_ENV_SOURCES = $(foreach dir, $(JS_SOURCE_DIRS), \
                                $(addprefix $(dir), $(shell cat $(dir)$(JS_ENV)-src.d)))



#
#	Common
#

all : js-export



#
#	Include rules
#

include $(EXT_DIR)/js-compile-rules.mk
