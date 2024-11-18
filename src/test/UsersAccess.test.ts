import { UsersAccess } from "../app/UsersAccess"
import { User } from "../app/UsersModel";


describe('UsersAccess test suite', () => {
    
    let usersAccess: UsersAccess;

    const someUser: User = {
        name: 'Some User',
        position: 'Engineer',
        employedAt: new Date()
    }

    beforeAll(async () => {
        //SUT
        usersAccess = new UsersAccess();
        await usersAccess.connectToDb();
    })

    let userId: string
    test('insert a user', async () => {
        userId = await usersAccess.addUser(someUser)
        const a = 5;
    });

    test('find user', async () => {
        const retrievedUser = await usersAccess.getUser(userId);
        const a = 5;
        expect(retrievedUser).toEqual(someUser);
    })

    afterAll(async () => {
        await usersAccess.closeConnection();
    })
})


/**SUMMARY : 
 * 
 *  Testing UsersAccesses class that depends on the DataBaseConnector(which depends on the underline mongodb)
 * 
 *     
 * Solution 1: Mock The DataBase 
 * 
 *  Mocking is possible since UsersAccess class provides Layer of Abstraction : 
 *          ALLOWS ME TO MOCK THE DB CONNECTION RETURN TYPES BY The dbConnection.connect() 
 * 
 *      - The problems with the mocking db approach :   
 *             - Queries tend to be complicated     
 *             - Mocks does not gives all truth of real db!
 * 
 * 
 * 
 *      - SOLUTION 2: Docker instance 
 *              - Benefits 
 *                  - close to the real db!
 *                  - No need access to to real db
 *          
 *      NOTES ABOUT THE TEST 
 * 
 *         beforeAll():
 *           Create a UsersAccess(SUT) instance and call it's connectDb 
 *            (which will create a connection to the a real mongodb - docker instance!)
 * 
 *          - Sequential tests
 *                 
 *     
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *                  DOCKER
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *       1.Check docker installed   
 *          
 *          docker --version 
            Docker version 27.3.1, build ce12230


         2. Pull Docker Mongo Image
             
            docker pull mongo


        3. Create a mongodb instance and run it in a docker container
            
            - mydatabase:
                 must match the url I provided in dbUri variable in DataBaseConnector class!

            NOTE: no need Dockerfile - since simple example
            docker container run --name mydatabase --publish 27018:27017 -d mongo
c04ceb222392f85987acac640bd8aaeca177af41fc6ca9339c833c6e4a75ab80

 */
