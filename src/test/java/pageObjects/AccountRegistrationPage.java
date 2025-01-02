package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class AccountRegistrationPage extends BasePage {
	
	public AccountRegistrationPage(WebDriver driver)
	{
		super(driver);
	}
	
	
	
	
	
@FindBy(xpath = "//input[@id='input-firstname']")
WebElement txtFirstName;

@FindBy(xpath = "//input[@id='input-lastname']")
WebElement txtLastName;

@FindBy(xpath = "//input[@id='input-email']")
WebElement txtEmail;
	
@FindBy(xpath = "//input[@id='input-telephone']")
WebElement txtTelephone;

@FindBy(xpath = "//input[@id='input-password']")
WebElement txtpassword;

@FindBy(xpath = "//input[@id='input-confirm']")
WebElement txtconfirmpassword;

@FindBy(xpath = "//input[@name='agree']")
WebElement chkdPolicy;

@FindBy(xpath = "//input[@value='Continue']")
WebElement btnContinue;

@FindBy(xpath ="//h1[normalize-space()='Your Account Has Been Created!']")
WebElement msgConfirmationMsg;




//Actions

public void setFirstName(String fname)
{
	txtFirstName.sendKeys(fname);
}


public void setLastName(String lname)
{
	txtLastName.sendKeys(lname);
}

public void setEmail(String Email)
{
	txtEmail.sendKeys(Email);
}

public void setTelephone(String tel)
{
	txtTelephone.sendKeys(tel);
}

public void setpassword(String pwd)
{
	txtpassword.sendKeys(pwd);
}


public void setconfirmpassword(String pwd)
{
	txtconfirmpassword.sendKeys(pwd);
}


public void setPrivacyPolicy()
{
	chkdPolicy.click();
}
	

public void clickContinue()
{
	btnContinue.click();
}
	

public String getConfirmationMsg()
{
	try {
		return(msgConfirmationMsg.getText());
	}catch (Exception e) {
		return(e.getMessage());
	}
}
	
	
	
	
	
	

	
}
