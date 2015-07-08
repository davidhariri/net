import * as go from '../temp/go.es5.js'

export function testSetUp(test) {
	const testSettings = {
		headers : {
			'Test' : 'Test 123',
			'Test2' : 'Testing'
		},
		type : 'Test'
	};

	var setSettings = go.setup(testSettings);

	test.equals(testSettings.headers, setSettings.headers, "Test go.setup with headers");
	test.equals(testSettings.type, setSettings.type, "Test go.setup with type");
	test.done();
}
