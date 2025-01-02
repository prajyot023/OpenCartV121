package tastCases;

import org.testng.Assert;
import org.testng.annotations.Test;

import pageObjects.AccountRegistrationPage;
import pageObjects.HomePage;
import testBase.BaseClass;

public class TC001_AccountRegistrationTest extends BaseClass {
	
	@Test(groups={"Regression","Master"})
	public void verify_account_registration()
	{
		logger.info("***** Starting TC001_AccountRegistrationTest  ****");
		logger.debug("This is a debug log message");
		try
		{
		HomePage hp=new HomePage(driver);
		hp.ClickMyAccount();
		logger.info("Clicked on MyAccount Link.. ");
		
		hp.ClickRegister();;
		logger.info("Clicked on Register Link.. ");
		
		AccountRegistrationPage regpage=new AccountRegistrationPage(driver);
		
		logger.info("Providing customer details...");
		regpage.setFirstName(randomString().toUpperCase());
		regpage.setLastName(randomString().toUpperCase());
		regpage.setEmail(randomString()+"@gmail.com");// randomly generated the email
		regpage.setTelephone(randomNumbers());
			
		String password=randomAlphaNumeric();
			
		regpage.setpassword(password);
		regpage.setconfirmpassword(password);
		
		regpage.setPrivacyPolicy();
		regpage.clickContinue();
		
		logger.info("Validating expected message..");
		
		String confmsg = regpage.getConfirmationMsg();
		Assert.assertEquals(confmsg, "Your Account Has Been Created!", "Confirmation message mismatch");

		logger.info("Test passed");
		} 
		catch (Exception e)
		{
			logger.error("Test failed: " + e.getMessage());
			Assert.fail("Test failed: " + e.getMessage());
		} 
		finally 
		{
		logger.info("***** Finished TC001_AccountRegistrationTest *****");
		}
	
	}
	
	
	
	
}



//package tastCases;
//
//import org.testng.Assert;
//import org.testng.annotations.Test;
//
//import base.BaseClass;
//import pageObjects.AccountRegistrationPage;
//import pageObjects.HomePage;
//
//public class TC001_AccountRegistrationTest extends BaseClass {
//
//    @Test
//    public void verifyAccountRegistration() {
//        // Navigate to the My Account section
//        HomePage homePage = new HomePage(driver);
//        homePage.clickMyAccount();
//        homePage.clickRegister();
//
//        // Fill out the registration form
//        AccountRegistrationPage registrationPage = new AccountRegistrationPage(driver);
//        registrationPage.setFirstName(randomString().toUpperCase());
//        registrationPage.setLastName(randomString().toUpperCase());
//        registrationPage.setEmail(randomString() + "@gmail.com");
//        registrationPage.setTelephone(randomNumbers());
//
//        // Generate a password and fill the password fields
//        String password = randomAlphaNumeric();
//        registrationPage.setPassword(password);
//        registrationPage.setConfirmPassword(password);
//        registrationPage.setPrivacyPolicy();
//        registrationPage.clickContinue();
//
//        // Verify the confirmation message
//        String confirmationMessage = registrationPage.getConfirmationMsg();
//        Assert.assertEquals(confirmationMessage, "Your Account Has Been Created!", 
//                "Account registration failed or confirmation message is incorrect.");
//    }
//}
