install: 
	npm ci
publish: 
	npm publish --dry-run
lint:
	npx eslint .
gendiff -h:
	node bin/gendiff.js
link:
	sudo npm link
say-hello:
	echo 'Hello, world!'
test:
	npx jest .