# Makefile for API Testing Framework

# Variables
NODE = node
NPM = npm
TEST = $(NPM) test

# Targets
.PHONY: all install test clean

# Default target
all: install test

# Install dependencies
install:
	$(NPM) install

# Run tests
test:
	$(TEST)

# Clean the node_modules and package-lock.json
clean:
	rm -rf node_modules package-lock.json
