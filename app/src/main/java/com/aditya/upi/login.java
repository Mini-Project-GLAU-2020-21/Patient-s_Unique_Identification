package com.aditya.upi;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;

import java.util.Objects;

public class login extends AppCompatActivity {
     Button btn_login;

     EditText txtEmail,txtPassword;
     TextView btn_signup;

     private FirebaseAuth firebaseAuth;
    @Override
   protected void onCreate(Bundle savedInstanceState) {
       super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        txtEmail = (EditText) findViewById(R.id.email);
        txtPassword = (EditText) findViewById(R.id.pass);
        btn_login = (Button) findViewById(R.id.btnsign);

        firebaseAuth = FirebaseAuth.getInstance();

        btn_login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String email =txtEmail.getText().toString().trim();
                String password = txtPassword.getText().toString().trim();


                if (TextUtils.isEmpty(email))
                {
                    Toast.makeText(login.this, "Please Enter Email", Toast.LENGTH_SHORT).show();
                }

                if (TextUtils.isEmpty(password))
                {
                    Toast.makeText(login.this, "Please Enter Password", Toast.LENGTH_SHORT).show();
                }
                if (password.length()<6)
                {
                    Toast.makeText(login.this, "Please Enter Password", Toast.LENGTH_SHORT).show();
                }

                firebaseAuth.signInWithEmailAndPassword(email, password)
                        .addOnCompleteListener(login.this, new OnCompleteListener<AuthResult>() {
                            @Override
                            public void onComplete(@NonNull Task<AuthResult> task) {
                                if (task.isSuccessful())
                                {
                                startActivity(new Intent(getApplicationContext(),Dash.class));
                                }
                                else
                                    {
                                        Toast.makeText(login.this, "Account not Found", Toast.LENGTH_SHORT).show();
                                }

                                // ...
                            }
                        });

            }
        });
    }

    public void btn_signupForm(View view) {

        startActivity(new Intent(getApplicationContext(),Register.class));
    }

    public void btn_geaust(View view) {
        startActivity(new Intent(getApplicationContext(),GeaustLogin.class));
    }
}







