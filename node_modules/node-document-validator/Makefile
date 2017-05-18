test:
	make test-local

test-local:
	(. ./.env && ./node_modules/.bin/mocha ./test/index.js)

test-ci:
	(. ./.env && ./node_modules/.bin/mocha ./test/index.js --reporter dot)

.PHONY: test