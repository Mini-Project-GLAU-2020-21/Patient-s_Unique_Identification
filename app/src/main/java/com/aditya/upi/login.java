package com.aditya.upi;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class login extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login); getSupportActionBar().setTitle("Login  Page");

        final EditText Email,Pass;
        Button btnSignIn;

        Email=(EditText) findViewById(R.id.email);
        Pass=(EditText) findViewById(R.id.pass);

        btnSignIn=(Button) findViewById(R.id.btnsign);

        btnSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if (Email.equals(""))
                {
                    Email.setError("Enter your Email id");
                    Email.requestFocus();
                    return;
                }
                if (Pass.equals(""))
                {
                    Pass.setError("Enter your Password");
                    Pass.requestFocus();
                    return;
                }
            }
        });


    }

    public void btn_signupForm(View view) {
        startActivity(new Intent(getApplicationContext(),Register.class));
    }

    public void btn_Dash(View view) {
        startActivity(new Intent(getApplicationContext(),Dash.class));
    }
}