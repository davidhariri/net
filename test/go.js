// Import the temporary test version of go created in step 1 of grunt
import * as go from '../temp/go.js'

export function testSetup(test) {
	const testSettings = {
		headers : {
			'Test' : 'Test 123',
			'Test2' : 'Testing'
		},
		type : 'Test'
	};

	const setSettings = go.setup(testSettings);

	test.equals(testSettings.headers, setSettings.headers, "Test go.setup() with headers");
	test.equals(testSettings.type, setSettings.type, "Test go.setup() with type");

	test.done();
}

export function testGet(test) {
	const emptyRequest = go.get('');
	const goodRequestNoOptions = go.get('http://www1.nyc.gov/portal/apps/311_contentapi/facilities/Beach.json');

	console.log(goodRequestNoOptions);

	test.equals(false, emptyRequest, "Test go.get() with empty url");

	test.done();
}
