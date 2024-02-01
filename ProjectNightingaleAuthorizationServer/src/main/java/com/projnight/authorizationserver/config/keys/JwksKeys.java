package com.projnight.authorizationserver.config.keys;

import com.nimbusds.jose.jwk.RSAKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.cert.Certificate;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.UUID;


//TODO: For production app: 1. load private keys from vault and remove jks file from resources folder.
//                          2. Remove jks file password from properties file and load from vault or db.
@Component
public class JwksKeys {

    @Value("${pnaskp.keystore.password}")
    private String keyStorePassword;

    private KeyStore loadKeyStore(){
        try {
            InputStream data = getClass().getResourceAsStream("/static/pnaskp.jks");
            KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
            keyStore.load(data, keyStorePassword.toCharArray());
            return keyStore;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    public RSAKey loadRSAKey(){

        try {
            KeyStore keyStore = loadKeyStore();
            Certificate certificate = keyStore.getCertificate("pnaskp");

            RSAPrivateKey privateKey = (RSAPrivateKey)keyStore.getKey("pnaskp", keyStorePassword.toCharArray());
            RSAPublicKey publicKey =  (RSAPublicKey) certificate.getPublicKey();


            return new RSAKey.Builder(publicKey).privateKey(privateKey)
                    .keyID(UUID.randomUUID().toString())
                    .build();
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Problem generating RSA key");
        }
    }
}
