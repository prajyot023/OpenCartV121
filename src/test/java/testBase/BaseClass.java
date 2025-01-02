//package testBase;
//
//import java.time.Duration;
//
//import org.apache.commons.lang3.RandomStringUtils;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.testng.annotations.AfterClass;
//import org.testng.annotations.BeforeClass;
//
//public class BaseClass {
//	public WebDriver driver;
//	@BeforeClass
//	void setup()
//	{
//		driver=new ChromeDriver();
//		driver.manage().deleteAllCookies();
//		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
//		
//		driver.get("https://tutorialsninja.com/demo/index.php?route=account/account");
//		driver.manage().window().maximize();
//	}
//	@AfterClass
//	void tearDown()
//	{
//		driver.close();
//	}
//	
//	
//	//Random elements generates
//	public String randomString()
//	{
//		String generatedstring=RandomStringUtils.randomAlphabetic(5);
//		return generatedstring;
//	}
//	
//	public String randomNubers()
//	{
//		String generatedNumbers=RandomStringUtils.randomNumeric(10);
//		
//		return generatedNumbers;
//	}
//	
//	public String randomAlphaNumberic()
//	{
//		String generatedstring=RandomStringUtils.randomAlphabetic(3);
//		String generatedNumbers=RandomStringUtils.randomNumeric(3);
//		return generatedstring+"@"+generatedNumbers;
//	}
//	
//}

//package testBase;
//
//import java.time.Duration;
//
//import org.apache.commons.lang3.RandomStringUtils;
//import org.apache.logging.log4j.LogManager;//log4j2
//import org.apache.logging.log4j.Logger;//log4j2
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.openqa.selenium.edge.EdgeDriver;
//import org.openqa.selenium.firefox.FirefoxDriver;
//import org.testng.annotations.AfterClass;
//import org.testng.annotations.BeforeClass;
//import org.testng.annotations.Parameters;
//
//
//
//
//
//
//public class Baseclass {
//    public WebDriver driver;
//    public Logger logger;
//
//    @BeforeClass
//    @Parameters({"OS","browser"})
//    public void setup(String OS,String br) {
//    	logger=LogManager.getLogger(this.getClass());//log4j2
//    	
//    	
//    	
//    	switch (br.toLowerCase()) {
//    	case "chrome" :driver=new ChromeDriver(); break;
//    	case "edge": driver=new EdgeDriver(); break;
//    	case "firefox" : driver=new FirefoxDriver(); break;
//    	default :System.out.println( "Invalid browser name.. " );return;
//    	}	
//    	
//        // Initialize WebDriver
//        driver = new ChromeDriver();
//        
//        // Browser setup
//        driver.manage().deleteAllCookies();
//        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
//        driver.manage().window().maximize();
//
//        // Navigate to the base URL
//        driver.get("https://tutorialsninja.com/demo/index.php?route=account/account");
//    }
//
//    @AfterClass
//    public void tearDown() {
//        // Close the browser
//        if (driver != null) {
//            driver.quit();
//        }
//    }
//
//    // Utility method: Generate random alphabetic string
//    public String randomString() {
//        return RandomStringUtils.randomAlphabetic(5);
//    }
//
//    // Utility method: Generate random numeric string
//    public String randomNumbers() {
//        return RandomStringUtils.randomNumeric(10);
//    }
//
//    // Utility method: Generate random alphanumeric string
//    public String randomAlphaNumeric() {
//        String randomString = RandomStringUtils.randomAlphabetic(3);
//        String randomNumbers = RandomStringUtils.randomNumeric(3);
//        return randomString + "@" + randomNumbers;
//    }
//}



package testBase;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.Date;
import java.util.Properties;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.logging.log4j.LogManager; // log4j2
import org.apache.logging.log4j.Logger; // log4j2
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;

public class BaseClass {
    public WebDriver driver;
    public Logger logger;
    public Properties p;

