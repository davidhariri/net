// Import the temporary test version of go created in step 1 of grunt
import * as go from '../temp/go.js'

export function testSetUp(test) {
	const testSettings = {
		headers : {
			'Test' : 'Test 123',
			'Test2' : 'Testing'
		},
		type : 'Test'
	};

	var setSettings = go.setup(testSettings);

	test.equals(testSettings.headers, setSettings.headers, "Test go.setup() with headers");
	test.equals(testSettings.type, setSettings.type, "Test go.setup() with type");

	test.done();
}
