import json
import unittest
from app_api import app, getCount

class BasicTestCase(unittest.TestCase):
    def test_api(self):
        tester = app.test_client(self)
        response = tester.get('/api', content_type='application/json')
        responseJSON = json.loads(response.data)
        self.assertEqual(responseJSON['status'], 200)
        self.assertEqual(len(responseJSON['results']), 10)

    def test_error(self):
        tester = app.test_client(self)
        response = tester.get('/api-error', content_type='application/json')
        responseJSON = json.loads(response.data)
        self.assertEqual(responseJSON['status'], 500)
        self.assertEqual(responseJSON['message'], 'An unexpected error has occurred.')

    def test_method(self):
        self.assertEqual(getCount([{"joke": "good Good better girl clean machine"},
                                    {"joke": "better Synaptitude good! clean machine brain"},
                                    {"joke": "good the technology is better clean good."}], 10),  
                                    [{'count': 5, 'rank': 1, 'term': 'good'},
                                        {'count': 3, 'rank': 2, 'term': 'better'},
                                        {'count': 3, 'rank': 3, 'term': 'clean'},
                                        {'count': 2, 'rank': 4, 'term': 'machine'},
                                        {'count': 1, 'rank': 5, 'term': 'brain'},
                                        {'count': 1, 'rank': 6, 'term': 'girl'},
                                        {'count': 1, 'rank': 7, 'term': 'is'},
                                        {'count': 1, 'rank': 8, 'term': 'synaptitude'},
                                        {'count': 1, 'rank': 9, 'term': 'technology'},
                                        {'count': 1, 'rank': 10, 'term': 'the'}
                                    ])

if __name__ == '__main__':
    unittest.main()




