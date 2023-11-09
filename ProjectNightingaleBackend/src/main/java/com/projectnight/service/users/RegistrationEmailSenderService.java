package com.projectnight.service.users;

public interface RegistrationEmailSenderService {

    String SUBJECT = "Confirm your email";
    String SENDER_ID = "no-reply@projnight.com";
    public void sendRegistrationEmail(String receiverId, String username, String tokenUrl);

    public String createRegistrationEmailBody(String username, String tokenUrl);
}