    @BeforeClass(groups= {"Sanity","Regression","Master"})
    @Parameters({"OS", "browser"})
    public void setup(String OS, String br) throws IOException {
    	
    	//Loading config.properties file
    	FileReader file=new FileReader("./src//test//resources//config.properties");
    	p=new Properties();
    	p.load(file);
    	
    	
        logger = LogManager.getLogger(this.getClass()); // log4j2
        
        // Initialize WebDriver based on the browser parameter
        switch (br.toLowerCase()) {
            case "chrome":
                driver = new ChromeDriver();
                break;
            case "edge":
                driver = new EdgeDriver();
                break;
            case "firefox":
                driver = new FirefoxDriver();
                break;
            default:
                System.out.println("Invalid browser name..");
                return;
        }

        // Browser setup
        driver.manage().deleteAllCookies();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.manage().window().maximize();

        // Navigate to the base URL
        driver.get(p.getProperty("appURL2"));
    }

    @AfterClass(groups= {"Sanity","Regression","Master"})
    public void tearDown() {
        // Close the browser
        if (driver != null) {
            driver.quit();
        }
    }

    // Utility method: Generate random alphabetic string
    public String randomString() {
        return RandomStringUtils.randomAlphabetic(5);
    }

    // Utility method: Generate random numeric string
    public String randomNumbers() {
        return RandomStringUtils.randomNumeric(10);
    }

    // Utility method: Generate random alphanumeric string
    public String randomAlphaNumeric() {
        String randomString = RandomStringUtils.randomAlphabetic(3);
        String randomNumbers = RandomStringUtils.randomNumeric(3);
        return randomString + "@" + randomNumbers;
    }
    public String captureScreen(String tname) throws IOException {

		String timeStamp = new SimpleDateFormat("yyyyMMddhhmmss").format(new Date());
				
		TakesScreenshot takesScreenshot = (TakesScreenshot) driver;
		File sourceFile = takesScreenshot.getScreenshotAs(OutputType.FILE);
		
		String targetFilePath=System.getProperty("user.dir")+"\\screenshots\\" + tname + "_" + timeStamp + ".png";
		File targetFile=new File(targetFilePath);
		
		sourceFile.renameTo(targetFile);
			
		return targetFilePath;
    }
}



