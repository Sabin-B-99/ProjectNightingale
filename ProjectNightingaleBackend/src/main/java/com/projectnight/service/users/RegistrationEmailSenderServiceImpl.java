package com.projectnight.service.users;

import com.projectnight.configuration.securityconfig.EmailValidator;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class RegistrationEmailSenderServiceImpl implements RegistrationEmailSenderService {


    private final EmailValidator emailValidator;

    public RegistrationEmailSenderServiceImpl(EmailValidator emailValidator) {
        this.emailValidator = emailValidator;
    }

    @Override
    public void sendRegistrationEmail(String receiverId, String username, String registrationTokenUrl) {
        if(!emailValidator.test(receiverId)){
            throw new RuntimeException("Invalid Email");
        }
        JavaMailSender mailSender = new JavaMailSenderImpl();
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, "utf-8");
            messageHelper.setFrom(SENDER_ID);
            messageHelper.setTo(receiverId);
            messageHelper.setSubject(SUBJECT);
            messageHelper.setText(createRegistrationEmailBody(username,registrationTokenUrl));
            mailSender.send(message);
        }catch (MessagingException e){
            throw new RuntimeException("Failed to send verification email");
        }
    }



    @Override
    public String createRegistrationEmailBody(String username, String tokenUrl) {
        return  "Dear, " + username +

                """
                Please confirm your email by clicking the link below.
                """

                + tokenUrl +

                """
                The link will expire in 24 hours.
                
                Thank you,
                ProjectNightingale Team
                """;

    }


}
