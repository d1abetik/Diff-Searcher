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
test:
	npm test
test-coverage:
	npm test --bail --coverage --coverageProvider=v8
fix:
	npx eslint . --fix