//package testBase;
//
//import java.io.File;
//import java.io.FileReader;
//import java.io.IOException;
//import java.net.URL;
//import java.text.SimpleDateFormat;
//import java.time.Duration;
//import java.util.Date;
//import java.util.Properties;
//
//import org.apache.commons.lang3.RandomStringUtils;
//import org.apache.logging.log4j.LogManager; // log4j2
//import org.apache.logging.log4j.Logger; // log4j2
//import org.openqa.selenium.OutputType;
//import org.openqa.selenium.Platform;
//import org.openqa.selenium.TakesScreenshot;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.openqa.selenium.edge.EdgeDriver;
//import org.openqa.selenium.firefox.FirefoxDriver;
//import org.openqa.selenium.remote.DesiredCapabilities;
//import org.openqa.selenium.remote.RemoteWebDriver;
//import org.testng.annotations.AfterClass;
//import org.testng.annotations.BeforeClass;
//import org.testng.annotations.Parameters;
//
//public class BaseClass {
//    public static WebDriver driver;
//    public Logger logger;
//    public Properties p;
//
//    @BeforeClass(groups = {"Sanity","Regression","Master"})
//    @Parameters({"OS", "browser"})
//    public void setup(String OS, String br) {
//        logger = LogManager.getLogger(this.getClass()); // Initialize logger (log4j2)
//
//        try (FileReader file = new FileReader("./src/test/resources/config.properties")) { // Use try-with-resources for auto-closing
//            p = new Properties();
//            p.load(file); // Load the configfile
//            logger.info("Configuration file loaded successfully.");
//        } catch (IOException e) {
//            logger.error("Failed to load the configuration file: " + e.getMessage());
//            throw new RuntimeException("Unable to load config.properties file", e);
//        }
//        
//        
//        
//        if(p.getProperty("execution_env").equalsIgnoreCase("remote"))
//		{
//			DesiredCapabilities capabilities=new DesiredCapabilities();
//			
//			//os
//			if(OS.equalsIgnoreCase("windows"))
//			{
//				capabilities.setPlatform(Platform.WIN11);
//			}
//			else if(OS.equalsIgnoreCase("linux"))
//			{
//				capabilities.setPlatform(Platform.LINUX);
//				
//			}
//			else if (OS.equalsIgnoreCase("mac"))
//			{
//				capabilities.setPlatform(Platform.MAC);
//			}
//			else
//			{
//				System.out.println("No matching os");
//				return;
//			}
//
//        // Initialize WebDriver based on the browser parameter
//        switch (br.toLowerCase()) {
//            case "chrome":
//                logger.info("Initializing Chrome browser.");
//                driver = new ChromeDriver();
//                break;
//            case "edge":
//                logger.info("Initializing Edge browser.");
//                driver = new EdgeDriver();
//                break;
//            case "firefox":
//                logger.info("Initializing Firefox browser.");
//                driver = new FirefoxDriver();
//                break;
//            default:
//                logger.error("Invalid browser name provided: " + br);
//                throw new IllegalArgumentException("Invalid browser name: " + br);
//        }
//        
//        
//        
//        
//        // Browser setup
//        driver.manage().deleteAllCookies();
//        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
//        driver.manage().window().maximize();
//        logger.info("Browser setup completed.");
//        
//        
//        driver=new RemoteWebDriver(new URL(http://192.168.82.184:4444/wd/hub"),capabilities);
//
//        // Navigate to the base URL
//        String appURL = p.getProperty("appURL2");
//        if (appURL != null && !appURL.isEmpty()) {
//            driver.get(appURL);
//            logger.info("Navigated to URL: " + appURL);
//        } else {
//            logger.error("Base URL (appURL2) is missing in the configuration file.");
//            throw new RuntimeException("Base URL is missing in config.properties.");
//        }
//		
//        
//        
//        //local
//		if(p.getProperty("execution_env").equalsIgnoreCase("local"))
//		{
//
//			switch(br.toLowerCase())
//			{
//			case "chrome" : driver=new ChromeDriver(); break;
//			case "edge" : driver=new EdgeDriver(); break;
//			case "firefox": driver=new FirefoxDriver(); break;
//			default : System.out.println("Invalid browser name.."); return;
//			}
//		}
//		
//			
//		driver.manage().deleteAllCookies();
//		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
//		
//		driver.get(p.getProperty("appURL2")); // reading url from properties file.
//		driver.manage().window().maximize();
//	}
//        
//    }
//
//    @AfterClass(groups = {"Sanity","Regression","Master"})
//    public void tearDown() {
//        if (driver != null) {
//            driver.quit();
//            logger.info("Browser closed successfully.");
//        }
//    }
//
//    // Utility method: Generate random alphabetic string
//    public String randomString() {
//        return RandomStringUtils.randomAlphabetic(5);
//    }
//
//    // Utility method: Generate random numeric string
//    public String randomNumbers() {
//        return RandomStringUtils.randomNumeric(10);
//    }
//
//    // Utility method: Generate random alphanumeric string
//    public String randomAlphaNumeric() {
//        String randomString = RandomStringUtils.randomAlphabetic(3);
//        String randomNumbers = RandomStringUtils.randomNumeric(3);
//        return randomString + "@" + randomNumbers;
//    }
//    
//    public String captureScreen(String tname) throws IOException {
//
//		String timeStamp = new SimpleDateFormat("yyyyMMddhhmmss").format(new Date());
//				
//		TakesScreenshot takesScreenshot = (TakesScreenshot) driver;
//		File sourceFile = takesScreenshot.getScreenshotAs(OutputType.FILE);
//		
//		String targetFilePath=System.getProperty("user.dir")+"\\screenshots\\" + tname + "_" + timeStamp + ".png";
//		File targetFile=new File(targetFilePath);
//		
//		sourceFile.renameTo(targetFile);
//			
//		return targetFilePath;
//
//	}
//    
//}




