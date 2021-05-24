const userController=require('../../controller/User.controller');
const userModel=require('../../model/User.model')
userModel.save=jest.fn();
describe("user.controller",()=>{
    it("should have a create user function",()=>{
        expect(typeof userController.createUser).toBe("function");
    })
  
   
})