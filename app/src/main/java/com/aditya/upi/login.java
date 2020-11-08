package com.aditya.upi;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class login extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login); getSupportActionBar().setTitle("Login  Page");
    }

    public void btn_signupForm(View view) {
        startActivity(new Intent(getApplicationContext(),Register.class));
    }

    public void btn_Dash(View view) {
        startActivity(new Intent(getApplicationContext(),Dash.class));
    }
}