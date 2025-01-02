package utilities;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;


//Extent report 5.x...//version

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;

import testBase.BaseClass;

public class ExtentReportManager implements ITestListener {
	public ExtentSparkReporter sparkReporter;
	public ExtentReports extent;
	public ExtentTest test;

	String repName;

	public void onStart(ITestContext testContext) {
		
		/*SimpleDateFormat df=new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");
		Date dt=new Date();
		String currentdatetimestamp=df.format(dt);
		*/
		
		String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());// time stamp
		repName = "Test-Report-" + timeStamp + ".html";
		sparkReporter = new ExtentSparkReporter(".\\reports\\" + repName);// specify location of the report

		sparkReporter.config().setDocumentTitle("opencart Automation Report"); // Title of report
		sparkReporter.config().setReportName("opencart Functional Testing"); // name of the report
		sparkReporter.config().setTheme(Theme.DARK);
		
		extent = new ExtentReports();
		extent.attachReporter(sparkReporter);
		extent.setSystemInfo("Application", "opencart");
		extent.setSystemInfo("Module", "Admin");
		extent.setSystemInfo("Sub Module", "Customers");
		extent.setSystemInfo("User Name", System.getProperty("user.name"));
		extent.setSystemInfo("Environemnt", "QA");
		
		String os = testContext.getCurrentXmlTest().getParameter("os");
		extent.setSystemInfo("Operating System", os);
		
		String browser = testContext.getCurrentXmlTest().getParameter("browser");
		extent.setSystemInfo("Browser", browser);
		
		List<String> includedGroups = testContext.getCurrentXmlTest().getIncludedGroups();
		if(!includedGroups.isEmpty()) {
		extent.setSystemInfo("Groups", includedGroups.toString());
		}
	}

	public void onTestSuccess(ITestResult result) {
	
		test = extent.createTest(result.getTestClass().getName());
		test.assignCategory(result.getMethod().getGroups()); // to display groups in report
		test.log(Status.PASS,result.getName()+" got successfully executed");
		
	}

	public void onTestFailure(ITestResult result) {
		test = extent.createTest(result.getTestClass().getName());
		test.assignCategory(result.getMethod().getGroups());
		
		test.log(Status.FAIL,result.getName()+" got failed");
		test.log(Status.INFO, result.getThrowable().getMessage());
		
		try {
			String imgPath = new BaseClass().captureScreen(result.getName());
			test.addScreenCaptureFromPath(imgPath);
			
		} catch (IOException e1) {
			e1.printStackTrace();
		}
	}

	public void onTestSkipped(ITestResult result) {
		test = extent.createTest(result.getTestClass().getName());
		test.assignCategory(result.getMethod().getGroups());
		test.log(Status.SKIP, result.getName()+" got skipped");
		test.log(Status.INFO, result.getThrowable().getMessage());
	}

	public void onFinish(ITestContext testContext) {
		
		extent.flush();
		
		String pathOfExtentReport = System.getProperty("user.dir")+"\\reports\\"+repName;
		File extentReport = new File(pathOfExtentReport);
		
		try {
			Desktop.getDesktop().browse(extentReport.toURI());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		
		
		  /*try {
		  URL url = new  URL("file:///"+System.getProperty("user.dir")+"\\reports\\"+repName);
	  
	  // Create the email message 
	  ImageHtmlEmail email = new ImageHtmlEmail();
	  email.setDataSourceResolver(new DataSourceUrlResolver(url));
	  email.setHostName("smtp.googlemail.com"); 
	  email.setSmtpPort(465);
	  email.setAuthenticator(new DefaultAuthenticator("pavanoltraining@gmail.com","password")); 
	  email.setSSLOnConnect(true);
	  email.setFrom("pavanoltraining@gmail.com"); //Sender
	  email.setSubject("Test Results");
	  email.setMsg("Please find Attached Report....");
	  email.addTo("pavankumar.busyqa@gmail.com"); //Receiver 
	  email.attach(url, "extent report", "please check report..."); 
	  email.send(); // send the email 
	  }
	  catch(Exception e) 
	  { 
		  e.printStackTrace(); 
		  }
	  */

		
//		 try {
//	            // File path to the report
//	            String reportPath = System.getProperty("user.dir") + "\\reports\\" + "report.html";
//
//	            File file = new File(reportPath);
//	            if (!file.exists()) {
//	                throw new FileNotFoundException("Report file not found: " + file.getAbsolutePath());
//	            }
//	            URL url = file.toURI().toURL();
//
//	            // Create the email message
//	            ImageHtmlEmail email = new ImageHtmlEmail();
//	            email.setHostName("smtp.gmail.com");
//	            email.setSmtpPort(465);
//	            email.setAuthenticator(new DefaultAuthenticator("pavanoltraining@gmail.com", "your-app-password")); // Replace with your app password
//	            email.setSSLOnConnect(true);
//	            email.setFrom("pavanoltraining@gmail.com"); // Sender email
//	            email.setSubject("Test Results");
//	            email.setMsg("Please find the attached report...");
//	            email.addTo("pavankumar.busyqa@gmail.com"); // Receiver email
//
//	            // Attach the report
//	            EmailAttachment attachment = new EmailAttachment();
//	            attachment.setPath(file.getAbsolutePath()); // File path
//	            attachment.setDisposition(EmailAttachment.ATTACHMENT);
//	            attachment.setDescription("Extent Report");
//	            attachment.setName("report.html");
//
//	            email.attach(attachment);
//
//	            // Send the email
//	            email.send();
//	            System.out.println("Email sent successfully with the report attached!");
//
//	        } catch (Exception e) {
//	            e.printStackTrace();
//	        }
		
		
		 
	}

}