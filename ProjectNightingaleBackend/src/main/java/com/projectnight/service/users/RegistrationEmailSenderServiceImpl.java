package com.projectnight.service.users;

import com.projectnight.configuration.securityconfig.EmailValidator;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.List;
import java.util.Properties;


@Service
public class RegistrationEmailSenderServiceImpl implements RegistrationEmailSenderService {

    private final Environment env;
    private final EmailValidator emailValidator;

    public RegistrationEmailSenderServiceImpl(Environment env, EmailValidator emailValidator) {
        this.env = env;
        this.emailValidator = emailValidator;
    }

    @Override
    public void sendRegistrationEmail(String receiverId, String username, String registrationTokenUrl) {
        if(!emailValidator.test(receiverId)){
            throw new RuntimeException("Invalid Email");
        }
        Properties props = new Properties();
        //TODO: Remove dev host and port for production app
        props.setProperty("mail.smtp.host", env.getProperty("mailhog.smtp.dev.host"));
        props.setProperty("mail.smtp.port", env.getProperty("mailhog.smtp.dev.port"));

        Session session =  Session.getInstance(props, null);
        try {
            MimeMessage message = new MimeMessage(session);
            message.addHeader("Content-type", "text/HTML; charset=UTF-8");
            message.addHeader("format", "flowed");
            message.addHeader("Content-Transfer-Encoding", "8bit");

            message.setFrom(SENDER_ID);
            message.addRecipients(Message.RecipientType.TO, receiverId);

            message.setSubject(SUBJECT, "UTF-8");
            message.setText(createRegistrationEmailBody(username,registrationTokenUrl), "UTF-8");
            message.setSentDate(new Date());

            Transport.send(message);
        }catch (MessagingException e){
            throw new RuntimeException("Failed to send verification email");
        }
    }



    @Override
    public String createRegistrationEmailBody(String username, String tokenUrl) {
        return  "\nDear, " + username +

                """
                \n\nPlease confirm your email by clicking the link below.\n
                """

                + tokenUrl +

                """
                \nThe link will expire in 24 hours.
                
                \n\nThank you,
                \nProjectNightingale Team
                """;

    }


}
