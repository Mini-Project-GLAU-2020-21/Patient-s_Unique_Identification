package com.aditya.upi;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import android.widget.TextView;
import android.widget.Toast;

import java.util.Objects;

public class login extends AppCompatActivity {
    private Button login;

    private EditText emailid,password;
    private TextView signupp;
    @SuppressLint("WrongViewCast")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        getvalue();

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                if(Validate()) {
                    Log.i("Email ID", emailid.getText().toString());
                    Log.i("Password",password.getText().toString());

                    opendashboard();
                }
            }
        });

        signupp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                opensignup();
            }
        });
    }

    public void getvalue(){
        login=(Button)findViewById(R.id.btnsign);

        emailid=(EditText)findViewById(R.id.email);
        password=(EditText)findViewById(R.id.pass);
        signupp=(TextView)findViewById(R.id.editsignupp);
    }
    public void opendashboard(){
        Intent intent=new Intent(this,Dash.class);
        startActivity(intent);
    }
    public void opensignup(){
        Intent intent=new Intent(this,Register.class);
        startActivity(intent);
    }
    private Boolean Validate(){
        Boolean result =false;
        String email=emailid.getText().toString();
        String passwor=password.getText().toString();
        String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";

        if(email.isEmpty() || passwor.isEmpty()){
            Toast.makeText(this,"Please enter valid detail or signup",Toast.LENGTH_SHORT).show();
        }else if (emailid.getText().toString().trim().matches(emailPattern)) {
            Toast.makeText(getApplicationContext(),"valid email address",Toast.LENGTH_SHORT).show();
            result=true;
        }
        else {
            Toast.makeText(getApplicationContext(),"Invalid email address", Toast.LENGTH_SHORT).show();
            return false;
        }
        return result;
    }

}







