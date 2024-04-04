# wdio-ddt
Coding exercise using WebdriverIO and data-driven tests

To run tests:
1. install dependencies locally using npm install
2. run the command in cli: npm run wdio
3. to view report: allure serve (or if it does not work ./node_modules/allure-commandline/bin/allure serve)



Subjects to touch upon and clarifications:
1. I wanted to insert the cookie for the GDPR consent in order to not deal with the modal which appears kinda late, after some checks, I could not find all the cookies as my implementation sometimes worked and sometimes didn't.
2. Treatment of the GDPR modal could be better, and not wait for it to be displayed all the time, if the solution would be to click on it the first time, we could perform a check that the cookies exist in the browser and not need to wait for it to be displayed all the time.
3. There are no filters for Limited products as I would need more info what makes a product limited, I could not tell from the FE changes what makes it limited so there was no correct way to assert they are limited.
4. All the tests could be done in a single test with all the test cases being run by it, but for better visibility, test step clarity and to not have more ifs and logic I ended up creating multiple test files.
5. Data driven tests for product filtering seem to have some flaws: mainly I would need to get the products via APIs or something, not having them hardcoded in a test case because they need to be updated a lot because products are added, changed. not on sale anymore, not new anymore. I added an assert that would better suit the filtering (in my opinion) on the classification and brands tests which validates that all the results match the required filters, these would not be flaky or need maintaining.
6. I would also scale the app to add property files for translations as because it looks like it would be worth to run for multiple languages. (but that was not a requirement)
