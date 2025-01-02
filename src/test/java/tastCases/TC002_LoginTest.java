//package tastCases;
//
//import org.testng.Assert;
//import org.testng.annotations.Test;
//
//import pageObjects.HomePage;
//import pageObjects.LoginPage;
//import pageObjects.MyAccountPage;
//import testBase.Baseclass;
//
//public class TC002_LoginTest extends Baseclass {
//	@Test
//	public void verify_login() {
//		logger.info("***** Stsrting TC002_LoginTest *****");
//		
//		try {
//		//HomePage
//		HomePage hp=new HomePage(driver);
//		hp.ClickMyAccount();
//		hp.ClickLogin();
//		
//		
//		//Login
//		LoginPage lp=new LoginPage(driver);
//		lp.setEmail(p.getProperty("email"));
//		lp.setPassword(p.getProperty("password"));
//		lp.ClickLogin();
//			
//		
//		//MyAccount
//		MyAccountPage macc=new MyAccountPage(driver);
//		boolean targetPage=macc.isMyAccountPageExists();
//		
//		Assert.assertTrue(targetPage);////Assert.assertEquals(targetPage,true,"Login failed"
//		
//		
//		
//		}
//		catch (Exception e) {
//			Assert.fail();
//		}
//		logger.info("***** Finished TC002_LoginTest *****");
//	}
//	
//	
//			
//			
//			
//}

package tastCases;

import org.testng.Assert;
import org.testng.annotations.Test;

import pageObjects.HomePage;
import pageObjects.LoginPage;
import pageObjects.MyAccountPage;
import testBase.BaseClass;


public class TC002_LoginTest extends BaseClass {

    @Test(groups = {"Sanity","Master"})
    public void verify_login() {
        logger.info("***** Starting TC002_LoginTest *****");

        try {
            // HomePage
            HomePage hp = new HomePage(driver);
            hp.ClickMyAccount();
            logger.info("Clicked on My Account link.");

            hp.ClickLogin();
            logger.info("Clicked on Login link.");

            // LoginPage
            LoginPage lp = new LoginPage(driver);
            String email = p.getProperty("email");
            String password = p.getProperty("password");
            lp.setEmail(email);
            lp.setPassword(password);
            lp.ClickLogin();
            logger.info("Entered credentials and clicked login.");

            // MyAccountPage
            MyAccountPage macc = new MyAccountPage(driver);
            boolean targetPage = macc.isMyAccountPageExists();

            // Assert that the MyAccount page exists after login
            Assert.assertTrue(targetPage, "Login failed - MyAccount page not found.");

        } catch (Exception e) {
            logger.error("Test failed due to exception: ", e);
            Assert.fail("Test failed due to exception: " + e.getMessage());
        }

        logger.info("***** Finished TC002_LoginTest *****");
    }
}