//package testBase;
//
//import java.io.File;
//import java.io.FileReader;
//import java.io.IOException;
//import java.net.URL;
//import java.text.SimpleDateFormat;
//import java.time.Duration;
//import java.util.Date;
//import java.util.Properties;
//
//import org.apache.commons.lang3.RandomStringUtils;
//import org.apache.logging.log4j.LogManager;  //Log4j
//import org.apache.logging.log4j.Logger;  //Log4j
//import org.openqa.selenium.OutputType;
//import org.openqa.selenium.Platform;
//import org.openqa.selenium.TakesScreenshot;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.openqa.selenium.edge.EdgeDriver;
//import org.openqa.selenium.firefox.FirefoxDriver;
//import org.openqa.selenium.remote.DesiredCapabilities;
//import org.openqa.selenium.remote.RemoteWebDriver;
//import org.testng.annotations.AfterClass;
//import org.testng.annotations.BeforeClass;
//import org.testng.annotations.Parameters;
//
//
//public class BaseClass {
//
//public static WebDriver driver;
//public Logger logger;  //Log4j
//public Properties p;
//	
//	@SuppressWarnings("deprecation")
//	@BeforeClass(groups= {"Sanity","Regression","Master"})
//	@Parameters({"os","browser"})
//	public void setup(String os, String br) throws IOException
//	{
//		//Loading config.properties file
//		FileReader file=new FileReader("./src//test//resources//config.properties");
//		p=new Properties();
//		p.load(file);
//				
//		logger=LogManager.getLogger(this.getClass());  //lOG4J2
//				
//		if(p.getProperty("execution_env").equalsIgnoreCase("remote"))
//		{
//			DesiredCapabilities capabilities=new DesiredCapabilities();
//			
//			//os
//			if(os.equalsIgnoreCase("windows"))
//			{
//				capabilities.setPlatform(Platform.WIN11);
//			}
//			else if(os.equalsIgnoreCase("linux"))
//			{
//				capabilities.setPlatform(Platform.LINUX);
//				
//			}
//			else if (os.equalsIgnoreCase("mac"))
//			{
//				capabilities.setPlatform(Platform.MAC);
//			}
//			else
//			{
//				System.out.println("No matching os");
//				return;
//			}
//			
//			//browser
//			switch(br.toLowerCase())
//			{
//			case "chrome": capabilities.setBrowserName("chrome"); break;
//			case "edge": capabilities.setBrowserName("MicrosoftEdge"); break;
//			case "firefox": capabilities.setBrowserName("firefox"); break;
//			default: System.out.println("No matching browser"); return;
//			}
//			
//			driver=new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"),capabilities);
//		}
//		
//				
//		if(p.getProperty("execution_env").equalsIgnoreCase("local"))
//		{
//
//			switch(br.toLowerCase())
//			{
//			case "chrome" : driver=new ChromeDriver(); break;
//			case "edge" : driver=new EdgeDriver(); break;
//			case "firefox": driver=new FirefoxDriver(); break;
//			default : System.out.println("Invalid browser name.."); return;
//			}
//		}
//		
//			
//		driver.manage().deleteAllCookies();
//		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
//		
//		driver.get(p.getProperty("appURL2")); // reading url from properties file.
//		driver.manage().window().maximize();
//	}
//	
//	@AfterClass(groups= {"Sanity","Regression","Master"})
//	public void tearDown()
//	{
//		driver.quit();
//	}
//	
//	public String randomeString()
//	{
//		String generatedstring=RandomStringUtils.randomAlphabetic(5);
//		return generatedstring;
//	}
//	
//	public String randomeNumber()
//	{
//		String generatednumber=RandomStringUtils.randomNumeric(10);
//		return generatednumber;
//	}
//	
//	public String randomeAlphaNumberic()
//	{
//		String generatedstring=RandomStringUtils.randomAlphabetic(3);
//		String generatednumber=RandomStringUtils.randomNumeric(3);
//		return (generatedstring+"@"+generatednumber);
//	}
//	
//	public String captureScreen(String tname) throws IOException {
//
//		String timeStamp = new SimpleDateFormat("yyyyMMddhhmmss").format(new Date());
//				
//		TakesScreenshot takesScreenshot = (TakesScreenshot) driver;
//		File sourceFile = takesScreenshot.getScreenshotAs(OutputType.FILE);
//		
//		String targetFilePath=System.getProperty("user.dir")+"\\screenshots\\" + tname + "_" + timeStamp + ".png";
//		File targetFile=new File(targetFilePath);
//		
//		sourceFile.renameTo(targetFile);
//			
//		return targetFilePath;
//
//	}
//	
//	
//}





