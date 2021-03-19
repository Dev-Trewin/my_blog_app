const userController=require('../../controller/User.controller');


describe("user.controller",()=>{
    it("should have a create user function",()=>{
        expect(typeof userController.createUser).toBe("function");
    })
   
   
})