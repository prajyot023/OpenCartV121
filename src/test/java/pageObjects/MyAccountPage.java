package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;


public class MyAccountPage extends BasePage{
	public MyAccountPage(WebDriver driver)
	{
		super (driver);
	}
	
	@FindBy(xpath = "//h2[normalize-space()='My Account']")
	WebElement msgHeading;
	
	@FindBy(xpath = "//a[@class='list-group-item'][normalize-space()='Logout']")//added in step6
	WebElement lnkLogout;
	
	
	public boolean isMyAccountPageExists()
	{
	try {
	return (msgHeading. isDisplayed());
	}
	catch(Exception e) 
	{
	return false;
	}
	}
	

	public void ClickLogout()
	{
		lnkLogout.click();
	}
}//a[@class='list-group-item'][normalize-space()='Logout']